/**
 * Description: Handles creation of a repository
 * Author: Godlove Damian.
 * Created: October 2019.
 */

// 'use-strict'

//npm modules setup
const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git');
const touch = require('touch');

//local modules setup
const inquirer = require('inquirer');
const gh = require('./github_credentials');

module.exports = {
    createRemoteRepository: async () => {
        const github = gh.getInstance();

        const answers = await inquirer.askRepositoryDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private'),
        }

        try {
            const response = await github.repos.createForAuthenticatedUser(data);
            return response.data.ssh_url;
        } catch (error) {
            throw error;
        }
    },
    createGitIgnore: async () => {
        const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');
        if (filelist.length) {
            const answers = await inquirer.askIgnoreFiles(filelist);
            if (answers.ignore.length) {
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'))
            } else {
                touch('.gitignore');
            }
        } else {
            touch('.gitignore');
        }
    },
    setupRepository: async (url) => {
        try {
            await git
                .init()
                .add('.gitignore')
                .add('./*')
                .commit('Initial commit')
                .addRemote('origin', url)
                .push('origin', 'master');
            return true;
        } catch (error) {
            throw error;
        }
    }
}
