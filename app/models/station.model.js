module.exports = (sequelize, Sequelize) => {
  const Station = sequelize.define(
    "stations",
    {
      station_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      station_name: {
        type: Sequelize.STRING,
      },
      station_image: {
        // type: Sequelize.BLOB,
        type: Sequelize.STRING, // store url of images
      },
      station_pricing: {
        type: Sequelize.FLOAT.UNSIGNED,
      },
      station_address: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  return Station;
};
