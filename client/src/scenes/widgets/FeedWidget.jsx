import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "state";
import PostWidget from "./PostWidget";

const FeedWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // On home page grab all posts
  const getPosts = async () => {
    const response = await fetch("https://connectcrowd.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // make data usable through response.json
    const data = await response.json();
    // setFeed Value with data received from db
    dispatch(setFeed({ posts: data.reverse() }));
  };
  // On profile page grab all posts by that user
  const getUserPosts = async () => {
    const response = await fetch(`https://connectcrowd.onrender.com/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // make data usable through response.json
    const data = await response.json();
    // setFeed Value with data received from db
    dispatch(setFeed({ posts: data.reverse() }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* creating component for each post */}
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default FeedWidget;
