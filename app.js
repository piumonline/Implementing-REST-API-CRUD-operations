const express = require('express');
const PORT= 3000;
const app = express();

app.use(express.json());

//convert id string to the int id using middleware
const convertParams = (req, res, next) => {
    const {id} = req.params;
    req.params.id = parseInt(id);
    next();
}

//db array
let blogs = [];

//get all
app.get('/blog',(req,res)=>{
    res.json(blogs);
})

//post
app.post('/blog',(req,res)=>{
    blogs.push({id:blogs.length+1, ...req.body});
    res.status(201).send({message:"ok"});
})

//update
app.put('/blog/:id', convertParams, (req,res)=>{
    const {id} = req.params;
    const index = blogs.findIndex((item)=>item.id == id);
    blogs[index] = req.body;
    res.send(blogs[index]);
    // res.send('OK');
})

//get specific id
app.get('/blog/:id', convertParams,(req,res)=>{
    const {id} = req.params;
    const index = blogs.findIndex((item)=>item.id == id);
    res.send(blogs[index]);
})

//delete specific
app.delete('/blog/:id', convertParams, (req,res)=>{
    const {id} = req.params;
    const index = blogs.findIndex((item)=>item.id == id);

    if(index === -1){
        return res.status(404).send({message:"not found"});
    }

    blogs.splice(index, 1);
    res.send({message:"Deleted"})
})

app.listen(PORT,()=>console.log(`app is listen from ${PORT}`));