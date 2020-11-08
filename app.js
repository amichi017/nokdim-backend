const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan=require('morgan')
const user=require('./routes/user')
const helmet = require('helmet') // creates headers that protect from attacks (security)
//const cors = require('cors')  // allows/disallows cross-site communication
const routesUser=require('./routes/user')
const routesMessage=require('./routes/message')
const routesComplaint=require('./routes/complaint')
const routesPrayers=require('./routes/prayers')
const path = require('path');

const cors = require('cors')



mongoose.connect( process.env.MONGODB_URI || `mongodb+srv://amichi:sd4prLnYeQKUw7hr@isreal.68yhf.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

mongoose.connection.on('connected',()=>{
console.log("connection")
})

app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
    extended:false
}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','origin,  x-requested-with, Content-Type, Accept, Authentication ');
   // res.header('Access-Control-Allow-Methods',"PUT, POST, GET, PATCH, DELETE");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods',"PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    
     next();

})




app.use('/user',routesUser)
app.use('/message',routesMessage)
app.use('/complaint',routesComplaint)
app.use('/prayers',routesPrayers)


app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
})


app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })   
})


    // if (process.env.NODE_ENV === 'production') {
    //     app.use(express.static( 'frontend/build' ));
    
    //     app.get('*', (req, res) => {
    //         res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')); // relative path
    //     });
    // }



module.exports=app;










// app.use((req,res,next)=>{
//     req.on('data',(chank)=>{
//         console.log(chank.toString())
//       })
//       req.on('end',()=>{
//           next();
//       })
// })


// app.get('/', (req, res) => {
// res.status(200).json({
//     message:"helfvdfvdfdlo world"
// })
// });


// app.post('/zmanim',  (req, res)=> {
//   res.status(200).json({
//       message:req.body
//   })
// })


// if (process.env.NODE_ENV === 'production') {
  // Serve any static files

//   app.use('/static', express.static('./frontend/public'))
//   //app.use(express.static('./frontend/build/'));
//   // Handle React routing, return all requests to React app
 
//   app.get('./', function(req, res) {
//     console.log("ggggg")
//     res.sendFile(path.join(__dirname, './frontend/public', 'index.html'));
    
//   });
// // }

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '../frontend/build/index.html');
//   res.status(200).json({});
//   // app.use('../frontend/build/index.html', express.static(__dirname + '../frontend/build/index.html'));
// });
// --> Add this
// ** MIDDLEWARE ** //
// const whitelist = ['http://localhost:5000', 'http://localhost:8080', 'https://shrouded-journey-38552.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(helmet())
// --> Add this
// app.use(cors(corsOptions))


// --> Add this
//app.use('../frontend/build/index.html', express.static(__dirname + '../frontend/build/index.html'));
    // Serve any static files
    //app.use(express.static(path.join(__dirname, '../frontend/build')));
  // Handle React routing, return all requests to React app
    // app.get('*', function(req, res) {
    //   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    // });