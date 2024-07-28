
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_id:{
    type: String,
    required: true

  },
  employee_name: {
    type: "string",
    required: true,
  },
  employee_email: {
    type: "string",
    required: true,
  },
  
  employee_phone: {
    type: "string",
    required: true,
    },
    employee_gender: {
      type: "string",
      required: true,
      },
      employee_courses: [{
        course_name:{
          type: "string",

        } 
      }]

,
employee_image: {
  type: "string",
  },
  employee_designation: {
    type: "string",
    },

 
},{timestamps:true});


mongoose.model("Employee", employeeSchema);
