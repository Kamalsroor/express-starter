const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');
const path = require('path');
const app = express();


const dev = process.env.NODE_ENV !== 'production'

if(dev){
    // loading environment variable from different path in case of dev server
	require('dotenv').config({path : path.resolve(process.cwd(), '.env.development.local')})

    // Allow api call from any origin on dev 
	app.use(cors())
	app.options('*', cors())

    //Enable logs in dev environment
    app.use(morgan('dev'));
}else{
    //loading environment variable from default file '.env'
	require('dotenv').config()

    //disabling all console.logs in prod environment
	console.log = function () {};

    // Allow api call only from trusted website on production, in this case it will be your app server(react/ angular) url
	// var whitelist = ['https://google.com']
	var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
		    callback(null, true)
		} else {
		    callback(new Error('Not allowed by CORS'))
		}
	}
	}
	app.use(cors())
	app.options(corsOptions, cors()) 
}



//loading db config values
const dbConfig = require('../config/db');


async function seedCollection(Model, data , collectionName = "") {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);


    await Model.insertMany(data);
    console.log(`Seeded ${collectionName} collection successfully.`);

    await mongoose.connection.close();
  } catch (error) {
    console.log(`Error seeding ${collectionName} collection: `, error);
    await mongoose.connection.close();
  }
}

module.exports = seedCollection;