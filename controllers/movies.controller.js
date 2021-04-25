import Movie from '../models/movies.model'
import logger from '../core/logger/app-logger'

const controller = {};

function getAll_review_of_specific_user(all_reviews,id){
    let result = [];
    all_reviews.forEach(all_review => {
        const res = all_review.all_rating.find(rating => rating.user_id === id);
        if(res != null){
            result.push(res);
        }
    });
    return result;
}

controller.getAll = async (req, res) => {
    try {
        const all_reviews = await Movie.getAll();
        let result = getAll_review_of_specific_user(all_reviews,req.query.user_id);
        res.send(result);
    }
    catch(err) {
        logger.error('Error in getting review- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addReview = async (req, res) => {
    const existedMovie = await Movie.findOne({movie_id:req.body.movie_id}).exec()
    if(existedMovie != null && existedMovie != {}){
        
        const isExistedUser = existedMovie.all_rating.some(review => review.user_id == req.query.user_id)
        if(isExistedUser){
            res.send({
                isExisted: 1,
                successful: 0
            });
        }else{
            logger.info('Adding review...');
            const result = await Movie.addReview(req.body.movie_id, {
                user_id: req.body.user_id,
                movie_id: req.body.movie_id,
                rating: req.body.rating,
                comment: req.body.comment
              },)
            res.send({
                isExisted: 1,
                successful: 0,
                result:result
            });
        }
    }else{
        const newMovie = Movie({
            movie_id:req.body.movie_id,
            all_rating: [
                {
                    user_id: req.body.user_id,
                    movie_id: req.body.movie_id,
                    rating: req.body.rating,
                    comment: req.body.comment
                }
            ]
        });
        logger.info('Adding new movie with review...');
        const savedMovie = await Movie.addMovie(newMovie);
        res.send('added: ' + savedMovie)
    }
}


export default controller;