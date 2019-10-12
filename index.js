/**
 * Description: Entry point to gitchap.
 * Author: Godlove Damian.
 * Created: October 2019.
 */

'use strict';

//npm modules setup
const gitchap = require('commander');

const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

//self modules setup
const files = require('./lib/files');
const github = require('./lib/github_credentials');

gitchap
    .command('init')
    .description('draw app banner')
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitchap', {horizontalLayout: 'full'})));
    });

gitchap
    .command('octocheck')
    .description('Checks user Github credentials')
    .action(async () => {
        let token = github.getStoredGithubToken();
        if (!token) {
            await github.setGithubCredentials();
            token = await github.registerNewToken();
        }
        console.log(token);
    })

gitchap.parse(process.argv)
if (!gitchap.args.length) {
    gitchap.help();
}
