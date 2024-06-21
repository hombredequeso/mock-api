const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const endpointFileName = process.argv[2] || "./built-in-endpoint";
const endpoints = require(endpointFileName);

endpoints.forEach((endpoint) => {
  if (endpoint.response) {
    endpoint.responses = [endpoint.response];
  }

  const totalRatios = endpoint.responses.reduce(
    (acc, curr) => acc + (curr?.ratio | 1),
    0
  );
  endpoint.totalRatios = totalRatios;

  app[endpoint.method](endpoint.path, (req, res) => {
    const random = Math.random() * endpoint.totalRatios;

    const thisResponse = endpoint.responses.reduce(
      (acc, curr) => {
        if (acc.response) return acc;
        acc.ratioTotal += curr?.ratio | 1;
        if (random < acc.ratioTotal) {
          acc.response = curr;
        }
        return acc;
      },
      { ratioTotal: 0 }
    );

    const responseDelay = thisResponse.response?.delay | 0;
    // console.log({ requestBody: req.body, endpoint, thisResponse, responseDelay });

    setTimeout(() => {
      setResponse(res, thisResponse.response);
    }, responseDelay);
  });
});

function setResponse(res, response) {
  if (response.body) {
    res.status(response.status).json(response.body);
  } else res.sendStatus(response.status);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
