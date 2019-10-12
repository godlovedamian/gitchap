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
const files = require('./lib/files');

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
            }
        ];
        return inquirer.prompt(questions);
    }
}