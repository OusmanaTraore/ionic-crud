// Import the server configuration file
var config 			= require('./config'),

    /* Import the ExpressJS framework for Middleware/routing */
    express 		= require('express'),

    /* Import the File System module for enabling File I/O operations */
	fs      		= require("fs"),

    /* Import Mongoose for enabling communication with MongoDB and 
       management of data handling tasks */
	mongoose 		= require('mongoose'),

    /* Import Body Parser module for enabling data from POST requests
       to be extracted and parsed */
	bodyParser      = require("body-parser"),

    /* Import PDFKit module to dynamically generate and publish PDF 
       documents for the application */
	pdfKit      	= require("pdfkit"),

    /* Handle for storing the ExpressJS object */
	app 			= express(),

    /* Use ExpressJS Router class to create modular route handlers */
	apiRouter     	= express.Router(),

    /* Import path module to provide utilities for working with file 
       and directory paths */
	path 			= require('path'),

    /* Define Mongoose connection to project's MongoDB database */
	connection 		= mongoose.connect(config.database, { useMongoClient: true }),

    /* Import Schema for managing MongoDB database communication 
       with Mongoose */
	gallery         = require('./models/gallery');



/*

   Everything else that follows(all of the routes and application logic) 
   NEEDS to be placed BEFORE the code at the bottom of the file!     

*/
/* Manage size limits for POST/PUT requests */
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

/* Manage CORS Access for ALL requests/responses */
app.use(function(req, res, next)
{
   /* Allow access from any requesting client */
   res.setHeader('Access-Control-Allow-Origin', '*');

   /* Allow access for any of the following Http request types */
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

   /* Set the Http request header */
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});
/** 
 * Write the routes under this line
 * -------------------------
 */
apiRouter.get('/gallery', function(req, res) 
{
 /* Use the gallery model and access Mongoose's API to 
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
      gallery.find({ displayed: true }, (err, recs) =>
      {
   
         /* If we encounter an error log this to the console */
         if (err) 
         {
            console.dir(err);
         }
   
         /* Send the retrieve documents based as JSON encoded 
            data with the Router Response object */
         res.json({ records: recs });
   
      });
});




apiRouter.post('/gallery', function(req, res) 
{
 /* Retrieve the posted data from the Request object and assign
      this to variables */
      var name 			=	req.body.name,
      description 		=	req.body.description,
      thumbnail 		=	req.body.thumbnail,
      displayed 		=	req.body.displayed,
      date 			=	Date.now();


  /* Use the gallery model to access the Mongoose API method to
     add the supplied data as a new document to the MongoDB
     database */
  gallery.create({ name 			: name,  
                      description 	: description, 
                      thumbnail 		: thumbnail, 
                      displayed 		: displayed, 
                      date 			: date },
                   function (err, small) 
  {

     /* If we encounter an error log this to the console*/
     if (err) 
     {
        console.dir(err);
     }

     /* Document was successfully created so send a JSON encoded 
        success message back with the Router Response object */
     res.json({ message: 'success' });

  });

});



/* Handle PUT requests with expected recordID parameter */
apiRouter.put('/gallery/:recordID', function(req, res) 
{
/* Use the gallery model to access the Mongoose API method and
      find a specific document within the MongoDB database based 
      on the document ID value supplied as a route parameter */
      gallery.findById({ _id: req.params.recordID }, (err, recs) =>
      {
   
         /* If we encounter an error we log this to the console */
         if (err) 
         {
            console.dir(err);
         }
         else 
         {
            /* Assign the posted values to the respective fields for the retrieved
               document */
              recs.name 				= req.body.name 		|| recs.name;
            recs.description 		= req.body.description 	|| recs.description;
            recs.thumbnail  		= req.body.thumbnail	|| recs.thumbnail;
            recs.displayed 		= req.body.displayed 	|| recs.displayed;
    
            /* Save the updated document back to the database */
            recs.save((err, recs) => 
            {
               /* If we encounter an error send the details as a HTTP response */
               if (err) 
               {
                  res.status(500).send(err)
               }
   
               /* If all is good then send a JSON encoded map of the retrieved data
                  as a HTTP response */
               res.json({ records: recs });
            });
         }     
   
      });
});



/* Handle DELETE requests with expected recordID parameter */
apiRouter.delete('/gallery/:recordID', function(req, res) 
{
  /* Use the gallery model to access the Mongoose API method and
      find & remove a specific document within the MongoDB database 
      based on the document ID value supplied as a route parameter */
      gallery.findByIdAndRemove({ _id: req.params.recordID }, (err, recs) =>
      {
   
         /* If we encounter an error we log this to the console */
         if (err) 
         {
            console.dir(err);
         }
   
   
         /* If all is good then send a JSON encoded map of the removed data
            as a HTTP response */
         res.json({ records: recs });
   
      });
});

/** 
 * -------------------------
 * Write the routes above this line
 */
/* Mount the specified Middleware function based on matching path 
   ALL Http requests will be sent to /api followed by whatever the 
   requested endpoint is
*/   
app.use('/api', apiRouter);


/* Open a UNIX socket, listen for connections to the specified port */
app.listen(config.port);