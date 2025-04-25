# Foli MCP Server (unofficial)

A lightweight MCP server that wraps the FOLI open API, allowing me to use it with my LLM applications (eg. Claude Desktop) and prompt questions such as upcoming bus schedules.

## Features

- Query the next busses that are leaving from a bus stop number.

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/foli_mcp_server.git
  cd foli_mcp_server
  ```

2. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

4. Build the server:
  ```bash
  npm run build
  # or
  yarn run build
  ```

## Usage with Claude Desktop

1. Follow the Claude Desktop installation from here https://modelcontextprotocol.io/quickstart/user
2. Register the MCP server to claude configuration:

```
{
  "mcpServers": {
      "foli": {
          "command": "node",
          "args": [
              "/ABSOLUTE_PATH_TO_MCP_SERVER/build/server.js"
          ]
      }
  }
}
```
3. Restart Claude Desktop
4. Example prompt: `What are the next busses leaving from stop 4?`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).