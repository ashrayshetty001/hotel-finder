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

//new route
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs');
})

//create route
app.post('/listings',async (req,res)=>{
    const newListing=req.body.listing;
    newListing.save();
    res.redirect("/listings");
    
})


//show route
app.get('/listings/:id',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    else{res.render('listings/show.ejs',{listing});}
    
})

app.get('/alllistings',async (req,res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index.ejs',{allListings});
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
