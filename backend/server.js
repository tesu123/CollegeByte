import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

// Database Connection
const db = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login',
  port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL database");
});

const app = express();
app.use(cors());
app.use(express.json());

// User Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";

    await db.query(sql, [name, email, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === '23505') { // PostgreSQL unique violation error code
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Database error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
