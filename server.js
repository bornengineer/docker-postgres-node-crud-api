const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected successfully:", res.rows);
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM schools");
    res.status(200).send(data.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO schools (name, address) VALUES ($1 ,$2)", [
      name,
      location,
    ]);
    res.status(200).send({
      message: `row added with - ${name} & ${location}`,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    res.status(200).send({
      message: `Table created`,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
