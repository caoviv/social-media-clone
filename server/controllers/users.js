import User from "../models/User.js";

/* read */
// get user information by id
export const getUser = async (req, res) => {
  try {
    // gets id from req.params
    const { id } = req.params;
    // use id to get user's information
    const user = await User.findById(id);
    // send back to front-end 200 status & all user information
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get user friends via specified user id
export const getUserFriends = async (req, res) => {
  try {
    // gets id from req.params
    const { id } = req.params;
    // use id to get user's information
    const user = await User.findById(id);

    // multiple API calls to database
    const friends = await Promise.all(
      // gets each id under user's friends and gets all information from each friend id
      user.friends.map((id) => User.findById(id))
    );
    // modify scheme for front-end
    const formattedFriends = friends.map(
      // give map method params of data that front-end needs
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        // return an object with the listed params
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* update */
export const addRemoveFriend = async (req, res) => {
  try {
    // gets both id and friendId
    const { id, friendId } = req.params;
    // gets all current user's information
    const user = await User.findById(id);
    // gets friend's information
    const friend = await User.findById(friendId);

    // sees if friend's id is included in the user's friends list
    if (user.friends.includes(friendId)) {
      // if friend's id in included
      // return all elements in user's friends list array that is not the friend's id - i.e. remove friend's id
      user.friends = user.friends.filter((id) => id !== friendId);
      // return all elements in friend's friends list array that is not the current user's id - i.e. remove user's id
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // if friend's id in not included
      // add friend's id to user's friends list
      user.friends.push(friendId);
      // add user's id to friend's friends list
      friend.friends.push(id);
    }
    // save update friends list 
    await user.save();
    await friend.save();

    // modify scheme for front-end
    const formattedFriends = friends.map(
      // give map method params of data that front-end needs
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        // return an object with the listed params
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
