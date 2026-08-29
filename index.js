const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");

const port=8080;
const {v4:uuid}=require("uuid");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use("/public",express.static(path.join(__dirname,"public")));

let posts=[
    {
        id: uuid(),
        username:"Aastha",
        content:"This is my first post"
    },
    {
        id: uuid(),
        username:"Aastha",
        content:"This is my second post"
    },
    {
        id: uuid(),
        username:"Aastha",
        content:"This is my third post"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts:posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    const {username,content}=req.body;
    const newPost={
        id: uuid(),
        username,
        content
    };
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((post)=>post.id===id);

    if(!post){
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs",{post});
});

app.put("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((post)=>post.id===id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    const {content}=req.body;
    post.content=content;
    res.redirect(`/posts/${id}`);
});
app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((post)=>post.id===id);    
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((post)=>post.id!==id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("Server is running on port:8080");
});