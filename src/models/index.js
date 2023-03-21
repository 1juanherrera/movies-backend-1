const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Actor.belongsToMany(Movie, { through: 'MovieActors'});
Movie.belongsToMany(Actor, { through: 'MovieActors'});

Movie.belongsToMany(Director, { through: 'MovieDirectors'});
Director.belongsToMany(Movie, { through: 'MovieDirectors'});

Movie.belongsToMany(Genre, { through: 'movieGenres'});
Genre.belongsToMany(Movie, { through: 'MovieGenres'});


