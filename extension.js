const vscode = require("vscode");

const defaultConfig = {
  formattingSpace: 2,
};

function getConfig(key) {
  return vscode.workspace.getConfiguration("json").get(key, defaultConfig[key]);
}

function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid JSON: " + error.message);
  }
}

function formatEditorText(editor, newText) {
  const selection = editor.selection;
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, newText);
  });
}

function getSelectedText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    throw new Error("No active text editor.");
  }

  return editor.document.getText(editor.selection);
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "inline-json-formatter.formatSelectedJSON",
      formatSelectedJSON
    ),
    vscode.commands.registerCommand(
      "inline-json-formatter.stringifyJavaScriptObject",
      stringifyJavaScriptObject
    ),
    vscode.commands.registerCommand(
      "inline-json-formatter.formatWithCustomSpace",
      formatWithCustomSpace
    )
  );
}

function formatSelectedJSON() {
  const selectedText = getSelectedText();
  const formattingSpace = getConfig("formattingSpace");

  try {
    const formattedJSON = JSON.stringify(
      parseJSON(selectedText),
      null,
      formattingSpace
    );
    formatEditorText(vscode.window.activeTextEditor, formattedJSON);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
}

function stringifyJavaScriptObject() {
  const selectedText = getSelectedText();
  const formattingSpace = getConfig("formattingSpace");

  try {
    const jsObject = eval(`(${selectedText})`);
    const stringifiedObject = JSON.stringify(jsObject, null, formattingSpace);
    formatEditorText(vscode.window.activeTextEditor, stringifiedObject);
  } catch (error) {
    vscode.window.showErrorMessage(
      "Invalid JavaScript Object: " + error.message
    );
  }
}

async function formatWithCustomSpace() {
  const options = ["0", "2", "4"];
  const selectedOption = await vscode.window.showQuickPick(options, {
    placeHolder: "Select the formatting space (indentation level)",
  });

  if (selectedOption === undefined) {
    return;
  }

  const formattingSpace = parseInt(selectedOption, 10);

  if (isNaN(formattingSpace)) {
    return vscode.window.showErrorMessage(
      "Invalid formatting space. Please select a valid option."
    );
  }

  const selectedText = getSelectedText();

  try {
    const formattedText = JSON.stringify(
      parseJSON(selectedText),
      null,
      formattingSpace
    );
    formatEditorText(vscode.window.activeTextEditor, formattedText);
  } catch (error) {
    vscode.window.showErrorMessage(
      "Invalid JSON or JavaScript Object: " + error.message
    );
  }
}

module.exports = {
  activate,
};
