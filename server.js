require('./models/db.js')
const express = require('express')
const taskController = require('./controllers/taskController')
const path = require('path')
const exphbs = require('express-handlebars')
const { extname } = require('path')
const bodyparser = require('body-parser')
const { allowedNodeEnvironmentFlags } = require('process')

var app = express();
app.use(bodyparser.urlencoded({ extended : true }))
app.use(bodyparser.json())

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs', exphbs.engine({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname+'/views/layouts', 
        runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        }
    })
)
app.set('view engine','hbs')
app.listen(7007,()=>{
    console.log('Express Server Started')
})
app.use('/task',taskController);