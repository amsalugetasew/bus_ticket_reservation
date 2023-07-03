import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Reserve Model
var ReserveSchema = mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    age: String,
    gender: String,
    email: String,
    phoneNumber: String,
    TripName: String,
    plateNumber: String,
    DepartingCity: String,
    Date: String,
    Time: String,
    DestinationCity: String,
    Arriv_Time: String,
    seatNumber: String,
    seatPosition: String,
    PSR: String,
    seatStatus: String
});
var Reserve = mongoose.models.ReserveSchema || mongoose.model('Reserve', ReserveSchema);
// var Trip = mongoose.model('Trip', TripSchema);
// var Trip = mongoose.model.Trip || mongoose.model('Trip', TripSchema);
// var Seat = mongoose.model.Seat || mongoose.model('Seat', SeatSchema);
app.use(cors());
app.use(bodyParser.json());


// export const getagregated = (req, res, next) => {
//     Reserve.aggregate([
//         { $match: { "plateNumber": "A6654" } },
//       {
//         $lookup: {
//           from: "buses",
//           localField: "plateNumber",
//           foreignField: "plateNumber",
//           as: "Bus"
//         }
//       }, 
//     ]).then((data) => res.json(data))
//   }



export const getReservees = (req, res) => {
    Reserve.find().then(function (trip) {
        res.json(trip);
    });
}
export const seatInfo = (req, res) => {
    const per = req.body.per;
    const departingDate = req.body.Date;
    const plate = req.body.plateNumber;
    const status = req.body.status;
    const tripName = req.body.tripName;
    if (per === "Bus")
    {    
    Reserve.find({ Date: departingDate, plateNumber: plate, seatStatus: status }).exec().then(trip => res.json(trip));
    }
    else if (per === "Trip"){
        Reserve.find({ Date: departingDate, TripName: tripName, seatStatus: status }).exec().then(trip => res.json(trip));
    }
    else{
        res.send("Please enter required query input")
    }
}
export const cancelReserveInfo = (req, res) => {
    const departingDate = req.body.Date;
    const phone = req.body.phoneNumber;
    const psr = req.body.PSR;
    Reserve.find({ Date: departingDate, PSR: psr, phoneNumber: phone, seatStatus: "Reserved" }).exec().then(trip => res.json(trip));
}
export const getReserveInfo = (req, res) => {
    const departingDate = req.body.Date
    // req.body.Date;
    // console.log(departingDate)
    Reserve.find({ Date: departingDate, seatStatus: "Available" }).exec().then(trip => res.json(trip));
}
export const getReserve = (req, res, next) => {

    const id = req.params.id;
    Reserve.findById({ _id: id })
        .then(trip => res.json(trip))
        .catch(err => next(err));
}

export const createReserve = (req, res) => {
    
    var i = 1;
    var seatcode = "A";
    var firstName = "";
    var middleName = "";
    var lastName = "";
    var age = "";
    var gender = ""
    var email = "";
    var phoneNumber = "";
    var seatNumber = req.body.seatNumber;
    // console.log(seatNumber)
    while (i <= seatNumber) {
        Reserve.insertMany([
            {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                age: age,
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                TripName: req.body.TripName,
                plateNumber: req.body.plateNumber,
                DepartingCity: req.body.DepartingCity,
                Date: req.body.Date,
                Time: req.body.Time,
                DestinationCity: req.body.DestinationCity,
                Arriv_Time: req.body.Arriv_Time,
                seatNumber: seatcode + i,
                seatPosition: i,
                PSR: "",
                seatStatus: "Available"
            },
        ])
        i++;
    }
}

export const deleteReserve = (req, res) => {
    const tripToDelete = req.params.id;
    const tripName = req.params.TripName;
    Reserve.findByIdAndDelete({ _id: tripToDelete })
        .then(deletedTrip => res.send(tripToDelete + "Deleted Successfully"))
        // .then(deletedTrip => res.send(deletedTrip))
        .catch(err => next(err));
}
export const editReserve = (req, res, next) => {
    let passangerSeatRecord = (Math.random() + 1).toString(36).substring(7);
    const tripToEdit = req.params.id;
          Reserve.findByIdAndUpdate({ _id: tripToEdit },
            {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                seatStatus: "Reserved",
                PSR : passangerSeatRecord
            })
            .then(editTrip => res.send(passangerSeatRecord))
            .catch(err => next(err))
}
export const cancelReserve = (req, res, next) => {
    const tripToCancel = req.params.id;
    let counter = 0;
    Reserve.findById({ _id: tripToCancel })
        .then(function (trip) {
            var dateString = trip.Date;
            var year = dateString.substring(0, 4);
            var month = dateString.substring(5, 7);
            var day = dateString.substring(8, 10);
            var dates = month + ' ' + day + ', ' + year + ' ' + trip.Time + ':00';

            const d = new Date(dates);
            let minutes = d.getMinutes();
            let hours = d.getHours();
            let seconds = d.getSeconds();

            let startDate = year.toString() + month.toString() + day.toString();
            let datess = new Date();
            let cyear = datess.getFullYear();
            let cmonth = datess.getMonth() + 1;
            let cday = datess.getDate();
            let chour = datess.getHours();
            let cminute = datess.getMinutes();
            let csecond = datess.getSeconds();
            if (cmonth < 10) {
                cmonth = '0' + cmonth;
            }
            if (cday < 10) {
                cday = '0' + cday;
            }
            if (chour < 10) {
                chour = '0' + chour
            }
            if (cminute < 10) {
                cminute = '0' + cminute
            }
            if (csecond < 10) {
                csecond = '0' + csecond
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            const cancelDate = cyear.toString() + cmonth.toString() + cday.toString();
            let dateDiffernce = parseFloat(startDate) - parseFloat(cancelDate)
            const startTime = hours.toString() + minutes.toString() + seconds.toString();
            const showTime = chour.toString() + cminute.toString() + csecond.toString();
            let reminingTime = parseFloat(startTime) - parseFloat(showTime);
            if (dateDiffernce === 0) {
                if (reminingTime < 60000) {
                    console.log("you are not allowed to cancel the trip")
                    res.send("you are not allowed to cancel the trip")
                }
                else {
                    counter++;
                    // Reserve.findByIdAndUpdate({ _id: tripToCancel },
                    //     {
                    //         firstName: "",
                    //         middleName: "",
                    //         lastName: "",
                    //         age: "",
                    //         gender: "",
                    //         email: "",
                    //         phoneNumber: "",
                    //         PSR: "",
                    //         seatStatus: "Available"
                    //     })
                    //     .then(cancelTrip => res.json(cancelTrip))
                    //     .catch(err => next(err))
                }
            }
            else {
                counter++;
                // Reserve.findByIdAndUpdate({ _id: tripToCancel },
                //     {
                //         firstName: "",
                //         middleName: "",
                //         lastName: "",
                //         age: "",
                //         gender: "",
                //         email: "",
                //         phoneNumber: "",
                //         PSR: "",
                //         seatStatus: "Available"
                //     })
                //     .then(cancelTrip => res.json(" Successfully Canceled"))
                //     .catch(err => next(err))
            }

        })
        if (counter >=1 )
        {
            Reserve.findByIdAndUpdate({ _id: tripToCancel },
                    {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        age: "",
                        gender: "",
                        email: "",
                        phoneNumber: "",
                        PSR: "",
                        seatStatus: "Available"
                    })
                    .then(cancelTrip => res.send(" Successfully Canceled"))
                    .catch(err => next(err))
        }
}