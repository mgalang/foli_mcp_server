import { makeFoliApiRequest, formatStopTimesResponse } from "../utils";
import { StopTimesResponse } from "../types";

describe("makeFoliApiRequest", () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it("should return data when the API call is successful", async () => {
    const mockData = { key: "value" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await makeFoliApiRequest("/test-endpoint");
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith("https://data.foli.fi/test-endpoint", {
      method: "GET",
      headers: {
        "User-Agent": "foli-mcp/1.0",
        Accept: "application/json",
      },
    });
  });

  it("should return null when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const result = await makeFoliApiRequest("/test-endpoint");
    expect(result).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith("https://data.foli.fi/test-endpoint", {
      method: "GET",
      headers: {
        "User-Agent": "foli-mcp/1.0",
        Accept: "application/json",
      },
    });
  });
});

describe("formatStopTimesResponse", () => {
  it("should return 'No data available.' when data is null or empty", () => {
    expect(formatStopTimesResponse(null as unknown as StopTimesResponse)).toBe("No data available.");
  });

  it("should format stop times correctly with a default limit of 3", () => {
    const mockData: StopTimesResponse = {
      sys: "mockSys",
      status: "mockStatus",
      servertime: 1697040000,
      result: [
        { lineref: "1", destinationdisplay: "City Center", aimeddeparturetime: 1697040000, originref: "Origin1", destinationref: "Dest1", vehicleatstop: false, aimedarrivaltime: 1697039900, expectedarrivaltime: 1697039950, expecteddeparturetime: 1697040050 },
        { lineref: "2", destinationdisplay: "Airport", aimeddeparturetime: 1697043600, originref: "Origin2", destinationref: "Dest2", vehicleatstop: false, aimedarrivaltime: 1697043500, expectedarrivaltime: 1697043550, expecteddeparturetime: 1697043650 },
        { lineref: "3", destinationdisplay: "Harbor", aimeddeparturetime: 1697047200, originref: "Origin3", destinationref: "Dest3", vehicleatstop: false, aimedarrivaltime: 1697047100, expectedarrivaltime: 1697047150, expecteddeparturetime: 1697047250 },
        { lineref: "4", destinationdisplay: "Suburb", aimeddeparturetime: 1697050800, originref: "Origin4", destinationref: "Dest4", vehicleatstop: false, aimedarrivaltime: 1697050700, expectedarrivaltime: 1697050750, expecteddeparturetime: 1697050850 },
      ],
    };

    const result = formatStopTimesResponse(mockData);
    expect(result).toBe(
      `Bus 1 heading to City Center is leaving at ${new Date(1697040000 * 1000).toLocaleTimeString()}.\n` +
      `Bus 2 heading to Airport is leaving at ${new Date(1697043600 * 1000).toLocaleTimeString()}.\n` +
      `Bus 3 heading to Harbor is leaving at ${new Date(1697047200 * 1000).toLocaleTimeString()}.`
    );
  });

  it("should respect the limit parameter when formatting stop times", () => {
    const mockData: StopTimesResponse = {
      sys: "mockSys",
      status: "mockStatus",
      servertime: 1697040000,
      result: [
        { lineref: "1", destinationdisplay: "City Center", aimeddeparturetime: 1697040000, originref: "Origin1", destinationref: "Dest1", vehicleatstop: false, aimedarrivaltime: 1697039900, expectedarrivaltime: 1697039950, expecteddeparturetime: 1697040050 },
        { lineref: "2", destinationdisplay: "Airport", aimeddeparturetime: 1697043600, originref: "Origin2", destinationref: "Dest2", vehicleatstop: false, aimedarrivaltime: 1697043500, expectedarrivaltime: 1697043550, expecteddeparturetime: 1697043650 },
      ],
    };

    const result = formatStopTimesResponse(mockData, 1);
    expect(result).toBe(
      `Bus 1 heading to City Center is leaving at ${new Date(1697040000 * 1000).toLocaleTimeString()}.`
    );
  });
});