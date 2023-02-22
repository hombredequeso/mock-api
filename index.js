const express = require("express");
const app = express();
const port = 3000;

const endpoint1 = {
  method: "get",
  path: "/order/1",
  responses: [
    {
      status: 200,
      body: { order: 1 },
    },
  ],
};

const endpoint2 = {
  method: "get",
  path: "/orders",
  responses: [
    {
      status: 200,
      body: { x: 1 },
    },
    {
      delay: 2000,
      status: 200,
      body: { x: 2 },
    },
    {
      status: 500,
    },
  ],
};

const endpoint3 = {
  method: "get",
  path: "/abc",
  response: {
    status: 200,
    body: { abc: 123 },
  },
};

const endpoint4 = {
  method: "get",
  path: "/ping",
  response: {
    status: 200,
  },
};

const endpoints = [endpoint1, endpoint2, endpoint3, endpoint4];

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
    // console.log({ thisResponse, responseDelay });

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
