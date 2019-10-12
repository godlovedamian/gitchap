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
const inquirer = require('./lib/inquirer');
const repo = require('./lib/create_a_repo');

gitchap
    .command('init')
    .description('draw app banner')
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitchap', {horizontalLayout: 'full'})));
    });

gitchap
    .command('create_repo')
    .description('Creates a new repository on Github')
    .action(async () => {
        const getGithubToken = async () => {
            let token = github.getStoredGithubToken();
            if (token) {
                return token;
            }
            await github.setGithubCredentials();
            token = await github.registerNewToken();
            return token;
        }
        try {
            const token = await getGithubToken();
            github.gitHubAuth(token);

            const url = await repo.createRemoteRepository();

            await repo.createGitIgnore();

            const complete = await repo.setupRepository(url);

            if (complete) {
                console.log(chalk.green('Repository was successfully created'));
            }
        } catch (error) {
            if (error) {
                switch (error.status) {
                    case 401:
                        console.log(chalk.red('Couldn\'t log in, Please provide the correct credentials'))
                        break;
                    case 422:
                        console.log(chalk.red('There already exist a remote repository with the same name'))
                        break;
                    default:
                        console.log(chalk.red(error))
                        break;
                }
            }
        }
    })

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
