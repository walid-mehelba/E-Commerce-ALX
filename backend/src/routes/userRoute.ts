import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

// Register Endpoint
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await register({ firstName, lastName, email, password });
    if (result) {
      res.status(result.statusCode).send(result.data);
    } else {
      res.status(500).send({ error: "Registration failed." });
    }
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("Something went wrong");
  }
});
export default router;
