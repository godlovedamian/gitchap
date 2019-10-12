/**
 * Description: handles github credentials and sessions
 * Author: Godlove Damian.
 * Created: October 2019.
 */

// 'use-strict'

//npm modules setup
const Octokit = require('@octokit/rest');
const _ = require('lodash');
const Configstore = require('configstore');

//local modules setup
const pkg = require('../package');
const inquirer = require('./inquirer');

const config = new Configstore(pkg.name);
const octokit = new Octokit();

module.exports = {
    getInstance: () => (octokit),

    gitHubAuth: (token) => {
        octokit.authenticate({
            type: 'oauth',
            token: token,
        });
    },

    getStoredGithubToken: () => (config.get('github_credentials.token')),

    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit.authenticate(
            _.extend(
                {
                    type: 'basic',
                },
                credentials,
            )
        );
    },

    registerNewToken: async () => {
        try {
            const response = await octokit.oauthAuthorizations.createAuthorization({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'gitchap: dev workflow automation simplified',
            });
            const token = response.data.token;
            if (token) {
                config.set('github_credentials.token', token);
                return token;
            } else {
                throw new Error('Something went wrong! Github token was not retrieved');
            }
        } catch (error) {
            throw error;
        }
    }
}