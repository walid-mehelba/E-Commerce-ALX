import { Box, Container, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";



const CheckoutPage = () => {
    const { cartItems, totalAmount } = useCart();
    const adressRef = useRef<HTMLInputElement>(null);
    const { token } = useAuth();

    const navigate = useNavigate();

    const handleConfirmOrder = async () => {
        const address = adressRef.current?.value;

        if (!address) return;

        const response = await fetch("http://localhost:3001/cart/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                address
            }),
        });

        if (!response.ok) return;

        navigate("/order-success")
    }

    return (
        <Container sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h4">Checkout</Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={4} mt={4}>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <Box
                            key={item.productId}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            <Box display={"flex"} flexDirection="row" alignItems="center" gap={2} width="100%">
                                <img src={item.image} width={50} />
                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent={"space-between"} width="100%" >
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} x {item.unitPrice} EGP</Typography>
                                </Box>
                            </Box>

                        </Box>
                    ))
                )}
                <TextField inputRef={adressRef} label="Delivery Address" name="address" fullWidth />
                <Box display="flex" flexDirection="column" alignItems="end">
                    <Typography variant="h5">
                        Total Amount: {totalAmount} EGP
                    </Typography>
                    <Button variant="contained" sx={{ mt: 1, width: "300px" }} onClick={handleConfirmOrder} >Pay Now</Button>
                </Box>
            </Box>

        </Container>
    );
};

export default CheckoutPage;
