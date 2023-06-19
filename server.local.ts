const { createMiddleware } = require("@mswjs/http-middleware");
const { handlers } = require("./__mocks__/handlers");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(9090);
