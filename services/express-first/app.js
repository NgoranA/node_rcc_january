import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded bodies


app.get("/", (req, res) => {
  // res.send("Hello world from Express!");
  res.json({ message: "Hello world from Express!" });
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});
app.get("/contact", (req, res) => {
  res.send("This is the contact page.");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});


app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
})



