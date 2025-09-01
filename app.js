const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate=require('ejs-mate');

const MongoURL='mongodb://localhost:27017/delta';

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

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
});

//create route
app.post('/listings',async (req,res)=>{
    const newListing=req.body.listing;
    await newListing.save();
    res.redirect("/listings");
    
});


//show route
app.get('/listings/:id',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    else{res.render('listings/show.ejs',{listing});}
    
});

//Index route
app.get('/listings',async (req,res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index.ejs',{allListings});
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  });
  
  //Update Route
  app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });
  
  //Delete Route
  app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
