export abstract class ClientHttp {
  // eslint-disable-next-line
  constructor(private base: string, private tokenFinder?: TokenFinder) {}

  protected async get(endpoint: string) {
    const res = await fetch(`${this.base}${endpoint}`, {
      headers: this.getRequestHeaders()
    });

    await checkHTTPError(res);
    return res;
  }

  getRequestHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }
}

async function checkHTTPError(res: Response) {
  if (res.ok) {
    return;
  }

  let errText = await res.text();
  if (!errText) {
    errText = "No Error from server.";
  }

  throw new NetworkError(errText, res.status);
}

export class NetworkError {
  public name = "NetworkError";

  constructor(public message: string, public code: number) {
    this.message = `${code} - ${message}`;
  }
}

export interface TokenFinder {
  getTokens: () => { token: string; refreshToken: string };
  updateTokens: (token: string, refreshToken: string) => void;
  refreshEndpoint: string;
}
