"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class RooLink {
    /**
     * Initialize the RooLink SDK.
     * @param apiKey - Your RooLink API key.
     * @param protectedUrl - The URL you want to protect.
     * @param userAgent - The User-Agent string to simulate requests.
     */
    constructor(apiKey, protectedUrl, userAgent) {
        this.apiKey = apiKey;
        this.protectedUrl = protectedUrl;
        this.userAgent = userAgent;
        this.BASE_URL = "https://www.roolink.io/api/v1";
    }
    /**
     * Fetch the API request limit for your account.
     * @returns The current request limit information.
     */
    requestLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.BASE_URL}/limit?key=${this.apiKey}`;
            return this._request("GET", url);
        });
    }
    /**
     * Parse script data to extract relevant information.
     * @param scriptBody - The script content as plain text.
     * @returns Parsed script data.
     */
    parseScriptData(scriptBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this._defaultHeaders("text/plain");
            const url = `${this.BASE_URL}/parse`;
            return this._request("POST", url, { headers, data: scriptBody });
        });
    }
    /**
     * Generate sensor data required for RooLink validation.
     * @param abck - The _abck cookie value.
     * @param bmSz - The bm_sz cookie value.
     * @param options - Additional options for generation.
     * @returns Generated sensor data.
     */
    generateSensorData(abck, bmSz, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this._defaultHeaders();
            const payload = {
                url: this.protectedUrl,
                userAgent: this.userAgent,
                _abck: abck,
                bm_sz: bmSz,
                sec_cpt: (options === null || options === void 0 ? void 0 : options.secCpt) || false,
                stepper: (options === null || options === void 0 ? void 0 : options.stepper) || false,
                index: (options === null || options === void 0 ? void 0 : options.index) || 2,
                flags: (options === null || options === void 0 ? void 0 : options.flags) || "",
                scriptData: (options === null || options === void 0 ? void 0 : options.scriptData) || undefined,
            };
            const url = `${this.BASE_URL}/sensor`;
            var response = yield this._request("POST", url, { headers, data: payload });
            return {
                "sensor_data": response["sensor"]
            };
        });
    }
    /**
     * Generate the SBSD body for RooLink.
     * @param vid - The vid parameter.
     * @param cookie - The bm_o cookie value.
     * @param staticBody - Generate a static body if true.
     * @returns The generated SBSD body.
     */
    generateSbsdBody(vid_1, cookie_1) {
        return __awaiter(this, arguments, void 0, function* (vid, cookie, staticBody = false) {
            const headers = this._defaultHeaders();
            const payload = {
                userAgent: this.userAgent,
                vid,
                bm_o: cookie,
                static: staticBody,
            };
            const url = `${this.BASE_URL}/sbsd`;
            return this._request("POST", url, { headers, data: payload });
        });
    }
    /**
     * Generate pixel data required for tracking.
     * @param bazadebezolkohpepadr - Unique identifier for the pixel.
     * @param hash - Hash value associated with the pixel.
     * @returns The generated pixel data.
     */
    generatePixelData(bazadebezolkohpepadr, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this._defaultHeaders();
            const payload = {
                userAgent: this.userAgent,
                bazadebezolkohpepadr,
                hash,
            };
            const url = `${this.BASE_URL}/pixel`;
            const response = yield this._request("POST", url, { headers, data: payload });
            return response["sensor"];
        });
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
    generateSecCptAnswers(token, timestamp, nonce, difficulty, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Generate default headers for API requests.
     * @param contentType - Content-Type header value.
     * @returns Default headers for API requests.
     */
    _defaultHeaders(contentType = "application/json") {
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
    _request(method, url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield (0, axios_1.default)({
                    method,
                    url,
                    headers: options === null || options === void 0 ? void 0 : options.headers,
                    data: options === null || options === void 0 ? void 0 : options.data,
                });
                return response.data;
            }
            catch (error) {
                throw new Error(`Request failed: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status} - ${(_b = error.response) === null || _b === void 0 ? void 0 : _b.data}`);
            }
        });
    }
}
exports.default = RooLink;
//# sourceMappingURL=roolink.js.map