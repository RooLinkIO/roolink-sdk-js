import axios from "axios";

type RequestLimitResponse = {
  requests: number;
}
type SensorDataResponse = {
  sensor_data: string;
}
type SbsdResponse = {
  body: string;
}


class RooLink {
  /**
   * Initialize the RooLink SDK.
   * @param apiKey - Your RooLink API key.
   * @param protectedUrl - The URL you want to protect.
   * @param userAgent - The User-Agent string to simulate requests.
   */
  constructor(
    private apiKey: string,
    private protectedUrl: string,
    private userAgent: string
  ) {}

  private BASE_URL = "https://www.roolink.io/api/v1";

  /**
   * Fetch the API request limit for your account.
   * @returns The current request limit information.
   */
  async requestLimit(): Promise<RequestLimitResponse> {
    const url = `${this.BASE_URL}/limit?key=${this.apiKey}`;
    return this._request("GET", url);
  }

  /**
   * Parse script data to extract relevant information.
   * @param scriptBody - The script content as plain text.
   * @returns Parsed script data.
   */
  async parseScriptData(scriptBody: string): Promise<any> {
    const headers = this._defaultHeaders("text/plain");
    const url = `${this.BASE_URL}/parse`;
    return this._request("POST", url, { headers, data: scriptBody });
  }

  /**
   * Generate sensor data required for RooLink validation.
   * @param abck - The _abck cookie value.
   * @param bmSz - The bm_sz cookie value.
   * @param options - Additional options for generation.
   * @returns Generated sensor data.
   */
  async generateSensorData(
    abck: string,
    bmSz: string,
    options?: {
      scriptData?: string;
      secCpt?: boolean;
      stepper?: boolean;
      index?: number;
      flags?: string;
    }
  ): Promise<SensorDataResponse> {
    const headers = this._defaultHeaders();
    const payload = {
      url: this.protectedUrl,
      userAgent: this.userAgent,
      _abck: abck,
      bm_sz: bmSz,
      sec_cpt: options?.secCpt || false,
      stepper: options?.stepper || false,
      index: options?.index || 2,
      flags: options?.flags || "",
      scriptData: options?.scriptData || undefined,
    };

    const url = `${this.BASE_URL}/sensor`;
    var response = await this._request("POST", url, { headers, data: payload });
    return {
      "sensor_data": response["sensor"]
    }
  }

  /**
   * Generate the SBSD body for RooLink.
   * @param vid - The vid parameter.
   * @param cookie - The bm_o cookie value.
   * @param staticBody - Generate a static body if true.
   * @returns The generated SBSD body.
   */
  async generateSbsdBody(
    vid: string,
    cookie: string,
    staticBody: boolean = false
  ): Promise<SbsdResponse> {
    const headers = this._defaultHeaders();
    const payload = {
      userAgent: this.userAgent,
      vid,
      bm_o: cookie,
      static: staticBody,
    };

    const url = `${this.BASE_URL}/sbsd`;
    return this._request("POST", url, { headers, data: payload });
  }

  /**
   * Generate pixel data required for tracking.
   * @param bazadebezolkohpepadr - Unique identifier for the pixel.
   * @param hash - Hash value associated with the pixel.
   * @returns The generated pixel data.
   */
  async generatePixelData(
    bazadebezolkohpepadr: number,
    hash: string
  ): Promise<string> {
    const headers = this._defaultHeaders();
    const payload = {
      userAgent: this.userAgent,
      bazadebezolkohpepadr,
      hash,
    };

    const url = `${this.BASE_URL}/pixel`;
    const response = await this._request("POST", url, { headers, data: payload });
    return response["sensor"];
  }

  /**
   * Generate sec-cpt answers for challenge resolution.
   * @param token - Security token.
   * @param timestamp - Timestamp of the request.
   * @param nonce - Nonce value.
   * @param difficulty - Challenge difficulty level.
   * @param cookie - Associated cookie.
   * @returns The generated sec-cpt answers.
   */
  async generateSecCptAnswers(
    token: string,
    timestamp: number,
    nonce: string,
    difficulty: number,
    cookie: string
  ): Promise<any> {
    const headers = this._defaultHeaders();
    const payload = {
      token,
      timestamp,
      nonce,
      difficulty,
      cookie,
    };

    const url = `${this.BASE_URL}/sec-cpt`;
    return this._request("POST", url, { headers, data: payload });
  }

  /**
   * Generate default headers for API requests.
   * @param contentType - Content-Type header value.
   * @returns Default headers for API requests.
   */
  private _defaultHeaders(contentType: string = "application/json"): any {
    return {
      "x-api-key": this.apiKey,
      "Content-Type": contentType,
    };
  }

  /**
   * Internal method to handle HTTP requests.
   * @param method - HTTP method (GET, POST, etc.).
   * @param url - URL for the request.
   * @param options - Request options including headers, data, etc.
   * @returns Parsed JSON response from the API.
   */
  private async _request(
    method: string,
    url: string,
    options?: {
      headers?: any;
      data?: any;
    }
  ): Promise<any> {
    try {
      const response = await axios({
        method,
        url,
        headers: options?.headers,
        data: options?.data,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        `Request failed: ${error.response?.status} - ${error.response?.data}`
      );
    }
  }
}

export default RooLink;
