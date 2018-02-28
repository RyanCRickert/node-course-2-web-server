const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	})
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: "We Will Be Right Back",
// 		welcomeMessage: "The site is currently under maintenance and should hopefully be back soon."
// 	});
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my first Node website.',
	});
})

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
		welcomeMessage: 'Here are the projects I am working on or have completed.',
	});
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: '404 page not found!'
	})
})
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});