vscode.window
  .showInputBox({
    prompt: "Enter a folder name",
    value: "New Folder",
  })
  .then((folderName) => {
    if (folderName) {
      vscode.workspace.fs.createDirectory(
        vscode.Uri.joinPath(
          vscode.workspace.workspaceFolders[0].uri,
          folderName
        )
      );
    }
  });

const filePath = path.join(__dirname, "componentconfig.json");
const componentConfig = JSON.parse(fs.readFileSync(filePath, "utf8"));
console.log(componentConfig);

function ReactComponentTemplate(component) {
  return `
    import React, {useState, useEffect} from 'react';
    import Styles from './${component}.module.scss';

    export default function ${component}() {

      return (
        <div className={Styles.${component}}>
          // Enter your code here
        </div>
      );
    };
  `;
}

function ReactComponentStyles(component) {
  return `
    .${component} {
      // Enter your code here
    }
  `;
}

const componentFunction = (component) => {
  const config = {
    rootFolder: "components",
    files: [
      {
        name: `${component}.js`,
        content: ReactComponentTemplate(component),
      },
      {
        name: `${component}.module.scss`,
        content: ReactComponentStyles(component),
      },
    ],
  };

  return config;
};

module.exports = {
  componentFunction,
};
