const { execSync, spawnSync } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

const command = argv.c && argv.c.split(' ');
const skip = argv.s;

if (!command) {
  console.error('Please specify excutable command');
  process.exit(1);
}

let gitCommand = 'git rev-list --grep="^[Mm]erged.*(pull request.*)" HEAD -n 1';
if (skip) {
  gitCommand += ` --skip=${skip}`;
}
const commitId = execSync(gitCommand).toString().trim();

// using spawnSync instead of Spawn, somehow Node doesnt catch Lerna exit status code
// when using async.
const yarn = spawnSync('yarn', [...command, `--since`, `${commitId}`], {
  stdio: 'inherit',
});

if (yarn.status > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
