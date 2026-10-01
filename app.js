import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/get-joke", async (req, res) => {
    const name = req.body.name;
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
        const joke = response.data.joke;
        res.render("index.ejs", { joke: joke, name: name, error: "" });
    } catch (error) {
        res.render("index.ejs", {
            joke: "",
            name: name,
            error: "Sorry, we couldn't get a joke. Please try again."
        });
    }
});

app.get("/", (req, res) => {
    res.render("index.ejs", { joke: "", name: "", error: "" });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});