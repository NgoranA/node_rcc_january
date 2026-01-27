import express from "express";

const app = express();



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
  res.send("index.html", { title: "hello" });
});


// NOTE: the last middle should always be the error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// some third party middleware to pay keen attention to as you build backend services with node.js 
// Cors middleware to enable CORS which is important for cross origin requests
// Helmet middleware to set various HTTP headers for security
// Morgan middleware for logging HTTP requests
// Winston middleware for advanced logging capabilities
//

export default app;

