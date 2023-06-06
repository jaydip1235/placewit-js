const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/Post");
const User = require("../models/User");


/*
    @usage : Create a new Post
    @url : /api/posts/
    @fields : text , image
    @method : POST
    @access : PRIVATE
 */
router.post(
  "/",

  authenticate,
  async (request, response) => {
    try {
      let user = await User.findById(request.user.id);
      if (
        request.body.image == "" ||
        request.body.image == "undefined" ||
        request.body.image == null
      ) {
        request.body.image = " ";
      }
      let newPost = {
        user: request.user.id,
        text: request.body.text,
        image: request.body.image,
        name: user.name,
        avatar: user.avatar,
      };
      // create a post
      let post = new Post(newPost);
      post = await User.populate(post, { path: "user.avatar" });
      post = await post.save();
      //post = await Post.find({user:request.user.id}).populate('user',["_id","avatar"])
      response.status(200).json({ post: post });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
    @usage : Get All Posts
    @url : /api/posts/
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */

router.get("/", authenticate, async (request, response) => {
  try {
    let posts = await Post.find().populate("user", ["_id", "avatar"]);
    if (!posts) {
      return response.status(400).json({ errors: [{ msg: "No Posts Found" }] });
    }
    response.status(200).json({ posts: posts });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
    @usage : Get A Post with PostId
    @url : /api/posts/:postId
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get("/:postId", authenticate, async (request, response) => {
  try {
    let postId = request.params.postId;
    let post = await Post.findById(postId).populate("user", ["_id", "avatar"]);
    if (!post) {
      return response.status(400).json({ errors: [{ msg: "No Post Found" }] });
    }
    response.status(200).json({ post: post });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
    @usage : Delete A Post with PostId
    @url : /api/posts/:postId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
router.delete("/:postId", authenticate, async (request, response) => {
  try {
    let postId = request.params.postId;
    // check if post is exists
    let post = await Post.findById(postId);
    if (!post) {
      return response.status(400).json({ errors: [{ msg: "No Post Found" }] });
    }
    post = await Post.findByIdAndRemove(postId);
    response.status(200).json({
      msg: "Post is Deleted",
      post: post,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
    @usage : Like/Unlike A Post with PostId
    @url : /api/posts/like/:postId
    @fields : no-fields
    @method : PUT
    @access : PRIVATE
 */
router.put("/like/:postId", authenticate, async (request, response) => {
  try {

    let postId = request.params.postId;
    var userId = request.user.id;

    let postt = await Post.findOne({ _id: postId });
    var isLiked = postt.likes.includes(userId);

    var option = isLiked ? "$pull" : "$addToSet";

    // Insert/delete post like
    let post = await Post.findOneAndUpdate(
      { _id: postId },
      { [option]: { likes: userId } },
      { new: true }
    ).populate("user", ["_id", "avatar"]);
    response.status(200).json({ post: post });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
    @usage : Create Comment to a post
    @url : /api/posts/comment/:postId
    @fields : text
    @method : POST
    @access : PRIVATE
 */
router.post(
  "/comment/:postId",
  authenticate,
  async (request, response) => {
    try {
      let postId = request.params.postId;
      let user = await User.findOne({ _id: request.user.id });

      let post = await Post.findById(postId);

      // check if post is exists
      if (!post) {
        return response
          .status(400)
          .json({ errors: [{ msg: "No Post Found" }] });
      }

      let newComment = {
        user: request.user.id,
        text: request.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      post = await post.save();
      let postt = await Post.findById(postId).populate("user", [
        "_id",
        "avatar",
      ]);

      response.status(200).json({ post: postt });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
    @usage : Delete Comment of a post
    @url : /api/posts/comment/:postId/:commentId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
router.delete(
  "/comment/:postId/:commentId",
  authenticate,
  async (request, response) => {
    try {
      let postId = request.params.postId;
      let commentId = request.params.commentId;

      let post = await Post.findById(postId).populate("user", [
        "_id",
        "avatar",
      ]);

      // pull the comments of a post
      let comment = post.comments.find((comment) => comment.id === commentId);

      // make sure the comment exists
      if (!comment) {
        return response.status(404).json({ msg: "Comment not exists" });
      }

      // check user, is he/she only made the comment
      if (comment.user.toString() !== request.user.id) {
        return response.status(401).json({ msg: "User is not authorized" });
      }

      let removeIndex = post.comments.findIndex((p) => p._id == commentId);
      // console.log(removeIndex);
      if (removeIndex !== -1) {
        post.comments.splice(removeIndex, 1);
        await post.save();
        response.status(200).json({ post: post });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
