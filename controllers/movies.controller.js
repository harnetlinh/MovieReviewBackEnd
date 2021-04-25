import Movie from '../models/movies.model'
import logger from '../core/logger/app-logger'

const controller = {};

function getAll_review_of_specific_user(all_reviews,id){
    let result = [];
    all_reviews.forEach(all_review => {
        const res = all_review.all_rating.find(rating => parseInt(rating.id) === id);
        if(res != null){
            result.push(res);
        }
    });
    return result;
}

controller.getAll = async (req, res) => {
    try {
        const all_reviews = await Movie.getAll();
        let result = getAll_review_of_specific_user(all_reviews,parseInt(req.query.id));
        res.send(result);
    }
    catch(err) {
        logger.error('Error in getting cars- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addReview = async (req, res) => {
    // const test = await Movie.didUserReviewed(req.query.movieID, req.query.userID)
    const test = await Movie.findOne({movieID:req.query.movieID}).exec()
    console.log(req.query.movieID);
    console.log(req.query.userID);
    res.send(test);
    // try {
    //     const savedCar = await Car.addCar(carToAdd);
    //     logger.info('Adding car...');
    //     res.send('added: ' + savedCar);
    // }
    // catch(err) {
    //     logger.error('Error in getting cars- ' + err);
    //     res.send('Got error in getAll');
    // }
}

controller.deleteCar = async (req, res) => {
    let carName = req.body.name;
    try{
        const removedCar = await Car.removeCar(carName);
        logger.info('Deleted Car- ' + removedCar);
        res.send('Car successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete car- ' + err);
        res.send('Delete failed..!');
    }
}

export default controller;