const express = require("express");

const productRoute = require("./product.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
