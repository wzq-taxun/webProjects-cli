import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

export default (options) => {
  const __dirname = fileURLToPath(import.meta.url);
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/packageindex.ejs'));
  const code = ejs.render(indexTemplate.toString(), options);
  return prettier.format(code, { parser: 'json' });
}