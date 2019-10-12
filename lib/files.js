/**
 * Description:
 *           1. Set default directory name for a new repository.
 *           2. Check if the current directory is a git repository.
 * Author: Godlove Damian.
 * Created: October 2019.
 */

// 'use-strict'

//npm modules setup
const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => (path.basename(process.cwd())),

    directoryExists: (filepath) => {
        try {
            return fs.statSync(filepath).isDirectory();
        } catch (error) {
            return false;
        }
    },

    isGitRepository: () => {
        if (files.directoryExists('.git')) {
            console.log(chalk.red('Error: already a git repository.'))
        }
    },
}