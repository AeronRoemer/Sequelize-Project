const db = require('./db');
const { Movie } = db.models;


(async () => {
        await db.sequelize.sync({ force: true });
  try {
    const movie = await Movie.create({
        title: 'Toy Story',})
    const movie2 = await Movie.create({
            title: 'Star Wars',});
  } catch(error){
    console.error("Database error: ", error)
  }
})();

  