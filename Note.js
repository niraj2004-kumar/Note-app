const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

let posts = [];   // store all posts here

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



// home page – show all posts
app.get("/", (req, res) => {
    res.render("Home", { posts });
});

// form page
app.get("/newpost", (req, res) => {
    res.render("newpost");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id == id);
    res.render("post", { post });
});


// handle form submission
app.post("/newpost", (req, res) => {

    let { Title, data } = req.body;
    const id = posts.length + 1;
    const postRoute = `/posts/${id}`;
  posts.push({
    id: id,
    title: Title,
    content: data,
    postRoute: postRoute
});
    console.log(posts); 

    res.redirect("/");
});


app.post("/posts/:id/delete", (req, res) => {
    const { id } = req.params;

    const index = posts.findIndex(p => p.id == id);

    if (index !== -1) {
        posts.splice(index, 1); // delete post
    }

    res.redirect("/"); // stay on same page
});



// server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
