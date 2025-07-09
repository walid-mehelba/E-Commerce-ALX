import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";




const CartPage = () => {
    const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart, fetchCart } = useCart();

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return;
        }
        updateItemInCart(productId, quantity)
    }

    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId)
    }

    const handleCheckout = () => {
        navigate("/checkout")
    }


    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "white" }}>
            <Container >
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography variant="h4" mt={2}>My Cart</Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={4} m={4}>
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
                            >
                                <Box display={"flex"} flexDirection="row" alignItems="center" gap={2}>
                                    <img src={item.image} width={150} />
                                    <Box>

                                        <Typography variant="h5">{item.title}</Typography>
                                        <Typography>{item.quantity} x {item.unitPrice} EGP</Typography>
                                        <Button startIcon={<DeleteIcon />} onClick={() => handleRemoveItem(item.productId)} sx={{ paddingLeft: 0 }}>Remove Item</Button>

                                    </Box>
                                </Box>
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button sx={{
                                        backgroundColor: "#003F88",
                                        color: "#FFD500",
                                    }} onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                                    <Button sx={{
                                        backgroundColor: "#003F88",
                                        color: "#FFD500",
                                    }} onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                                </ButtonGroup>
                            </Box>
                        ))
                    )}
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" flexDirection="column" justifyContent="right" maxWidth={500}>
                            <Typography variant="h4">
                                Total Amount: {totalAmount} EGP
                            </Typography>
                            <Button variant="contained"
                                sx={{
                                    mb: 1,
                                    backgroundColor: "#003F88",
                                    color: "#FFD500",
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                        transform: "translateY(-2px)",
                                    },
                                }} onClick={handleCheckout}>Checkout</Button>
                        </Box>
                        <Button sx={{color: "#003F88"}} onClick={() => clearCart()} variant="outlined" startIcon={<DeleteIcon />}>Clear Cart</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CartPage;
