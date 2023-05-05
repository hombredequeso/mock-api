A mock api for testing purposes.

The intended purpose is to provide a simple way to specify api behaviour for testing client applications. It is geared towards being able to support various forms of behaviour such as returning error responses, or responses that took a certain amount of time to happen.

sample1.json illustrates one of the most simple api contract/response specifications.
sample2.json illustrates a simple api contract with different responses, in varying ratios, with a delay.
built-in-endpoint.js provides a more comprehensive example.

# Usage
To run using the sample built-in-endpoint.js configuration:

```
yarn
node index.js
```
The api will be hosted at localhost:4000, or as specified by the PORT environment variable:

```
export PORT=4000&&node index.js
```

The api contract and responses can be defined via a json file. See sample1.json for an example.

```
node index.js ./sample1.json
```

# API Contract and Responses

The following features are supported:
* specify an array of endpoints.
* specify endpoint by method and path.
* specify a single response object, or an array of potential responses.
* if an array of responses is provided, mock-api will randomly choose a response. Responses are returned in equal ratios, unless a ratio (number) is provided. In that case, the responses are randomly returned according to the ratios.
* if a delay (number) is specified for a response, the api will wait 'delay' milliseconds before returning the response.
* the status code and JSON body of a response can be specified.