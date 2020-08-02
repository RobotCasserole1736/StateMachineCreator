import * as vscode from 'vscode';
import * as path from 'path';


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('SMEditor.start', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'SMEditor', // Identifies the type of the webview. Used internally
        'Edit State Machine', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          enableScripts:true
        } // Webview options. More on these later.
      );

      // Get path to resource on disk, And get the special URI to use with the webview
      const  jsFilePath = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'app.js'));
      const  jsFileSrc = panel.webview.asWebviewUri(jsFilePath);
      const cssFilePath = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'app.css'));
      const cssFileSrc = panel.webview.asWebviewUri(cssFilePath);

      // And set its HTML content
      panel.webview.html = getWebviewContent(jsFileSrc, cssFileSrc);
    })
  );
}


function getWebviewContent(jsFile: vscode.Uri, cssFile: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
    <link rel="stylesheet" href="${cssFile}">
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="${jsFile}"></script>
</html>`;
}