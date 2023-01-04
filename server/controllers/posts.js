import Post from "../models/Post.js";
import User from "../models/User.js";

/* create */
// creates a new post
export const createPost = async (req, res) => {
  try {
    // only need user's id, the post description and local picture path from the front-end
    const { userId, description, picturePath } = req.body;
    // gets the user's information to fill the post's information
    const user = await User.findById(userId);
    // creates a new post in the database
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    // saves post
    await newPost.save();
    // gets all posts in the database
    const post = await Post.find();
    // sends 200 status and sends the new feed with the new post
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* read */
// gets all posts from the database to populate the feed
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* update */
export const likePost = async (req, res) => {
  try {
    // gets post id
    const { id } = req.params;
    // get user id
    const { userId } = req.body;
    // get post information
    const post = await Post.findById(id);
    // checking in likes if the user id exists
    const isLiked = post.likes.get(userId);
    // if the user id exists then the post is already liked by that user
    if (isLiked) {
      // deletes the user id from the likes - unlike the post
      post.likes.delete(userId);
      //   if the user id does NOT exist
    } else {
      // sets the user id to true in the map - like the post
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    // send a status of 200 and update the front-end with the updated post likes
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
