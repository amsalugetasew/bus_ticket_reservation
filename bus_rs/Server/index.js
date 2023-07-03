import  express from 'express';
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 8000;
import tripRoutes  from "./Route/Trip.js"
import reserveRoutes  from "./Route/Reserve.js"
import busRoutes  from "./Route/Bus.js"
import userRoutes  from "./Route/User.js"
app.use(bodyParser.json());
app.use(cors());

app.use("/", busRoutes);
app.use("/", tripRoutes);
app.use("/", reserveRoutes);
app.use("/", userRoutes);
app.get("/", (req, res)=> res.send("Hello from Express"));
app.all("*",(req, res)=> res.send("This route doesn't exist"));
app.listen(port, ()=>
console.log(`Server is Listening on Port http://localhost:${port}`)
);