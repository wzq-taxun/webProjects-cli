#!/usr/bin/env node
import createTemplatestr from './createTemplate.js';
import creatPackagestr from './creatPackage.js';
import fs from 'fs';
import creatQuestions, { changeProjectType, miniprogramQuestion } from './question/index.js';
import configsdo, { codeType } from './configs.js';
import { execa } from 'execa';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = fileURLToPath(import.meta.url);

const projectType = await changeProjectType();
let configsval = null;
let inputconfig = null;
switch (projectType.nameProject) {
  case codeType.nd:
    configsval = await creatQuestions();
    inputconfig = configsdo(configsval);
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
    fs.writeFileSync(`${getRootpath()}/package.json`, creatPackagestr({ ...inputconfig, ...projectType }));
    break;
  case codeType.mini:
    configsval = await miniprogramQuestion();
    inputconfig = configsdo(configsval);
    /**
     * 创建文件夹
     */
    console.log(chalk.blue(`创建文件夹 => ${inputconfig.packageName}`));
    fs.mkdirSync(getRootpath());
    /**
     * 创建package.json
     */
    console.log(chalk.blue(`创建package.json => package.json`));
    fs.writeFileSync(`${getRootpath()}/package.json`, creatPackagestr({ ...inputconfig, ...projectType }));
    /**
     * 复制整个小程序模版文件到创建的文件夹
     */
    fs.cp(path.resolve(__dirname, '../templates/miniprograms'), `${getRootpath()}`, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
    break;
  default:
    break;
}

/**
 * 安装依赖
 */

console.log(chalk.blue(`安装依赖...`));
const isWin32 = process.platform === 'win32';
const npmCommander = isWin32 ? 'pnpm.cmd' : 'pnpm';
execa(`${npmCommander}`, ['i'], {
  cwd: getRootpath(),
  stdio: [2, 2, 2],
}).then(result => {
  const { failed } = result;
  if (!failed) {
    if (projectType.nameProject === codeType.nd) {
      console.log(chalk.blue(`依次执行:`))
      console.log(chalk.blue(`cd ${getRootpath()}`));
      console.log(chalk.blue(`pnpm run dev`));
    } else {
      console.log(chalk.blue(`用微信开发者工具打开 ${inputconfig.packageName} 文件夹`));
    }
  } else {
    console.log('执行依赖失败')
  }
})
function getRootpath() {
  return `./${inputconfig.packageName}`
}