const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodem-db', { useNewUrlParser: true });

const nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});
const User = mongoose.model('User', nameSchema);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/saved', (req, res) => {
	const myData = new User(req.body);
	myData.save()
	.then(item => {
		res.send('Name saved to database');
	})
	.catch(err => {
		res.status(400).send('Error! Unable to save to database');
	});
});

app.listen(3000);
















