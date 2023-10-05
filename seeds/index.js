const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers'); 
const Campground = require('../models/campground');
const { application } = require('express');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 10; i++){
        const random20 = Math.floor(Math.random() * 20);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author : '6421c97c6261e211a4866119',
            location: `${cities[random20].city}, ${cities[random20].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores minima minus labore, amet, nisi, aliquam facilis sit quibusdam voluptatem nostrum illum dolore rem? Quam iure culpa architecto nostrum libero quo?',
            price,
            images: [
                {
                  url: 'uploads\\897129899ae4156f6123ed3e9bda93b9',
                  filename: '897129899ae4156f6123ed3e9bda93b9',
                }
              ],
        })
        await camp.save();
    }
}


seedDB().then(()=>{
    mongoose.connection.close();
})