<script setup lang="ts">
// Internet hosts get swept by a scanner and labelled one by one.
const hosts = ['nginx', 'OpenSSH', 'Apache', 'IIS', 'MySQL', 'RDP', 'Redis', 'Tomcat', 'Exim', 'Postfix', 'Grafana', 'Jenkins',
  'nginx', 'OpenSSH', 'IIS', 'Apache', 'SMB', 'MQTT', 'Elastic', 'nginx', 'OpenSSH', 'Docker API', 'IMAP', 'FTP']
</script>

<template>
  <div class="grid-wrap">
    <div class="sweep" />
    <div class="grid">
      <div v-for="(h, i) in hosts" :key="i" class="host" :style="{ animationDelay: `${0.3 + (i % 6) * 0.25 + Math.floor(i / 6) * 0.05}s` }">
        <span class="icon">🖥️</span><span class="tag">{{ h }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-wrap { position: relative; }
.grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.8rem 1.2rem; }
.host { display: flex; flex-direction: column; align-items: center; font-size: 2rem; }
.tag { font-size: 0.95rem; font-family: ui-monospace, monospace; padding: 0 0.4rem; border-radius: 0.3rem;
  color: #4ade80; border: 1px solid #4ade80; opacity: 0; animation: tag 0.3s ease-out forwards; animation-delay: inherit; }
.sweep { position: absolute; top: -10px; bottom: -10px; width: 6px; background: #4ea8ff; box-shadow: 0 0 24px #4ea8ff;
  animation: sweep 1.8s ease-in-out 0.2s forwards; opacity: 0; }
@keyframes tag { to { opacity: 1; } }
@keyframes sweep { 0% { left: 0; opacity: 1; } 95% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
</style>
