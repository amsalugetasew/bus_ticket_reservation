import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

// Bus Model
var BusSchema = mongoose.Schema({
    plateNumber: String,
    busNumber: String,
    busTitle: String,
    seatNumber: String
});


// var Bus = mongoose.models.BusSchema || mongoose.model('Kacha', BusSchema, 'Bus');
const Bus = mongoose.models.BusSchema || mongoose.model('Bus', BusSchema);

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://gechsew:Gecho%401078@cluster0.y5pxl.mongodb.net/Kacha', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
// const ObjectId = require("mongodb").ObjectId;
export const getBuses = (req, res) => {
    Bus.find().then(function (bus) {
        res.json(bus);
    });



}
export const getBus = (req, res, next) => {
    const id = req.params.id;
    Bus.findById({ _id: id })
        .then(bus => res.json(bus))
        .catch(err => next(err));
}

export const createBus = (req, res) => {
    Bus.find({ plateNumber: req.body.plateNumber }).exec()
        .then(function (bus) {
            if (bus.length !== 0) {
                console.log("Bus with plate number " + req.body.plateNumber + " already exist")
            }
            else {
                Bus.find({ busNumber: req.body.busNumber }).exec()
                    .then(function (bus) {
                        if (bus.length !== 0) {
                            console.log("Bus with bus number " + req.body.busNumber + " already exist")
                        }
                        else {
                            var bus = new Bus({
                                plateNumber: req.body.plateNumber,
                                busNumber: req.body.busNumber,
                                busTitle: req.body.busTitle,
                                seatNumber: req.body.seatNumber                        
                            });
                            bus.save()
                                .then(bus => {
                                    res.status(200).json({ 'Bus': 'Bus added successfully' });
                                })
                                .catch(err => {
                                    res.status(400).send('adding new Bus failed');
                                });
                        }
                    });
            }
        });


    
}

export const deleteBus = (req, res) => {

    const BusToDelete = req.params.id;
    Bus.findByIdAndDelete({ _id: BusToDelete })
        .then(deletedBus => res.send(deletedBus + "Deleted Successfully"))
        // .then(deletedTrip => res.send(deletedTrip))
        .catch(err => next(err));
    // Bus.findByIdAndDelete({ _id: BusToDelete })
    //     .then(deletedBus => res.json(deletedBus))
    //     .catch(err => next(err));
}
// getNumberOfSeat
export const getNumberOfSeat = (req, res) => {
    const plate = req.body.plateNumber;
    Bus.find({plateNumber: plate }).exec().then(trip => res.json(trip));
}
export const editBus = (req, res) => {
    const busToEdit = req.params.id;
    Bus.findByIdAndUpdate({ _id: busToEdit },
        {
            plateNumber: req.body.plateNumber,
            busNumber: req.body.busNumber,
            busTitle: req.body.busTitle,
            seatNumber: req.body.seatNumber
        })
        .then(editedBus => res.json(editedBus))
        .catch(err => next(err))

    // Bus.findById({ _id: busToEdit })
    //     .then(editedBus => res.json(editedBus))
    //     .catch(err => next(err));
}