# component-creator README

Step 1.

Create a file called componentconfig.json in the root of your project.

Inside you can put the following for example:

rootFolder: The folder where you want to create your components based on the root of your project.
files: An array of files you want to create for each component. You can use $component_name to use the name of the component as a placeholder.

```json
{
  "rootFolder": "components",
  "files": [
    {
      "name": "$component_name.js",
      "body": [
        "import React from 'react';",
        "import Styles from './$component_name.module.scss';",
        "",
        "function $component_name() {",
        "  return (",
        "    <div className={Styles.$component_name}>",
        "      {/* insert code here */}",
        "    </div>",
        "  );",
        "}",
        "",
        "export default $component_name;"
      ]
    },
    {
      "name": "$component_name.module.scss",
      "body": [".$component_name {", "  display: flex;", "}"]
    }
  ]
}
```

Step 2. Run the command in vscode (ctrl + shift + p) and type "Create component" and press enter.

Step 3. Enter the name of the component you want to create.

The component will be created in the folder you specified in the componentconfig.json file.

Thats it!
