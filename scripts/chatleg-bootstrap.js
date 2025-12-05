import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const dryRun = process.argv.includes('--dry-run');
const workspaceRoot = resolve(process.cwd(), 'chatleg_data');
const folders = ['Cases', 'Templates', 'LawRepo', 'Settings'];

function ensureDirectory(targetPath) {
  if (existsSync(targetPath)) {
    console.log(`✔︎ ${targetPath} already exists`);
    return;
  }

  if (dryRun) {
    console.log(`• [dry-run] Would create ${targetPath}`);
    return;
  }

  mkdirSync(targetPath, { recursive: true });
  console.log(`• Created ${targetPath}`);
}

console.log('Initializing ChatLeg workspace directories...');
console.log(`Root: ${workspaceRoot}`);

folders.map((folderName) => resolve(workspaceRoot, folderName)).forEach(ensureDirectory);

const settingsReadmePath = resolve(workspaceRoot, 'Settings', 'README.md');
if (!existsSync(settingsReadmePath)) {
  if (dryRun) {
    console.log(`• [dry-run] Would create guidance file at ${settingsReadmePath}`);
  } else {
    writeFileSync(
      settingsReadmePath,
      '# ChatLeg Settings\n\nPlace configuration files for the ChatLeg Agent here. Examples include:\n\n- `model.json` for API configuration\n- `law_repo.json` for the local legislative repository path\n- `vector_store.json` for external search endpoints\n',
      'utf8'
    );
    console.log(`• Seeded settings guidance at ${settingsReadmePath}`);
  }
} else {
  console.log(`✔︎ Guidance already present at ${settingsReadmePath}`);
}

console.log(dryRun ? 'Dry run complete.' : 'ChatLeg workspace ready.');
