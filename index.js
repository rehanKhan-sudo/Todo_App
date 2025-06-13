const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//database connection
const mongoose = require('mongoose');
const Task = require("./models/Task.js");

main()
.then(()=>{
  console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TODO')
};

//HOME PAGE
app.get("/TODO",async(req,res)=>{
  let tasks = await Task.find();
  res.render("todo.ejs",{tasks});
})

app.post("/TODO",(req,res)=>{
  let {title,category,description,priority} = req.body;
  let newTask = new Task({
    title:title,
    category:category,
    description:description,
    priority:priority
  });
  
  newTask.save().then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });
   res.redirect("/TODO");
})

app.delete("/TODO/:id",async(req,res)=>{
  let {id} = req.params;
  let deleteTask = await Task.findByIdAndDelete(id);
  console.log(deleteTask);
   res.redirect("/TODO");
  })
   app.get("/TODO/:id",async(req,res)=>{
    let {id} = req.params;
    let task = await Task.findById(id);
    res.render("update.ejs",{task});
   })
  app.put("/TODO/:id",async(req,res)=>{
      let {id}=req.params;
      let {title:newTitle} = req.body;
      let {category:newCategory} = req.body;
      let {description:newDescription} = req.body;
      let {priority:newPriority} = req.body;

      let updatedTask = await Task.findByIdAndUpdate(id,{title:newTitle,category:newCategory,description:newDescription,priority:newPriority});
      console.log(updatedTask);
      res.redirect("/TODO");
})

app.listen(port, () => {
  console.log(`listening to port : ${port}`);
});