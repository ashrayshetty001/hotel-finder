const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required:true,
    description: String,
    },
    image: {
        type:String,
        default: "https://www.bing.com/ck/a?!&&p=12a4bea2015a019b1cd0c9600fc9ded076cc900993e57bf36a251b548062ba9cJmltdHM9MTc1NTMwMjQwMA&ptn=3&ver=2&hsh=4&fclid=3387b72a-d866-6bad-14c4-a3e3d9196a14&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbWFnZSZpZD0yQTA0ODU5RkI3ODM5MzUzODIwOTkzQTAyRDg2REExNUI5RjFDREUyJkZPUk09SVFGUkJB&ntb=1",
        set: (v) => v === '' ? "https://www.bing.com/ck/a?!&&p=12a4bea2015a019b1cd0c9600fc9ded076cc900993e57bf36a251b548062ba9cJmltdHM9MTc1NTMwMjQwMA&ptn=3&ver=2&hsh=4&fclid=3387b72a-d866-6bad-14c4-a3e3d9196a14&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbWFnZSZpZD0yQTA0ODU5RkI3ODM5MzUzODIwOTkzQTAyRDg2REExNUI5RjFDREUyJkZPUk09SVFGUkJB&ntb=1" : v,
    } ,
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;