const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const session = require("express-session");
const cors = require("cors");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET } = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = ()=>{
    mongoose.connect(mongURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Succesfully connected to DB");
    }).catch((e)=>{
        console.log(e);
        setTimeout(connectWithRetry,5000);//ngo3do ghir nsyo nmcho bdd min n9ado nmchoha 3adak nro7o nmcho  server
    })
}
connectWithRetry();

app
.enable("trust proxy")
.use(cors())
.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false,//don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: mongURL,
        autoRemove: 'interval',
        autoRemoveInterval: 1 ,// In minutes. Default
        ttl: 30,
    }),
    cookie:{
        maxAge: 30000,
    }
})).use(express.json());

app.get("/api/v1",(req,res)=>{
    res.send("<h2>Hi There!!</h2>");
    console.log("yeah it ran");
});
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/users",userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));