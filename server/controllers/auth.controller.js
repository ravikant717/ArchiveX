import {User} from "../models/user.model.js";
export async function signup(req, res) {
  try {
    const {email, password, username} = req.body; 

    if(!email || !password || !username) {
      return res.status(400).json({message: "All fields are required"}); //400: error code for bad request
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({message: "Invalid email format"});
    }
    if(password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }
    //const profile_pics = ["/", "", "/", "/"];
    //const image = profile_pics[Math.floor(Math.random() * profile_pics.length)];
    const newUser = new User({ email, password, username });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup controller: ", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export async function login(req, res) {
  res.send("Login successful");
}

export async function logout(req, res) {
  res.send("Logout successful");
}
