/**
 * Upserts the local Supabase URL and publishable key into .env.local.
 *
 * Usage:
 *   bun scripts/env-upsert.ts
 */
const LOCAL_ENV_FILE = ".env.local";
const MAPPINGS = [
  ["API_URL", "VITE_SUPABASE_URL"],
  ["PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"],
] as const;

const proc = Bun.spawn(["supabase", "status", "--env", "--output-format", "json"], {
  stdout: "pipe",
  stderr: "inherit",
});
const supabaseEnv = (await new Response(proc.stdout).json()) as Record<string, string>;

const envFile = Bun.file(LOCAL_ENV_FILE);
let lines = (await envFile.exists()) ? (await envFile.text()).split("\n") : [];

for (const [sourceKey, targetKey] of MAPPINGS) {
  const value = supabaseEnv[sourceKey];
  if (value === undefined) {
    console.warn(`Key "${sourceKey}" not found in input, skipping`);
    continue;
  }

  const line = `${targetKey}=${JSON.stringify(String(value))}`;
  const index = lines.findIndex((l) => l.startsWith(`${targetKey}=`));
  if (index >= 0) lines[index] = line;
  else lines.splice(lines.at(-1) === "" ? -1 : lines.length, 0, line);
}

await Bun.write(LOCAL_ENV_FILE, lines.join("\n").replace(/\n?$/, "\n"));
