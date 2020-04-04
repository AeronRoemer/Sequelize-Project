const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
        validate: {
            notEmpty: { //can be 'true' OR msg as follows
                msg: 'Please provide a value for "title"',
            },
            notNull: {
                msg: 'Please provide a value for "title"',
              },  
        },
    },
      //Sequelize.STRING is 255 (or varchar(255)), but you can specify a different length after the type. For example, Sequelize.STRING(500)
    runtime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { 
            notNull: {
                msg: 'Please provide a value for "title"',
              }, 
              min: {
                args: 1, //runtime must be 1 or greater
                msg: 'Please provide a value greater than "0" for "runtime"',
              }     
        },
    },
    releaseDate: {
        type: Sequelize.DATEONLY, // DATE data type accepts a date value provided in yyyy-mm-dd hh:mm:ss format, while DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time).
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide a value for "title"',
              },  
              isAfter: {
                args: '1895-12-27',
                msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
              },      
        }
    },     isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        validate: {},
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //sets value as primary key value
        autoIncrement: true, //auto increments on each new row
        validate: {},
    }
  }, { sequelize });

  return Movie;
};
