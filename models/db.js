const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userx:userx@taskapp.hdfos.mongodb.net/taskapp?retryWrites=true&w=majority' , {useNewUrlParser : true} , (err) =>{
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