import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

var SeatSchema = mongoose.Schema({
    plateNumber: String,
    busNumber: String,
    busTitle: String,
    seatNumber: String,
    seatStatus: String
});


// Bus Model
var TripSchema = mongoose.Schema({
    TripName: String,
    plateNumber: String,
    DepartingCity: String,
    Date: String,
    Time: String,
    DestinationCity: String,
    Arriv_Time: String
});
var Trip = mongoose.models.TripSchema || mongoose.model('Trip', TripSchema);
// var Trip = mongoose.model('Trip', TripSchema);
// var Trip = mongoose.model.Trip || mongoose.model('Trip', TripSchema);
// var Seat = mongoose.model.Seat || mongoose.model('Seat', SeatSchema);
app.use(cors());
app.use(bodyParser.json());


export const getagregated = (req, res, next) => {
    Trip.aggregate([
        { $match: { "plateNumber": "A6654" } },
        {
            $lookup: {
                from: "buses",
                localField: "plateNumber",
                foreignField: "plateNumber",
                as: "Bus"
            }
        },
    ]).then((data) => res.json(data))
}



export const getTripes = (req, res, next) => {
    Trip.find().then(function (trip) {
        res.json(trip);
    });
}
export const getTripeInfo = (req, res, next) => {
    const departingDate = req.body.Date;
    Trip.find({ Date: departingDate }).exec().then(trip => res.json(trip));
}
export const getTrip = (req, res, next) => {

    const id = req.params.id;
    Trip.findById({ _id: id })
        .then(trip => res.json(trip))
        .catch(err => next(err));
}

export const createTrip = (req, res, next) => {

    const departingDate = req.body.Date;
    let sourceCity = req.body.DepartingCity;
    let destinationCity1 = req.body.DestinationCity;
    let message = "";
    let i = 0, count = 0, c = 0, len = 0;
    Trip.find({ Date: departingDate, plateNumber: req.body.plateNumber }).exec()
        .then(function (trip) {
            if (trip.length === 0) {
                Trip.find({ plateNumber: req.body.plateNumber }).exec()
                    .then(function (trip) {
                        len = trip.length
                        if (trip.length === 0) {
                            sourceCity = req.body.DepartingCity;
                            destinationCity1 = req.body.DestinationCity;
                        }
                        else 
                        {

                            let destcty;
                            let depcity;
                            while (i < trip.length) {
                                let dt1 = trip[i].Date
                                let dt2 = departingDate
                                var date1 = new Date(dt1);
                                var date2 = new Date(dt2);
                                var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
                                if (diffDays === 1) {
                                    destcty = trip[i].DestinationCity;
                                    count++;
                                    c++;                                  
                                }
                                else if (diffDays === -1) {
                                    depcity = trip[i].DepartingCity;
                                    count += 2;
                                    c++;                                
                                }
                                i++;
                            }
                            if (c === 2) {
                                sourceCity = destcty;
                                destinationCity1 = depcity
                                if (sourceCity !== req.body.DepartingCity || destinationCity1 !== req.body.DestinationCity) {
                                    
                                    message = "please select correct source and destination city"
                                }
                                else {
                                    sourceCity = destcty;
                                    destinationCity1 = depcity;
                                }
                            }
                            else if (count === 1) {
                                if (destcty === req.body.DepartingCity) {
                                    destinationCity1 = req.body.DepartingCity
                                
                                }
                                else {
                                    message = "Please try to change departing city"
                                }
                            }
                            else if (count === 2) {
                                if (depcity === req.body.DestinationCity) {
                                    sourceCity = req.body.DestinationCity
                                }
                                else {
                                    message = "Please try to change Destination city"
                                }
                            }
                            else {
                                sourceCity = req.body.DepartingCity;
                                destinationCity1 = req.body.DestinationCity;

                            }

                        }
                        if (message !== ""){
                            res.send(message)
                        }
                        else
                        {
                            var trip = new Trip({
                                TripName: sourceCity + ' to ' + destinationCity1,
                                plateNumber: req.body.plateNumber,
                                DepartingCity: sourceCity,
                                Date: req.body.Date,
                                Time: req.body.Time,
                                DestinationCity: destinationCity1,
                                Arriv_Time: req.body.Arriv_Time
                            });
                            trip.save()
                                .then(trip => {
                                    res.send({ 'Trip': 'Trip added successfully' });
                                })
                                .catch(err => {
                                    res.send('adding new Trip failed');
                                });



                        }
                    })

            }
            else {
                res.send("Bus is already reserved on this date")
            }
        })
}

export const deleteTrip = (req, res, next) => {
    const tripToDelete = req.params.id;
    Trip.findByIdAndDelete({ _id: tripToDelete })
        .then(deletedTrip => res.send('Departing Date: ' + deletedTrip.Date + ' Trip name: ' + deletedTrip.TripName + ' Departing City: ' + deletedTrip.DepartingCity + " is Deleted Successfully"))
    
        .catch(err => next(err));
}
export const editTrip = (req, res, next) => {
    const departingDate = req.body.Date;
    let sourceCity = req.body.DepartingCity;
    let destinationCity1 = req.body.DestinationCity;
    let message = "";
    let i = 0, count = 0, c = 0, len = 0;
    Trip.find({ Date: departingDate, plateNumber: req.body.plateNumber }).exec()
        .then(function (trip) {
            if (trip.length === 0) {
                Trip.find({ plateNumber: req.body.plateNumber }).exec()
                    .then(function (trip) {
                        len = trip.length
                        if (trip.length === 0) {
                            sourceCity = req.body.DepartingCity;
                            destinationCity1 = req.body.DestinationCity;
                        }
                        else 
                        {

                            let destcty;
                            let depcity;
                            while (i < trip.length) {
                                let dt1 = trip[i].Date
                                let dt2 = departingDate
                                var date1 = new Date(dt1);
                                var date2 = new Date(dt2);
                                var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
                                if (diffDays === 1) {
                                    destcty = trip[i].DestinationCity;
                                    count++;
                                    c++;                                  
                                }
                                else if (diffDays === -1) {
                                    depcity = trip[i].DepartingCity;
                                    count += 2;
                                    c++;                              
                                }
                                i++;
                            }
                            if (c === 2) {
                                sourceCity = destcty;
                                destinationCity1 = depcity
                                if (sourceCity !== req.body.DepartingCity || destinationCity1 !== req.body.DestinationCity) {
                                    
                                    message = "please select correct source and destination city"
                                }
                                else {
                                    sourceCity = destcty;
                                    destinationCity1 = depcity;
                                }
                            }
                            else if (count === 1) {
                                if (destcty === req.body.DepartingCity) {
                                    destinationCity1 = req.body.DepartingCity
                                    
                                }
                                else {
                                    message = "Please try to change departing city"
                                }
                            }
                            else if (count === 2) {
                                if (depcity === req.body.DestinationCity) {
                                    sourceCity = req.body.DestinationCity
                                }
                                else {
                                    message = "Please try to change Destination city"
                                }
                            }
                            else {
                                sourceCity = req.body.DepartingCity;
                                destinationCity1 = req.body.DestinationCity;

                            }

                        }
                        if (message !== ""){
                            res.send(message)
                        }
                        else
                        {
    const tripToEdit = req.params.id;
    Trip.findByIdAndUpdate({ _id: tripToEdit },
        {
            TripName: req.body.DepartingCity + ' to ' + req.body.DestinationCity, 
            BusNumber: req.body.BusNumber, DepartingCity: req.body.DepartingCity, Date: req.body.Date,
            Time: req.body.Time,
            DestinationCity: req.body.DestinationCity,
            Arriv_Time: req.body.Arriv_Time
        })
        .then(editTrip => res.json(editTrip))
        .catch(err => next(err))


        
    }
})

}
else {
res.send("Bus is already reserved on this date")
}
});
}