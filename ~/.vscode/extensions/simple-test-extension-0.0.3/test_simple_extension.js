const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'extension.log');

function log(message) {
    try {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logPath, `${timestamp}: ${message}\n`);
    } catch (error) {
        console.error(`Failed to write to log: ${error}`);
    }
}

function activate(context) {
    try {
        log('Simple test extension is now active!');
        vscode.window.showInformationMessage('Simple test extension activated!');

        let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
            try {
                log('Hello World command executed!');
                vscode.window.showInformationMessage('Hello World from test extension!');
            } catch (error) {
                log(`Error in helloWorld command: ${error}`);
            }
        });

        context.subscriptions.push(disposable);
    } catch (error) {
        log(`Error in activate function: ${error}`);
    }
}

function deactivate() {
    log('Simple test extension is deactivating.');
}

module.exports = {
    activate,
    deactivate
};
