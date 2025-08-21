const Listing = require('../models/listing.js');
const initdata = require('./data.js');
const mongoose = require('mongoose');

const MongoURL='mongodb://localhost:27017/delta';

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MongoURL);
}

const initdb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data has been initialized");
}

initdb();