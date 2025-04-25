type Result = {
    lineref: string;
    originref: string;
    destinationref: string;
    vehicleatstop: boolean;
    destinationdisplay: string;
    aimedarrivaltime: number;
    expectedarrivaltime: number;
    aimeddeparturetime: number;
    expecteddeparturetime: number;
}

type StopTimesResponse = {
  sys: string;
  status: string;
  servertime: number;
  result: Result[];
}

export { StopTimesResponse};