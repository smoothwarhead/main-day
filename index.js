const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const logger = require('morgan');
const cors = require('cors');
let PORT = process.env.PORT || 8000;

const guestsRouter = require('./routes/guests');


app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(guestsRouter);





app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.status(204);
    }
  
    return next();
  
});

app.get("/", (req, res) => {
    res.send("The day server");
});


//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, "Not found"));
})


//generic error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});