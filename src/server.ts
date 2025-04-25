import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"
import { StopTimesResponse } from "./types.js";
import { formatStopTimesResponse, makeFoliApiRequest } from "./utils.js";

const server = new McpServer({
  name: "FOLI",
  version: "1.0",
  capabilities: {
    resources: {},
    tools: {}
  }
});

server.tool(
  "get-next-bus",
  "Get the next bus leaving from the but stop",
  {
    stopId: z.string().describe("The ID of the bus stop"),
  },
  async ({ stopId }) => {
    const url = `/siri/sm/${stopId}`;
    const data = await makeFoliApiRequest<StopTimesResponse>(url);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching data for stop ${stopId}. Please try again later.`,
          }
        ]
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `The following busses are leaving from stop ${stopId}:\n${formatStopTimesResponse(data)}`,
        }
      ]
    }
  }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
