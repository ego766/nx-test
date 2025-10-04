<script setup lang="ts">
import { loadRemoteEntry, loadRemoteModule } from '../remote-loader';

async function loadRemote() {
  try {
    await loadRemoteEntry('http://localhost:4201/assets/remoteEntry.js');
    const mod = await loadRemoteModule('my-nx-project', './mount');
    // the remote exposes a named export 'mount' (or default to the mount function)
    const mount = mod.mount ?? mod.default ?? mod;
    const container = document.getElementById('remote-root');
    if (!container) throw new Error('remote-root not found');
    if (typeof mount === 'function') {
      mount(container);
    }
  } catch (err) {
    console.error('Failed to load remote', err);
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <button @click="loadRemote">
        加载 Remote 应用 (my-nx-project)
      </button>
    </div>

    <div
      id="remote-root"
      style="border:1px solid #eee; margin-top:16px; min-height:200px"
    />
  </div>
</template>

<style>
@media (min-width: 768px) {
  .about {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
}
</style>
