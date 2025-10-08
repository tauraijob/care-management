<template>
  <div class="max-w-4xl mx-auto py-10">
    <div class="rounded-lg bg-lucerna-primary text-white px-6 py-4 mb-6">
      <h1 class="text-2xl font-bold">Security Settings</h1>
    </div>

    <div class="bg-white rounded-lg shadow p-6 space-y-10">
      <!-- Change Password -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
        <form @submit.prevent="changePassword" class="grid grid-cols-1 gap-4 max-w-md">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input v-model="pwd.currentPassword" type="password" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input v-model="pwd.newPassword" type="password" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
            <p class="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input v-model="pwd.confirmPassword" type="password" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
          </div>
          <div class="flex items-center gap-3 pt-2">
            <button :disabled="pwdLoading" type="submit" class="px-4 py-2 rounded-md text-white bg-lucerna-primary hover:bg-lucerna-primary-dark disabled:opacity-50">Update Password</button>
            <span v-if="pwdLoading" class="text-sm text-gray-500">Saving...</span>
          </div>
          <p v-if="pwdMessage" :class="pwdMessageClass" class="text-sm mt-2">{{ pwdMessage }}</p>
        </form>
      </section>

      <!-- Sessions -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h2>
        <p class="text-sm text-gray-500 mb-4">If you suspect suspicious activity, log out of all other sessions.</p>
        <div class="flex items-center gap-3">
          <button @click="logoutEverywhere" :disabled="sessionsLoading" class="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50">Log out other sessions</button>
          <span v-if="sessionsLoading" class="text-sm text-gray-500">Processing...</span>
        </div>
        <p v-if="sessionsMessage" class="text-sm mt-2" :class="sessionsMessageClass">{{ sessionsMessage }}</p>
      </section>

      <!-- 2FA Placeholder -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication (Coming Soon)</h2>
        <p class="text-sm text-gray-500">Enhance account security by enabling 2FA using authenticator apps. This feature is planned and not yet available.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'admin' })

const pwd = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const pwdLoading = ref(false)
const pwdMessage = ref('')
const pwdMessageClass = computed(() => pwdMessage.value.startsWith('Success') ? 'text-green-700' : 'text-red-700')

async function changePassword() {
  if (pwd.value.newPassword !== pwd.value.confirmPassword) {
    pwdMessage.value = 'Passwords do not match.'
    return
  }
  pwdLoading.value = true
  pwdMessage.value = ''
  try {
    const res = await $fetch('/api/auth/change-password', { method: 'POST', body: { currentPassword: pwd.value.currentPassword, newPassword: pwd.value.newPassword } })
    if (res && res.success) {
      pwdMessage.value = 'Success: Password changed.'
      pwd.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
    } else {
      pwdMessage.value = 'Failed to change password.'
    }
  } catch (e) {
    const msg = e?.data?.statusMessage || 'Failed to change password.'
    pwdMessage.value = msg
  } finally {
    pwdLoading.value = false
  }
}

// Sessions: reuse logout endpoint to invalidate current token; show message for now.
const sessionsLoading = ref(false)
const sessionsMessage = ref('')
const sessionsMessageClass = computed(() => sessionsMessage.value.startsWith('Success') ? 'text-green-700' : 'text-red-700')

async function logoutEverywhere() {
  sessionsLoading.value = true
  sessionsMessage.value = ''
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    sessionsMessage.value = 'Success: Logged out this session. Please re-login.'
  } catch (e) {
    sessionsMessage.value = 'Failed to logout sessions.'
  } finally {
    sessionsLoading.value = false
  }
}
</script>