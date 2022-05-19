
const express = require("express");
const createError = require("http-errors");

const db = require('../database/database');
const router = express.Router();




router.get('/admin', function(req, res, next) {


    try {

        const getquery = "SELECT * FROM guest";

        db.query(getquery, (err, result) => {
    
            if(err){
              next(createError("Internal server error"));
              return;
            }else{
              if(result.length === 0){
                res.status(200).json({
                  guests: [],
                  message: "No guest on the guest list yet."
                });
              }
              if(result.length > 0){
                res.status(201).json({
                  guests: result
                });

                next();

              }
            }
        });

        
    } catch (error) {
        throw next(createError("Internal server error"));

    }
  


});


router.post('/save-a-date/:id', function(req, res, next) {

  try {

    const id = req.params.id;

    const {name, numOfGuests} = req.body;
  
    const getEvent = () => {
  
      if(id === "1"){
  
        return "Trads";
  
      }else if(id === "2"){
  
        return "White";      
  
      }
      else{
  
        return "Party";
          
      }
    }
  
    const event = getEvent();

    
    if(name === "" || numOfGuests === ""){


      // res.status(406).json({
      //   noContent: "Please make sure you type in your name and the number of accompanying guests."
      // }); 

      next(createError("Bad request. Please make sure your credentials are correct"));
      return;

      
      
    }
    else{

      const guestQuery = "SELECT * FROM guest WHERE name = ? AND event = ?";
      const insertquery = "INSERT INTO guest (name, numOfGuests, event) VALUES (?)";

      db.query(guestQuery, [[name], [event] ], (err, result1) => {

        if(err){

          next(createError("Internal server error"));
          return;

        }
        if(result1.length > 0){
  
          res.status(204).json({
            noContent: "A seat has been reserved for this name already."
          }); 

          next();

  
        }else{
  
          const values = [name, numOfGuests, event];
  
  
          db.query(insertquery, [values],  (err, result2) => {
        
            if(err){
                
              next(createError("Internal server error"));
              return;

            }
            if(result2){
        
              res.status(200).json({
                message: "You have successfully saved a date"
              }); 
              
              next();
              
              
            }
          });
          
        }
  
      });

      
    } 

    
  } catch (error) {

    next(createError("Internal server error"));
  }



  

});

module.exports = router;
