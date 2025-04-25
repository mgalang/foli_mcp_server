import { StopTimesResponse } from "./types";

const USER_AGENT = "foli-mcp/1.0";
const FOLI_API_BASE = "https://data.foli.fi";

/**
 * Makes a request to the FOLI API and returns the response data.
 * @param url - The endpoint URL to fetch data from.
 * @returns The response data or null if an error occurred.
 */
export async function makeFoliApiRequest<T>(url: string): Promise<T | null> {
  const response = await fetch(`${FOLI_API_BASE}${url}`, {
    method: "GET",
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    console.error(`Error fetching data from FOLI API: ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  return data as T;
}

/**
 * Formats the stop times response into a human-readable string.
 * @param data - The StopTimesResponse data.
 * @param limit - The maximum number of stop times to display.
 * @returns A formatted string of stop times.
 */
export function formatStopTimesResponse(data: StopTimesResponse, limit: number = 3): string {
  if (!data || !data.result || data.result.length === 0) {
    return "No data available.";
  }

  const stopTimes = data.result.map((item) => {
    return `Bus ${item.lineref} heading to ${item.destinationdisplay} is leaving at ${new Date(item.aimeddeparturetime * 1000).toLocaleTimeString()}.`;
  });

  return stopTimes.slice(0, limit).join("\n");
}