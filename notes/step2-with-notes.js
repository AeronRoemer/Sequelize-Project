const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    //which version of SQL is being used in the database
    dialect: 'sqlite',
    //specifies file path for database. Creates a movies.db
    storage: 'movies.db',
    //removes console logging of SQL commands
    logging: false,
    define: { //sets options globally rather than locally (see below in Movie Module)
      freezeTableName: true,
      timestamps: false,
    }  
});
//Movie Model
// Models are often defined as JavaScript classes. Each model (or class) 
//represents a thing that your application will be working with – all of the nouns
class Movie extends Sequelize.Model{}
  //initates the new Movie model, creates a new table in the DB
Movie.init(
    //first object literal defines COLUMNS of the table
    {
      //key + value is a data type
    title: Sequelize.STRING
    },
    //model options. Only required one is sequelize property
    { sequelize: sequelize,
      paranoid: true, // enable "soft" deletes - not returned in queries, but retained in DB
      tableName: 'my_movies_table', // table name change
      modelName: 'movie', // set model name to 'movie'; table name will be 'movies'. Avoid uppercase
      freezeTableName: true, // disable plural table names. Would automatically re-name to 'Movies' if not 
  }
)
//DATABASE CONNECTION - - - - -
// IIFE (Immediately Invoked Function Expression) created: (function)();
//run via npm start. Console should show 'connection success' and a new movies.db file should appear
(async () => {
    //Movie.sync() synchronizes table from db, sequelize.sync() does all
    await sequelize.sync( 
        //force completely drops & recreates table each time
        { force: true } );
  try{
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
        title: 'Toy Story',
    });
    // without declaring variable, simply await
    await Movie.create({
      title: 'Star Wars',});
    console.log(movie.toJSON())
    // OR: 
    const movies = await Promise.all([
      Movie.create({ //CREATE builds AND saves at the same time
        title: 'Movie1',}),
        Movie.create({
          title: 'Movie2',})
        ])
      //BUILD creates an instance but does not save it. ID would be null until saved
        const movie3 = await Movie.build({
          title: 'Toy Story 3',
          runtime: 103,
          releaseDate: '2010-06-18',
          isAvailableOnVHS: false,
        });
      await movie3.save(); // save the record
    
//FIND data
const movieById = await Movie.findByPk(1);
const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
const movies = await Movie.findAll();
console.log( movies.map(movie => movie.toJSON()) );
// SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
const movies = await Movie.findAll({
  where: {
    runtime: 92,
    isAvailableOnVHS: true
  },
  order: [['id', 'DESC']] // IDs in descending order
});
const moviesIdAndTitle = await Movie.findAll({
  attributes: ['id', 'title'], // return only id and title
});

//SAVE & UPDATE

const toyStory3 = await Movie.findByPk(3);
toyStory3.isAvailableOnVHS = true;
await toyStory3.save(); //only updates after save

const toyStory3 = await Movie.findByPk(3);
await toyStory3.update({
  isAvailableOnVHS: true,
});
  
const toyStory3 = await Movie.findByPk(3);
await toyStory3.update({
  title: 'Trinket Tale 3', // this will be ignored
  isAvailableOnVHS: true,
}, { fields: //alows only certain feilds to be updated
   ['isAvailableOnVHS', 'other thing'] }); 

//DELETE RECORDS
await toyStory.destroy();



//AUTHENTICATE DB CONNECTION
    // await sequelize.authenticate();
    // console.log("connection success")
  }catch(error){
    console.error("Database error: ", error)
  }
})();