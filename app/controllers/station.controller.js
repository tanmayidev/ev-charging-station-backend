const db = require("../models");
const Station = db.stations;

// Create and Save new Charging Station
exports.create = (req, res) => {
  // validate request
  if (!req.body.station_name) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  Station.create(req.body)
    .then((data) => {
      res.status(200).send({ message: "Charging station added successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding Charging Station.",
      });
    });
};

// Retrive all Charging Stations details from the database
exports.findAll = (req, res) => {
  const numberOfEntries = req.query.limit ? req.query.limit : null;
  const sortType = req.query.sort ? String(req.query.sort) : null;
  const param = req.query.param ? String(req.query.param) : null;

  let ord = [];
  if (param && sortType) {
    ord = [[param, sortType.toUpperCase()]];
  }

  Station.findAll({
    limit: numberOfEntries,
    order: ord,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Charging Stations.",
      });
    });
};

// Find details of single Charging Station with an id
exports.findOne = (req, res) => {
  const requestedId = req.params.id;
  Station.findByPk(requestedId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Charging Station with id=${requestedId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Charging Station with id=${requestedId}`,
      });
    });
};

// Update/Edit a Charging Station by the id in the request
exports.update = (req, res) => {
  const requestedId = req.params.id;

  // find the record with the requested ID
  Station.findOne({ where: { station_id: requestedId } }).then((record) => {
    if (!record) {
      res.status(500).send({
        message: `Cannot find Charging Station with id=${requestedId}.`,
      });
      return;
    }

    let values = {
      station_name: req.body.station_name,
      station_image: req.body.station_image,
      station_price: req.body.station_price,
      station_address: req.body.station_address,
    };

    // Update the record with the received values
    record
      .update(values)
      .then((updatedRecord) => {
        res.status(200).send({
          message: `Successfully updated Charging Station with id=${requestedId}`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: `Error updating Charging Station with id=${requestedId}.`,
        });
      });
  });
};

// Delete a Charging Station with the specified id in the request
exports.delete = (req, res) => {
  const requestedId = req.params.id;

  // find the record with the requested ID
  Station.findOne({ where: { station_id: requestedId } }).then((record) => {
    if (!record) {
      res.status(500).send({
        message: `Charging Station with id=${requestedId} does not exist.`,
      });
      return;
    }

    // delete the record having requested ID
    record
      .destroy()
      .then((deletedRecord) => {
        res.status(200).send({
          message: `Successfully deleted Charging Station with id=${requestedId}`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: `Cannot delete Charging Station with id=${requestedId}.`,
        });
      });
  });
};
