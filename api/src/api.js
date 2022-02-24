import { Router } from 'express';
import mongoose from 'mongoose';
import Feedback from './models/Feedback.js';
const { Types: { ObjectId: { isValid: isValidId } } } = mongoose;

const router = Router();

router.param('id', function( req, _res, next, id ) {
	req.id_from_param = id;
	next();
});

router.get('/feedbacks', async function (req, res) {
	let feedbacks;
	try {
		feedbacks = await Feedback.find().exec();
	} catch (err) {
		return res.status(500).send({
			code: 500,
			name: err.name,
			message: err.message,
			stack: err.stack.split('\n').slice(1)
		});
	}
	
	res.json(feedbacks);
});

router.post('/feedbacks/create', function (req, res) {
	/** @type {Feedback} */
	const feedback = new Feedback(req.body);
	
	feedback.validate(async (err) => {
		if (err) {
			return res.status(400).json({
				code: 400,
				name: 'Bad Request',
				message: 'Feedback Validation failed',
				errors: Object.entries(err.errors).map(([field, error]) => ({
					field,
					name: error.name,
					message: error.message,
					kind: error.kind,
				})),
			});
		}
		
		try {
			await feedback.save();
		} catch (err) {
			return res.status(500).send({
				code: 500,
				name: err.name,
				message: err.message,
				stack: err.stack.split('\n').slice(1)
			});
		}
		
		return res.status(200).send('The feedback was successfully created!');
	});
});

router.get('/feedbacks/get/:id', async function (req, res) {
	const id = req.id_from_param;

	if (!isValidId(id)) {
		res.status(400).send({
			code: 400,
			name: 'Bad Request',
			message: 'A valid id must me provided',
		});
		return;
	}

	let feedback;
	try {
		feedback = await Feedback.findById(id).exec();
	} catch (err) {
		return res.status(500).send({
			code: 500,
			name: err.name,
			message: err.message,
			stack: err.stack.split('\n').slice(1)
		});
	}
	
	if (!feedback) {
		res.status(404).send({
			code: 404,
			name: 'Not found',
			message: 'A feedback with that id does not exist',
		});
		return;
	}
	
	res.json(feedback);
});

export default router;
