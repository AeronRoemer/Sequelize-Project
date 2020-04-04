const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
        validate: {
            notEmpty: { //can be 'true' OR msg as follows
                msg: 'Please provide a value for "First Name"',
            },
            notNull: {
                msg: 'Please provide a value for "First Name"',
              },  
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
        validate: {
            notEmpty: { //can be 'true' OR msg as follows
                msg: 'Please provide a value for "Last Name"',
            },
            notNull: {
                msg: 'Please provide a value for "Last Name"',
              },  
        },
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //sets value as primary key value
        autoIncrement: true, //auto increments on each new row
        validate: {},
    }
  }, { sequelize });

  return Person;
};