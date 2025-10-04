// minimal dynamic remote loader for vite + originjs federation in dev
export async function loadRemoteEntry(url: string) {
  // vite-plugin-federation exposes remoteEntry as a global script in dev under /assets/
  // Use a dynamic import to load the remoteEntry bundle
  await import(/* @vite-ignore */ url);
}

export async function loadRemoteModule(scope: string, module: string): Promise<any> {
  // After loading remoteEntry the plugin registers a global on window with the scope name
  // Use unknown and runtime checks to avoid TS errors
  const w = window as unknown as Record<string, any>;
  const proxy = w[scope];
  if (!proxy) throw new Error(`Remote ${scope} not found on window`);
  // proxy[module] is a function that returns the module when invoked
  const factory = proxy[module];
  if (typeof factory !== 'function') throw new Error(`Module ${module} not found on remote ${scope}`);
  return await factory();
}
