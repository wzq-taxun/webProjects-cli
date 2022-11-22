import questionpackageName from './packageName.js';
import questionpost from './port.js';
import questionmiddleware from './middleware.js';
import inquirer from 'inquirer';

export default () => {
  return inquirer.prompt([
    questionpackageName(),
    questionpost(),
    questionmiddleware(),
  ])
}