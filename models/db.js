const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/taskDB' , {useNewUrlParser : true} , (err) =>{
    if(!err)
    {
        console.log('MongoDB Successfully Connected')
    }
    else
    {
        console.log('Error in MongoDB : '+ err)
    }
}
)
require ('./task.model.js')