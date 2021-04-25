import express from "express";
import movieController from "../controllers/movies.controller"
const router = express.Router()

router.get('/allreview', (req, res) => {
    movieController.getAll(req, res);
});

router.post('/addReview', (req, res) => {
    movieController.addReview(req, res);
});

export default router;