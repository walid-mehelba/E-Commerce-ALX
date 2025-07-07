import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/")
    }
    return (
        <Container sx={{ mt: 20, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
            <Typography variant="h5">Your transaction has been completed successfully. </Typography>
            <Button onClick={handleHome}>Return to Home Page</Button>
        </Container>
    );
}

export default OrderSuccessPage