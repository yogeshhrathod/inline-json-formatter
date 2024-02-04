# Inline JSON Formatter

The **Inline JSON Formatter** is a Visual Studio Code extension that allows you to format and manipulate JSON directly within your editor. It provides commands for formatting selected JSON, stringifying JavaScript objects, and customizing the formatting space.

## Features

- **Format Selected JSON:** Format the selected JSON within the active editor.
- **Stringify JavaScript Object:** Convert a selected JavaScript object to a formatted JSON string.
- **Format with Custom Space:** Customize the indentation level (formatting space) when formatting JSON.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (Ctrl + Shift + X or Cmd + Shift + X).
3. Search for "Inline JSON Formatter".
4. Click "Install" to install the extension.

## Usage

### Format Selected JSON

1. Select the JSON text you want to format.
2. Execute the command `inline-json-formatter.formatSelectedJSON`.

### Stringify JavaScript Object

1. Select the JavaScript object.
2. Execute the command `inline-json-formatter.stringifyJavaScriptObject`.

### Format with Custom Space

1. Select the JSON text.
2. Execute the command `inline-json-formatter.formatWithCustomSpace`.
3. Choose the desired formatting space (indentation level).

## Configuration

The extension uses the following configuration:

- **json.formattingSpace:** Default formatting space (indentation level). (Default: 2)

You can customize this configuration in your VSCode settings.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or contribute to the development of the extension.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
