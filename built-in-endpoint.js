const endpoint1 = {
  method: "get",
  path: "/order/1",
  responses: [
    {
      status: 200,
      ratio: 1,
      delay:5000,
      body: { id: "1" },
    },
    // {
    //   status: 404
    // },
    // {
    //   ratio: 4,
    //   status: 500,
    // },
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

let endpoints = [endpoint1, endpoint2, endpoint3, endpoint4];

module.exports = endpoints;
