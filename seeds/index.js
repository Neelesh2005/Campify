const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { coordinates } = require('@maptiler/client');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6672c49d72f7b14e9cc83e60',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                
                {

                    url: 'https://res.cloudinary.com/dzduhn81d/image/upload/v1718991493/YelpCamp/r0wy72e5prljzlgmwxie.png',
                    filename: 'YelpCamp/r0wy72e5prljzlgmwxie'
                },
                {

                    url: 'https://res.cloudinary.com/dzduhn81d/image/upload/v1718991494/YelpCamp/a1zb0cas2d1z8pxyssry.png',
                    filename: 'YelpCamp/a1zb0cas2d1z8pxyssry'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry:{
                type:'Point',
                coordinates : [cities[random1000].longitude,cities[random1000].latitude]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})