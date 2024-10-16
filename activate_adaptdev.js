const vscode = require('vscode');

async function activateADAPTdev() {
    await vscode.commands.executeCommand('extension.startADAPTdev');
    console.log('ADAPTdev has been activated.');
}

activateADAPTdev().catch(console.error);
