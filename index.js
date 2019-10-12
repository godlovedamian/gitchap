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

gitchap
    .command('init')

    .description('draw app banner')

    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitchap', {horizontalLayout: 'full'})));
    });

gitchap.parse(process.argv)
if (!gitchap.args.length){
    gitchap.help();
}
// (gitchap.args.length) ? gitchap.help() : "";