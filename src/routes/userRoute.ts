import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

// Register Endpoint
router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const result = await register({ firstName, lastName, email, password });
  if (result) {
    response.status(result.statusCode).send(result.data);
  } else {
    response.status(500).send({ error: "Registration failed." });
  }
});

// Login Endpoint
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  response.status(statusCode).send(data);
});
export default router;
