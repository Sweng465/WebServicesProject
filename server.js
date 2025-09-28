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

// GET enpoint to get all cars
app.get("/api/cars", (req, res) => {
    res.json(cars);
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

// start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));