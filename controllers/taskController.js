const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const task = mongoose.model('Task')

router.get('/',(req,res)=>{
    res.render('task/addEdit',{
        viewTitle : "Add New Task"
    })
})
router.post('/',(req,res)=>{
    if(req.body._id=='')
     addTask(req,res);
    else
     editTask(req,res);
})

//function to add task
function addTask(req,res){
    var Task = new task();
    Task.taskName = req.body.taskName;
    Task.taskDesc = req.body.taskDesc;
    Task.save((err,docs)=>{
        if(!err){
            res.redirect("task/list");
        }
        else{
            console.log("Error While Saving "+err)
        }
    })
}
//function to edit task

function editTask(req, res) {
    task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('task/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("task/addEdit", {
                    viewTitle: 'Update Task',
                    task: req.body
                });
            }
            else
                console.log('Error during Task Update : ' + err);
        }
    });
}

router.get('/edit/:id',(req,res)=>{
    task.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.render('task/addEdit',{
                viewTitle : "Update Task",
                task : docs
            })
        }
        else{
            console.log("Error in Editing "+err)
        }
    })
})

//Display
router.get('/list',(req,res)=>{
    task.find((err,docs)=>{
        if(!err){
            res.render('task/list',{
                list : docs.map(docs => docs.toJSON())
            })
        }
    })
})

//Delete
router.get('/delete/:id',(req,res)=>{
    task.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.redirect('/task/list');
        }
        else{
            console.log("Error in Deleting "+err)
        }
    })
})
module.exports = router ;
