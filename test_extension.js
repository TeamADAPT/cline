const vscode = require('vscode');
const amqp = require('amqplib');

let channel;
let isRunning = false;

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('adaptdev_queue');
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
}

async function autonomousOperation() {
    while (isRunning) {
        try {
            const message = await channel.get('adaptdev_queue');
            if (message) {
                channel.ack(message);
                const task = message.content.toString();
                await executeTask(task);
            } else {
                await generateAndExecuteTask();
            }
        } catch (error) {
            console.error('Error in autonomous operation:', error);
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay between iterations
    }
}

async function executeTask(task) {
    console.log(`Executing task: ${task}`);
    // Implement task execution logic here
    vscode.window.showInformationMessage(`Executing task: ${task}`);
}

async function generateAndExecuteTask() {
    const task = `Generated task at ${new Date().toISOString()}`;
    await executeTask(task);
}

function activate(context) {
    console.log('ADAPTdev extension is now active!');

    connectToRabbitMQ();

    let startDisposable = vscode.commands.registerCommand('extension.startADAPTdev', async () => {
        if (!isRunning) {
            isRunning = true;
            vscode.window.showInformationMessage('ADAPTdev is starting...');
            autonomousOperation();
        } else {
            vscode.window.showInformationMessage('ADAPTdev is already running.');
        }
    });

    let stopDisposable = vscode.commands.registerCommand('extension.stopADAPTdev', () => {
        if (isRunning) {
            isRunning = false;
            vscode.window.showInformationMessage('ADAPTdev is stopping...');
        } else {
            vscode.window.showInformationMessage('ADAPTdev is not running.');
        }
    });

    let injectTaskDisposable = vscode.commands.registerCommand('extension.injectADAPTdevTask', async () => {
        const task = await vscode.window.showInputBox({ prompt: 'Enter a task for ADAPTdev' });
        if (task) {
            await channel.sendToQueue('adaptdev_queue', Buffer.from(task));
            vscode.window.showInformationMessage(`Task injected: ${task}`);
        }
    });

    context.subscriptions.push(startDisposable, stopDisposable, injectTaskDisposable);
}

function deactivate() {
    isRunning = false;
    if (channel) {
        channel.close();
    }
}

module.exports = {
    activate,
    deactivate
};
