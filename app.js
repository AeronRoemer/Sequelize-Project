const db = require('./db');
const { Movie } = db.models;
const { Person } = db.models;


(async () => {
        await db.sequelize.sync({ force: true });
  try {
      const dude = await Person.create({
        firstName: 'Joe',
        lastName: 'Hodfa'
      });
      console.log(dude.toJSON());  
      
      const movie3 = await Movie.build({
        title: 'Toy Story 3',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: false,
      });
  
  } catch(error){ //setup to catch validation errors
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message)
        console.error("Errors: ", errors)
      } else {
    throw error; //rethrows error
  }}
})();

  