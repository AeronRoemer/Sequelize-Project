const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    //which version of SQL is being used in the database
    dialect: 'sqlite',
    //specifies file path for database. Creates a movies.db
    storage: 'movies.db'  
});

// IIFE (Immediately Invoked Function Expression) created: (function)();
//run via npm start. Console should show 'connection success' and a new movies.db file should appear
(async ()=> {
  try{
    await sequelize.authenticate();
    console.log("connection success")
  }catch(error){
    console.error("Database error: ", error)
  }
})();