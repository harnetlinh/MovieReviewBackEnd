
const mdb = require('moviedb')(process.env.MOVIEDB_API_KEY);

exports.movieInfo = (req, res) => {
    
    mdb.movieInfo({id: 11}, (error, response)=)
      
}

//   .miscPopularMovies({}, function(err, res){
//     console.log(err);
//     console.log('--------','ninja');
//     console.log(res);
//   });