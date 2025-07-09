import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [error, setError] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const { login } = useAuth();

    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Validate form data
        if (!email || !password) {
            setError("Check submitted data");
            return;
        }

        // Make the call to API to create user
        const response = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            setError("Unable to login user, please try different credentials");
            return;
        }

        const token = await response.json();

        if (!token) {
            setError("Incorrect token");
            return;
        }

        login(email, token);
        navigate("/");
    };

    return (
        <Container>
            <Box
                maxWidth="xs"
                sx={{
                    mt: 10,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Login</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: "300px",
                        mt: 2,
                    }}
                >
                    <TextField fullWidth variant="outlined" label="Email" sx={{ mb: 2 }} inputRef={emailRef} name="email"></TextField>
                    <TextField
                        fullWidth variant="outlined" type="password" label="Password" sx={{ mb: 2 }}
                        inputRef={passwordRef}
                        name="password"
                    ></TextField>
                    <Button fullWidth variant="contained" onClick={onSubmit}>
                        Login
                    </Button>
                    {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
