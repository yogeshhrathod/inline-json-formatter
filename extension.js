// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let formatSelectedJSONDisposable = vscode.commands.registerCommand(
    "inline-json-formatter.formatSelectedJSON",
    () => {
      formatSelectedJSON();
    }
  );
  let stringifyJavaScriptObjectDisposable = vscode.commands.registerCommand(
    "inline-json-formatter.stringifyJavaScriptObject",
    () => {
      stringifyJavaScriptObject();
    }
  );

  let formatWithCustomSpaceDisposable = vscode.commands.registerCommand(
    "inline-json-formatter.formatWithCustomSpace",
    () => {
      formatWithCustomSpace();
    }
  );

  context.subscriptions.push(
    formatSelectedJSONDisposable,
    stringifyJavaScriptObjectDisposable,
    formatWithCustomSpaceDisposable
  );
}

function formatSelectedJSON() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const formattingSpace = vscode.workspace
      .getConfiguration()
      .get("json.formattingSpace", 2);

    try {
      const formattedJSON = JSON.stringify(
        JSON.parse(selectedText),
        null,
        formattingSpace
      );
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, formattedJSON);
      });
    } catch (error) {
      vscode.window.showErrorMessage("Invalid JSON: " + error.message);
    }
  } else {
    vscode.window.showInformationMessage("No active text editor.");
  }
}

function stringifyJavaScriptObject() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const formattingSpace = vscode.workspace
      .getConfiguration()
      .get("json.formattingSpace", 2);
    try {
      const jsObject = eval(`(${selectedText})`);
      const stringifiedObject = JSON.stringify(jsObject, null, formattingSpace);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, stringifiedObject);
      });
    } catch (error) {
      vscode.window.showErrorMessage(
        "Invalid JavaScript Object: " + error.message
      );
    }
  } else {
    vscode.window.showInformationMessage("No active text editor.");
  }
}

async function formatWithCustomSpace() {
  const options = ["0", "2", "4"];
  const selectedOption = await vscode.window.showQuickPick(options, {
    placeHolder: "Select the formatting space (indentation level)",
  });

  if (selectedOption !== undefined) {
    const formattingSpace = parseInt(selectedOption, 10);

    if (!isNaN(formattingSpace)) {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        try {
          const formattedText = JSON.stringify(
            JSON.parse(selectedText),
            null,
            formattingSpace
          );
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, formattedText);
          });
        } catch (error) {
          vscode.window.showErrorMessage(
            "Invalid JSON or JavaScript Object: " + error.message
          );
        }
      } else {
        vscode.window.showInformationMessage("No active text editor.");
      }
    } else {
      vscode.window.showErrorMessage(
        "Invalid formatting space. Please select a valid option."
      );
    }
  }
}

module.exports = {
  activate,
};
