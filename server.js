const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync({ force: true });
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

if (process.env.NODE_ENV === "production") {
  db.sequelize.sync();
} else {
  const names = [
    "Dynamic Chargers",
    "Power it Up",
    "The Speed Charger",
    "Ride on",
    "Battery Tank",
    "Changer Charger",
    "Fully Charged",
    "Arbor Charger",
    "Olfactory Battery",
    "Electrify",
    "Charmer Charger",
    "Arbor Charger",
    "The Regular",
    "Angry Battery",
    "Automatic Carrier",
    "Happy Charger"
  ];
  const prices = [
    25.32, 24.96, 65.24, 74.12, 96.82, 51.0, 15.58, 63.0, 89.36, 24, 73, 15, 74,
    25, 96, 105
  ];
  const address = [
    "8th Avenue",
    "2nd Street west",
    "Cemetery Road",
    "5th Avenue",
    "Ashley Court",
    "Forest Avenue",
    "White Street",
    "Railroad Avenue",
    "Hillside Drive",
    "Elm Avenue",
    "Broad Street",
    "Cardinal Drive",
    "Franklin Avenue",
    "Redwood Drive",
    "Myrtle Avenue",
    "MG Street"
  ];

  db.sequelize.sync({ force: true }).then(async () => {
    for (let i = 1; i <= 15; i++) {
      const station = { 
        "station_name": names[i],
        "station_image": `https://picsum.photos/id/${i}/200`,
        "station_pricing": prices[i],
        "station_address": address[i],
      };
      await db.stations.create(station);
    }
  });
}

require("./app/routes/station.routes")(app);

// set port, listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("app is running in mode: ", process.env.NODE_ENV);
});
