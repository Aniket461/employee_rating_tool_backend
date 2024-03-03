const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/employeeModel');
const Team = require('./models/teamModel');
const Sprint = require('./models/sprintModel');
const SprintRating = require('./models/sprintRatingModel');



app.use(express.json());
app.use(cors());


const uri = process.env.MONGOURL;
const dbConnection = ()=>{
    try {
        mongoose.connect(uri).then(
            console.log("Database Connected")
        );
      } catch (e) {
        console.log("could not connect");
      }
}
dbConnection();


app.get('/',(req,res)=>{
    res.send({"message":"This is the employee rating backend"});
})

app.post('/onboard',(req,res)=>{

    const {firstname,lastname,email,username,password,team_id} = req.body;
    const employee = new Employee({
        firstname:firstname,
        lastname:lastname,
        email:email,
        username:username,
        password:password,
        team_id:team_id,
    });
    employee.save().then((emp)=>{
        res.send({message:"Employee successfully onboarded"});
    }).catch(err=>{
        res.send({error:err.message});
    })
});

app.post('/addteam',(req,res)=>{

    const {name} = req.body;
    const team = new Team({
        name:name
    });

    team.save().then((t)=>{
        res.send({"message":"Team Created Succesfully"})
    }).catch((err)=>{
        res.send({"error":err.message});
    })

});

app.post('/addsprint',(req,res)=>{

    const {start_date,end_date} = req.body;

    const sprint = new Sprint({
        start_date:start_date,
        end_date:end_date
    });

    sprint.save().then((t)=>{
        res.send({"message":"Sprint Created Succesfully"})
    }).catch((err)=>{
        res.send({"error":err.message});
    });

});

app.post('/sprintrating',async (req,res)=>{

    const {employee_id,sprint_id, rating} = req.body;

    const existingRating = await SprintRating.find({employee_id:employee_id, sprint_id:sprint_id});

    if(existingRating.length>0){

        let ratings = existingRating[0].ratings;
        ratings.push(rating);
        SprintRating.updateOne({_id: existingRating[0]._id}, {$set: {ratings: 
            ratings}}).then(()=>{
                res.send({"message":"Rating successful"});
            }).catch(err =>{
        res.status(400).send({"error":err.message})
            });


    }
    else{
        const sprintrating = new SprintRating({
            employee_id:employee_id,
            sprint_id:sprint_id,
            ratings:[rating]
        });
        
    sprintrating.save().then((t)=>{
        res.send({"message":"Rating Successful"})
    }).catch((err)=>{
        res.send({"error":err.message});
    });
    }
});



// All GET calls

app.get('/getemployees',async (req,res)=>{
    const employees = await Employee.find({});
    if(employees.length >0){
        res.send({"employees":employees});
    }
    else{
        res.send({"message":"No employee found"});
    }
})

app.get('/getteams',async (req,res)=>{
    const teams = await Team.find({});
    if(teams.length >0){
        res.send({"teams":teams});
    }
    else{
        res.send({"message":"No teams found"});
    }
})

app.get('/getsprints',async (req,res)=>{
    const sprints = await Sprint.find({});
    if(sprints.length >0){
        res.send({"sprints":sprints});
    }
    else{
        res.send({"message":"No sprints found"});
    }
})

app.get('/allsprintsrating/:id',async (req,res)=>{
    const id = req.params.id;
    const sprintratings= await SprintRating.aggregate([
        { "$addFields": { "userObjId": { "$toObjectId": "$sprint_id" } } }
    ,{
        $lookup:{
            from:"sprints",
            localField:"userObjId",
            foreignField:"_id",
            as:"sprint_details"
        }
    },{$match:{
        employee_id:id
    }}]);

    if(sprintratings.length>0){
let formattedData = [];
sprintratings.forEach(e=>{
    formattedData.push({_id:e._id,ratings:e.ratings,sprint_start_date:e.sprint_details[0].start_date,sprint_end_date:e.sprint_details[0].end_date});
})

res.send({"message":formattedData});
    }
    else{

        res.send({error:"no record found for given employee"});
    }
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Backend is running on ${port}`);
})