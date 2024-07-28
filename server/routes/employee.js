const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Employee = mongoose.model("Employee");
const requirelogin = require("../middleware/requirelogin");

router.get("/allemployeedetails",(req,res)=>{
  Employee.find().then((result)=>{
    if(!result){
      return res.json({error:"no employee found"})
      }
      res.json({result})
      })
      .catch((err)=>{
        console.log(err);
        res.json({error:"internal server error"})
        })

})

router.get('/getemployeedetails/:employee_id',(req,res)=>{
  const employee_id=req.params.employee_id;
  Employee.findOne({employee_id}).then((result)=>{
    if(!result){
      return res.json({error:"employee not found"})
      }
      res.json({result})
      })
      .catch((err)=>{
        console.log(err);
        res.json({error:"internal server error"})
        })
})


router.patch('/updateemployeedetails/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id;
  const { name, email, designation, mobile, gender, course, image } = req.body;

  if (!employee_id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  Employee.findOneAndUpdate({employee_id}, {
    $set: {
      employee_name: name,
      employee_email: email,
      employee_designation: designation,
      employee_mobile: mobile,
      employee_gender: gender,
      employee_course: course,
      employee_image: image
    }
  }, { new: true }) // { new: true } returns the updated document
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Employee not found!" });
      }
      res.json({ message: "Employee details updated successfully!"} );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong. Please try again later!" });
    });
});



router.post('/createemployee',(req,res)=>{
  const {name,email,designation,mobile,gender,course,image}=req.body;
  Employee.findOne({email}).then(data=>{
    if(data){
      return res.status(422).json({error:"This employee already exist with this email"})
  }
})
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

  // Generate a random integer between 1 and 100 (inclusive)
  const randomId = Math.floor(Math.random() * 100) + 1;
  const formattedRandomId = randomId.toString().padStart(2, '0');

  // generate a time 
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${hours}${minutes}${seconds}`;
  const uniqueId = `C${formattedTime}${formattedDate}${formattedRandomId}`;


  const newEmployee=new Employee({
    employee_name:name,
    employee_id:uniqueId,
    employee_email:email,
    employee_designation:designation,
    employee_phone:mobile,
    employee_gender:gender,
    employee_image:image,
    employee_courses:course.map(item=>({
      course_name:item
    }))
    })
    newEmployee.save().then(saved=>{
      if(!saved){
        return res.json({error:"something went wrong. Please try again later"})

      }
      res.status(200).json({message:"Employee created Succesfully"})
    }).catch(err=>console.log(err))
})


router.delete('/deleteemployee/:id',(req,res)=>{
  const id=req.params.id
  Employee.findOneAndDelete({employee_id:id}).then(data=>
    {
      if(!data){
        return res.json({error:"Employee not found"})
        }
      else{
        Employee.find().then(data=>{
          res.status(200).json({message:"Employee deleted Succesfully" ,"data":data})

        })
      }

        }).catch(err=>console.log(err))
      
  
      })
      router.get("/searchemployee/:name", (req, res) => {
        const name = req.params.name;
        
        // Using a regular expression for case-insensitive and partial match
        Employee.find({ employee_name: { $regex: name, $options: 'i' } })
          .then(data => {
            if (data.length === 0) {
              return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json({ message: "Employee(s) found successfully", data: data });
          })
          .catch(err => {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "An error occurred while fetching data" });
          });
      });
module.exports = router;
