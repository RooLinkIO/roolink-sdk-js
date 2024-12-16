# RooLink SDK

RooLink SDK is a NodeJS library designed for seamless interaction with the RooLink API. It provides utilities for API request limits, parsing scripts, generating sensor data, and more.

## Features

- Fetch API request limits
- Parse script data
- Generate sensor data for validation
- Create SBSD body
- Generate pixel data
- Solve sec-cpt challenges

## Usage

Install the SDK via npm:

```shell
npm install roolink-sdk
```
Quick Start
Here's how to use the SDK in your node project:

### Import the SDK and Initialize
```js
const RooLink = require('roolink-sdk');

// Initialize the RooLink SDK
const apiKey = "your_api_key"
const protectedURL = "https://example.com"
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

const roolink = new RooLink(apiKey, protectedUrl, userAgent);
```


### Fetch API Request Limit
```js
const limit = await roolink.requestLimit();
console.log("Request Limit:", limit);
```


### Parse Script Data
```js
const scriptBody = "function example() { return 'sample'; }"
const scriptData = await roolink.parseScriptData(scriptBody);
console.log("Sensor Data:", scriptData);
```


### Generate Sensor Data
```js
abck = "sample_abck"
bm_sz = "sample_bm_sz"
const sensorData = await roolink.generateSensorData(abck, bm_sz, { scriptData: scriptData})
console.log("Sensor Data:", sensorData);
```


### Generate SBSD Body
```js
vid = "sample_vid"
cookie = "sample_cookie"
const sbsdBody = await roolink.generateSbsdBody(vid, cookie)
console.log("Sbsd Body:", sbsdBody);

```


### Generate Pixel Data
```js
bazadebezolkohpepadr = 12345
hash_value = "sample_hash"
const pixelData = await roolink.generatePixelData(bazadebezolkohpepadr, hash_value)
console.log("Pixel Data:", pixelData);
```


### Solve sec-cpt Challenges
```js
token = "sample_token"
timestamp = 1234567890
nonce = "sample_nonce"
difficulty = 3
cookie = "sample_cookie"
const answers = await roolink.generateSecCptAnswers(token, timestamp, nonce, difficulty, cookie)
console.log("Answers:", answers);
```

## License
```markdown
This project is licensed under the MIT License. See the LICENSE file for details.
```
