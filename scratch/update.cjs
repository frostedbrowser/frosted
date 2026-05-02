const fs = require('fs');
const indexPath = 'public/index.js';
const configPath = 'public/config.js';

let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(/const GAMES_JSON = \[[^]*?\];\n*/, '');
fs.writeFileSync(indexPath, indexContent);

let configContent = fs.readFileSync(configPath, 'utf8');
const consoleLog = `console.log(
	"%c[init]%c loaded config",
	[
		"background-color: #c8f3ff",
		"color: #0b6e99",
		"padding: 4px 6px",
		"border-radius: 4px",
		"font-weight: bold",
		"font-family: monospace",
		"font-size: 0.9em",
	].join("; "),
	"color: inherit;"
);`;

if (!configContent.includes('loaded config')) {
	configContent = configContent + '\n' + consoleLog + '\n';
	fs.writeFileSync(configPath, configContent);
}
