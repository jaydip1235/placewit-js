const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// create a post
router.post("/",async(req,res)=>{
    try{  
    let {name,text,image}=req.body;
    let post = new Post({name,text,image});
    await post.save();
    res.status(200).json({msg:"Post created successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})

// Update a post
router.put("/:postId",async(req,res)=>{
    try {
        let {name,text,image}=req.body;
        let postObj={};
        postObj.name=name;
        postObj.image=image;
        postObj.text=text;

        await Post.findOneAndUpdate(
          { _id: req.params.postId },
          { $set: postObj },
          { new: true }
        );
        res.status(200).json({ msg: "Post updation is success" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
})
 // Get all post
router.get("/",async(req, res) => {
    try {
        let posts = await Post.find(); // SELECT * FROM POST
        res.status(200).json({posts:posts});
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
})

// get a particular post
router.get("/:postId",async(req, res) => {
    try {
        let post = await Post.findById(req.params.postId);
        res.status(200).json({ post: post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
})
// delete a post
router.delete("/:postId",async(req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.postId);
        res.status(200).json({ msg: "Post is deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
});


module.exports = router;