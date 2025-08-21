const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');

const MongoURL='mongodb://localhost:27017/delta';

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MongoURL);
}

app.get('/', (req, res) => {
    res.send('Hi i am root');
});

app.get('/testlisting',async (req,res)=>{
    const sampleListing = new Listing({
        title:'White Mansion',
        description:'A white mansion with a pool',
        image:'',
        price:1000000,
        location:'New York',
        country:'USA',
    })
    await sampleListing.save();
    console.log("sampleListing successfull");
    res.send("sampleListing successfull");

})

app.get('/alllistings',async (req,res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index',{allListings});
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
