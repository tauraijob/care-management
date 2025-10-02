import { promises as fs } from 'fs'
import path from 'path'
import { extractTokenFromRequest, getUserFromToken } from './auth'

type AuditEntry = {
    id: string
    timestamp: string
    actorId?: string
    actorEmail?: string
    actorRole?: string
    ip?: string
    ua?: string
    action: string
    targetType?: string
    targetId?: string
    details?: any
}

const AUDIT_FILE = path.join(process.cwd(), 'server', 'data', 'audit.json')

async function ensureFile(): Promise<void> {
    const dir = path.dirname(AUDIT_FILE)
    try {
        await fs.mkdir(dir, { recursive: true })
    } catch { }
    try {
        await fs.access(AUDIT_FILE)
    } catch {
        await fs.writeFile(AUDIT_FILE, '[]', 'utf-8')
    }
}

async function readAll(): Promise<AuditEntry[]> {
    await ensureFile()
    const raw = await fs.readFile(AUDIT_FILE, 'utf-8')
    try {
        return JSON.parse(raw) as AuditEntry[]
    } catch {
        return []
    }
}

async function writeAll(entries: AuditEntry[]): Promise<void> {
    await fs.writeFile(AUDIT_FILE, JSON.stringify(entries, null, 2), 'utf-8')
}

export async function recordAudit(event: any, params: { action: string; targetType?: string; targetId?: string; details?: any }) {
    const token = extractTokenFromRequest(event)
    let actor: any = null
    if (token) {
        try {
            actor = await getUserFromToken(token)
        } catch { }
    }
    const entry: AuditEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: new Date().toISOString(),
        actorId: actor?.id,
        actorEmail: actor?.email,
        actorRole: actor?.role,
        ip: event?.node?.req?.headers?.['x-forwarded-for'] || event?.node?.req?.socket?.remoteAddress,
        ua: event?.node?.req?.headers?.['user-agent'],
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        details: params.details,
    }
    const all = await readAll()
    all.push(entry)
    await writeAll(all)
    return entry
}

export async function listAudit(page = 1, limit = 20) {
    const all = await readAll()
    const sorted = all.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    const start = (page - 1) * limit
    const items = sorted.slice(start, start + limit)
    return { items, total: sorted.length, page, limit, totalPages: Math.ceil(sorted.length / limit) }
}


