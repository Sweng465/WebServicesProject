// server.js
const express = require('express');
const app = express();
app.use(express.json());

// simple array
let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, make: 'Honda', model: 'Accord', year: 2019 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021 }
];

let parts = [
    { id: 1, carId: 1, name: 'Brake Pads', price: 99.99, zipcode: '90210' },
    { id: 2, carId: 1, name: 'Oil Filter', price: 29.99, zipcode: '90210' },
    { id: 3, carId: 1, name: 'Air Filter', price: 19.99, zipcode: '90210' },
    { id: 4, carId: 2, name: 'Brake Pads', price: 99.99, zipcode: '90211' },
    { id: 5, carId: 2, name: 'Oil Filter', price: 29.99, zipcode: '90211' },
    { id: 6, carId: 2, name: 'Air Filter', price: 19.99, zipcode: '90211' }
];

// GET enpoint to get all cars
app.get("/api/cars", (req, res) => {
    res.json(cars);
})

// GET enpoint to get a part
app.get("/api/part/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    // basic validation
    if (!req.params.id || isNaN(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid part ID. Must be a positive number."
        });
    }
    
    const part = parts.find(p => p.id === id);
    if (!part) return res.status(404).send("Part not found.");
    res.json(part);
})

// GET enpoint to get all parts
app.get("/api/parts", (req, res) => {
    res.json(parts);
})

// POST endpoint to add a new car
app.post("/api/cars", (req, res) => {
    const { make, model, year } = req.body;

    // basic validation
    if (!make || !model || typeof year !=='number'){
        return res.status(400).json({
            error: "Invalid car data."
        });
    }

    // create new car object
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year,
    };

    // add to array and return
    cars.push(newCar);
    res.status(201).json(newCar);
})


// BUYER
// simple array
let buyers = [
    { id: 1, username: 'dave123', icon: 'IMG_1.png'},
    { id: 2, username: 'john34', icon: 'IMG_2.png'},
    { id: 3, username: 'john1976', icon: 'IMG_3.png'}
];

// GET enpoint to get all buyers
app.get("/api/buyers", (req, res) => {
    res.json(buyers);
})

// POST endpoint to add a new buyer account
app.post("/api/buyers", (req, res) => {
    const { username, icon } = req.body;

    // basic validation
    if (!username || !icon){
        return res.status(400).json({
            error: "Invalid buyer account data."
        });
    }

    // create new buyer object
    const newBuyer = {
        id: buyers.length + 1,
        username,
        icon,
    };

    // add to array and return
    buyers.push(newBuyer);
    res.status(201).json(newBuyer);
})


// POST endpoint to add a new part
app.post("/api/part", (req, res) => {
    const { carId, name, price, zipcode } = req.body;

    // basic validation
    if (!carId || !name || typeof price !== 'number' || !zipcode) {
        return res.status(400).json({
            error: "Invalid part data."
        });
    }

    // create new part object
    const newPart = {
        id: parts.length + 1,
        carId,
        name,
        price,
        zipcode
    };

    // add to array and return
    parts.push(newPart);
    res.status(201).json(newPart);
})

// POST endpoint to add multiple parts
app.post("/api/parts", (req, res) => {
    const newParts = req.body; // expecting an array of parts

    // basic validation
    if (!Array.isArray(newParts) || newParts.length === 0) {
        return res.status(400).json({
            error: "Invalid parts data. Must be a non-empty array."
        });
    }

    // validate each part
    for (const part of newParts) {
        const { name, price, zipcode } = part;
        if (!name || typeof price !== 'number' || !zipcode) {
            return res.status(400).json({
                error: "Invalid part data."
            });
        }

        // create new part object
        const newPart = {
            id: parts.length + 1,
            carId,
            name,
            price,
            zipcode
        };

        // add to array
        parts.push(newPart);
    }

    res.status(201).json(newParts);
})

// start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));