const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
    },
      //Sequelize.STRING is 255 (or varchar(255)), but you can specify a different length after the type. For example, Sequelize.STRING(500)
    runtime: {
        type: Sequelize.INTEGER
    },
    releaseDate: {
        type: Sequelize.DATEONLY
    }, // DATE data type accepts a date value provided in yyyy-mm-dd hh:mm:ss format, while DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time).
    isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //sets value as primary key value
        autoIncrement: true //auto increments on each new row
    }
  }, { sequelize });

  return Movie;
};
