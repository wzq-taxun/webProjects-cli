import questionpackageName from './packageName.js';
import questionpost from './port.js';
import questionmiddleware from './middleware.js';
import questionchangeProject from './changeProject.js';
import inquirer from 'inquirer';

export default () => {
  return inquirer.prompt([
    questionpackageName(),
    questionpost(),
    questionmiddleware(),
  ])
}
/**
 * 选择创建项目类型
 * @returns 
 */
export const changeProjectType = () => {
  return inquirer.prompt([
    questionchangeProject(),
  ])
}

/**
 * 小程序问题答疑
 */
 export const miniprogramQuestion = () => {
  return inquirer.prompt([
    questionpackageName(),
  ])
}