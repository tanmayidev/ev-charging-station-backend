module.exports = (app) => {
  const stations = require("../controllers/station.controller.js");

  var router = require("express").Router();

  // Add a new Charging Station
  router.post("/", stations.create);

  // Retrieve all Charging Stations
  router.get("/", stations.findAll);

  // Retrieve Charging Station with id
  router.get("/show/:id", stations.findOne);

  // Update a Charging Station with id
  router.put("/:id/edit", stations.update);

  // Delete a Tutorial with id
  router.delete("/delete/:id", stations.delete);

  app.use("/", router);
};
