import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const schema = new Schema({
	stars: {
		type: 'number',
		required: [true, 'A number of stars must me provided'],
		min: [ 1, 'Please give a number between 1 and 5' ],
		max: [ 5, 'You are very nice, but you can not give over 5 stars' ],
	},
	author: {
		type: 'string',
		required: [true, 'An author must be provided']
	},
	profilePicture: {
		type: 'string',
		required: [true, 'A profile picture must be provided']
	},
	title: {
		type: 'string',
		required: [true, 'A title must be provided']
	},
	body: {
		type: 'string',
		required: [true, 'A body must be provided']
	},
});

schema.set('timestamps', true);

export default model('feedback', schema);