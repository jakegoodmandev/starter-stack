/**
 * Creates a new worktree and sets up an isolated local dev environment for it.
 *
 * Usage:
 *   bun scripts/worktree.ts
 */
const [command, name] = Bun.argv.slice(2);

if (!command || !name) {
  console.log("Usage: bun run worktree <create|remove> <name>");
  process.exit(1);
}

const WORKTREE_PATH = `.worktrees/${name}`;

if (command === "create") {
  Bun.spawnSync(["git", "worktree", "add", WORKTREE_PATH], {
    stdout: "inherit",
    stderr: "inherit",
  });
  Bun.spawnSync(["bun", "env:up"], {
    cwd: WORKTREE_PATH,
    stdout: "inherit",
    stderr: "inherit",
  });
} else if (command === "remove") {
  Bun.spawnSync(["supabase", "stack", "destroy", "--yes"], {
    cwd: WORKTREE_PATH,
    stdout: "inherit",
    stderr: "inherit",
  });
  Bun.spawnSync(["git", "worktree", "remove", WORKTREE_PATH], {
    stdout: "inherit",
    stderr: "inherit",
  });
} else {
  console.log("Usage: bun run worktree <create|remove> <name>");
  process.exit(1);
}
