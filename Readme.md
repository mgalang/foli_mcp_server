# Föli MCP Server (unofficial)

A lightweight MCP server that wraps the FOLI open API, allowing me to use it with my LLM applications (eg. Claude Desktop) and prompt questions such as upcoming bus schedules.

## Features

- Query the next busses that are leaving from a bus stop number.

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/mgalang/foli_mcp_server.git
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

## Integration with OpenWeb UI

Integration with OpenWeb UI requires an additional step for the MCP proxy.

1. Follow the instructions for installing the MCP proxy here https://docs.openwebui.com/openapi-servers/mcp
2. Start the proxy for the mcp server: `uvx mcpo --port 8000 -- node /ABSOLUTE/PATH/TO/foli_mcp_server/build/server.js`
3. Connect the proxy to OpenWeb UI Tools server (see: https://docs.openwebui.com/openapi-servers/open-webui#step-2-connect-tool-server-in-open-webui)
4. Use your favourite LLM model and start prompting to ask for bus schedules

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
