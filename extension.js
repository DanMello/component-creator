// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "general-component-creator.CreateComponent",

    function () {
      const currentWorkspaceFolder =
        vscode.workspace.workspaceFolders[0].uri.fsPath;

      const configFilePath = path.join(
        currentWorkspaceFolder,
        "componentconfig.json"
      );

      if (!fs.existsSync(configFilePath)) {
        vscode.window.showErrorMessage(
          "No componentconfig.json file found in the current workspace folder"
        );
        return;
      }

      const componentConfig = JSON.parse(
        fs.readFileSync(configFilePath, "utf8")
      );

      const { rootFolder, files } = componentConfig;

      vscode.window
        .showInputBox({
          prompt: "Enter a component name",
          value: "New Component",
        })
        .then((componentName) => {
          if (componentName) {
            const componentPath = path.join(
              currentWorkspaceFolder,
              rootFolder,
              componentName
            );

            if (fs.existsSync(componentPath)) {
              vscode.window.showErrorMessage(
                "Component already exists in the current workspace folder"
              );
              return;
            }

            vscode.workspace.fs
              .createDirectory(
                vscode.Uri.joinPath(
                  vscode.workspace.workspaceFolders[0].uri,
                  rootFolder,
                  componentName
                )
              )
              .then(() => {
                files.forEach((file) => {
                  console.log(file);
                  const filePath = path.join(
                    currentWorkspaceFolder,
                    rootFolder,
                    componentName,
                    file.name.replace("$component_name", componentName)
                  );
                  fs.writeFileSync(
                    filePath,
                    file.body
                      .join("\n")
                      .replace(/\$component_name/g, componentName)
                  );
                });
              });
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
