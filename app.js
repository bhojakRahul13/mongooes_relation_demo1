const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/relation-demo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Post - Title,Content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

let Post = mongoose.model("Post", postSchema);

let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema],
});

let User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: "raj@gmail.com",
//   name: "raj",
// });

// newUser.posts.push({
//   title: "Postive Vibes Only",
//   content: "Just came here ",
// });
// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

User.findOne({ name: "rahul" }, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "done with this stuff",
      content: "hi agian",
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});

// var newPost = Post({
//   title: "Reflections on Apples",
//   content: "They are delicious",
// });
// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(" app listening on port 3000"));
