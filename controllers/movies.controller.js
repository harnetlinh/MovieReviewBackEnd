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
function getCurrentTime(){
    const d = new Date();
    return d.toISOString().slice(0,19).replace(/T/g," ");
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

controller.getReviewByMovie = async (req, res) => {
    try {
        const result = await Movie.getSpecificMovie(req.query.movie_id);
        logger.info('processing get review by movie_id '+ req.query.movie_id);
        if(result == null){
            const newMovie = Movie({
                movie_id:req.query.movie_id,
                all_rating: [
                ]
            });
            logger.info('Adding new movie with review...');
            const savedMovie = await Movie.addMovie(newMovie);
            res.send([]);

        }else{
            res.send(result.all_rating);
        }
    }
    catch(err) {
        logger.error('Error in getting review- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addReview = async (req, res) => {
    const existedMovie = await Movie.getSpecificMovie(req.body.movie_id);
    if(existedMovie != null && existedMovie != {}){
        const isExistedUser = existedMovie.all_rating.some(review => review.user_id == req.body.user_id)
        if(isExistedUser){
            logger.info('Existed user_id '+req.body.user_id+' in movie id ' + req.body.movie_id);
            
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
                comment: req.body.comment,
                movie_name: req.body.movie_name,
                date: getCurrentTime(),
              },)
            const check = await Movie.getSpecificMovie(req.body.movie_id);
            res.send({
                isExisted: 0,
                successful: 1,
                result:check.all_rating
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
                    comment: req.body.comment,
                    movie_name: req.body.movie_name,
                    date: getCurrentTime(),
                }
            ]
        });
        logger.info('Adding new movie with review...');
        const savedMovie = await Movie.addMovie(newMovie);
        const check = await Movie.getSpecificMovie(req.body.movie_id);
        res.send({
            isExisted: 0,
            successful: 1,
            result:check.all_rating
        })
    }
}


export default controller;