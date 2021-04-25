import mongoose from 'mongoose';

const subSchema = mongoose.Schema({
    user_id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    movie_id: {
        type: String,
        required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      default: ""
    },
  });

const MovieSchema = mongoose.Schema({
    movie_id: {type: String, required: true, unique: true, index: true},
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
        { movie_id: movieID }, 
        { $push: { all_rating: reviewInfo } },
        // done
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