#!/usr/bin/env node
import createTemplatestr from './createTemplate.js';
import creatPackagestr from './creatPackage.js';
import fs from 'fs';
import creatQuestions from './question/index.js';
import configsdo from './configs.js';
import { execa } from 'execa';
import chalk from 'chalk';
const configsval = await creatQuestions();
const inputconfig = configsdo(configsval);
/**
 * 创建文件夹
 */
console.log(chalk.blue(`创建文件夹 => ${inputconfig.packageName}`));
fs.mkdirSync(getRootpath());

/**
 * 创建文件夹入口
 */
console.log(chalk.blue(`创建文件夹入口 => index`));
fs.writeFileSync(`${getRootpath()}/index.js`, createTemplatestr(inputconfig));

/**
 * 创建package.json
 */
console.log(chalk.blue(`创建package.json => package.json`));
fs.writeFileSync(`${getRootpath()}/package.json`, creatPackagestr(inputconfig));
/**
 * 安装依赖
 */
console.log(chalk.blue(`安装依赖...`));
const isWin32 = process.platform === 'win32';
const npmCommander = isWin32 ? 'npm.cmd' : 'npm';
execa(`${npmCommander}`, ['i'], {
  cwd: getRootpath(),
  stdio: [2, 2, 2],
}).then(result => {
  const { failed } = result;
  if (!failed) {
    console.log(chalk.blue(`依次执行:`))
    console.log(chalk.blue(`cd ${getRootpath()}`));
    console.log(chalk.blue(`npm run dev`));
  } else {
    console.log('执行依赖失败')
  }
})
function getRootpath() {
  return `./${inputconfig.packageName}`
}