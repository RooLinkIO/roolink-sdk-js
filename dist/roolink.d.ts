type RequestLimitResponse = {
    requests: number;
};
type SensorDataResponse = {
    sensor_data: string;
};
type SbsdResponse = {
    body: string;
};
declare class RooLink {
    private apiKey;
    private protectedUrl;
    private userAgent;
    /**
     * Initialize the RooLink SDK.
     * @param apiKey - Your RooLink API key.
     * @param protectedUrl - The URL you want to protect.
     * @param userAgent - The User-Agent string to simulate requests.
     */
    constructor(apiKey: string, protectedUrl: string, userAgent: string);
    private BASE_URL;
    /**
     * Fetch the API request limit for your account.
     * @returns The current request limit information.
     */
    requestLimit(): Promise<RequestLimitResponse>;
    /**
     * Parse script data to extract relevant information.
     * @param scriptBody - The script content as plain text.
     * @returns Parsed script data.
     */
    parseScriptData(scriptBody: string): Promise<any>;
    /**
     * Generate sensor data required for RooLink validation.
     * @param abck - The _abck cookie value.
     * @param bmSz - The bm_sz cookie value.
     * @param options - Additional options for generation.
     * @returns Generated sensor data.
     */
    generateSensorData(abck: string, bmSz: string, options?: {
        scriptData?: string;
        secCpt?: boolean;
        stepper?: boolean;
        index?: number;
        flags?: string;
    }): Promise<SensorDataResponse>;
    /**
     * Generate the SBSD body for RooLink.
     * @param vid - The vid parameter.
     * @param cookie - The bm_o cookie value.
     * @param staticBody - Generate a static body if true.
     * @returns The generated SBSD body.
     */
    generateSbsdBody(vid: string, cookie: string, staticBody?: boolean): Promise<SbsdResponse>;
    /**
     * Generate pixel data required for tracking.
     * @param bazadebezolkohpepadr - Unique identifier for the pixel.
     * @param hash - Hash value associated with the pixel.
     * @returns The generated pixel data.
     */
    generatePixelData(bazadebezolkohpepadr: number, hash: string): Promise<string>;
    /**
     * Generate sec-cpt answers for challenge resolution.
     * @param token - Security token.
     * @param timestamp - Timestamp of the request.
     * @param nonce - Nonce value.
     * @param difficulty - Challenge difficulty level.
     * @param cookie - Associated cookie.
     * @returns The generated sec-cpt answers.
     */
    generateSecCptAnswers(token: string, timestamp: number, nonce: string, difficulty: number, cookie: string): Promise<any>;
    /**
     * Generate default headers for API requests.
     * @param contentType - Content-Type header value.
     * @returns Default headers for API requests.
     */
    private _defaultHeaders;
    /**
     * Internal method to handle HTTP requests.
     * @param method - HTTP method (GET, POST, etc.).
     * @param url - URL for the request.
     * @param options - Request options including headers, data, etc.
     * @returns Parsed JSON response from the API.
     */
    private _request;
}
export default RooLink;
