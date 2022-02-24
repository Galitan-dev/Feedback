import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import api from './api.js';

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);

console.log(`\n============ Feedback API v${process.env.npm_package_version} ============\n`);

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI, {}, (err) => {
	if (err) throw err;
	console.log('Connected to MongoDB !');

	console.log('Starting server...');
	app.listen(PORT, () => console.log(`Server listening on port ${PORT} !`));
});
