const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'simple_extension.log');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logPath, `${timestamp}: ${message}\n`);
}

function activate(context) {
    log('Simple test extension is now active!');
    vscode.window.showInformationMessage('Simple test extension activated!');

    let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
        log('Hello World command executed!');
        vscode.window.showInformationMessage('Hello World from test extension!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    log('Simple test extension is deactivating.');
}

module.exports = {
    activate,
    deactivate
};
