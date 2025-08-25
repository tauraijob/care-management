
module.exports = {
    apps: [
      {
        name: 'Lucerna & Stern Healthcare',
        port: '3023',
        exec_mode: 'cluster',
        instances: '1',
        script: './.output/server/index.mjs' 
      }
    ]
  }