import * as esbuild from 'esbuild';
import { writeFileSync, unlinkSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { theme } from 'antd';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../src');

const tmpFile = join(tmpdir(), `yummy-css-vars-${Date.now()}.mjs`);

await esbuild.build({
  entryPoints: [resolve(srcDir, 'theme/injectCSSVariables.ts')],
  bundle: true,
  format: 'esm',
  outfile: tmpFile,
  alias: {
    '@utils': resolve(srcDir, 'utils'),
    '@theme': resolve(srcDir, 'theme'),
  },
});

const { cssVars: customCssVars } = await import(tmpFile);
unlinkSync(tmpFile);

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase();
const antdToken = theme.getDesignToken();
const antdCssVars = Object.entries(antdToken)
  .filter(([, value]) => typeof value === 'string' || typeof value === 'number')
  .map(([key, value]) => `--${toKebabCase(key)}:${value}`);
const cssVars = [...antdCssVars, ...customCssVars];

const snippets = {};
for (const entry of cssVars) {
  const colonIdx = entry.indexOf(':');
  const name = entry.slice(0, colonIdx);
  const value = entry.slice(colonIdx + 1);

  snippets[name] = {
    prefix: name,
    body: name,
    description: value,
    scope: 'css,scss,less,postcss',
  };
}

const outputPath = resolve(__dirname, '../../.vscode/css-variables.code-snippets');
writeFileSync(outputPath, JSON.stringify(snippets, null, 2) + '\n');

console.log(`Generated css-variables.code-snippets with ${cssVars.length} snippets`);
