import mongoose from 'mongoose';

const subSchema = mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
  });

const MovieSchema = mongoose.Schema({
    movieID: {type: String, required: true, unique: true, index: true},
    all_rating: [subSchema]
}, {collection : 'movie_db'});

let MovieModel = mongoose.model('movie_db', MovieSchema);

MovieModel.getAll = () => {
    return MovieModel.find({});
}

MovieModel.addMovie = (reviewToAdd) => {
    return reviewToAdd.save();
}

MovieModel.addReview = (movieID, reviewInfo) => {
    return MovieModel.update(
        { movieID: movieID }, 
        { $push: { all_rating: reviewInfo } },
        done
        )
};

MovieModel.hasMovie = (movieID) => {
    return MovieModel.find({
        movieID:movieID
    })
}

MovieModel.didUserReviewed = (movieID, userID) =>{
    return MovieModel.find({
        "movieID":movieID,
        // "all_rating.id": userID
    })
}

MovieModel.removeCar = (movieID) => {
    return MovieModel.remove({id: movieID});
}

export default MovieModel;