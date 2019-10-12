/**
 * Description: Inquire git credentials (username, password, e.t.c)
 * Author: Godlove Damian.
 * Created: October 2019.
 */

// 'use-strict'

//npm modules setup
const inquirer = require('inquirer');
const minimist = require('minimist');

//self modules setup
const files = require('./files');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter Github username or e-mail address: ',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please Enter a correct Github username or e-mail address: '
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter Github password: ',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please Enter a correct Github password: '
                    }
                }
            },
        ];
        return inquirer.prompt(questions);
    },
    askRepositoryDetails: () => {
        const argv = require('minimist')(process.argv.slice(2))

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Please enter a name for your repository',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a unique name for you repository!'
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a description for your repository (optional):',
                default: argv._[1] || null,
            },
            {
                type: 'input',
                name: 'visibility',
                message: 'Would you like this repository to be public or private?:',
                default: argv._[1] || null,
                choices: ['public', 'private'],
                default: 'public',
            }
        ];
        return inquirer.prompt(questions);
    }
}