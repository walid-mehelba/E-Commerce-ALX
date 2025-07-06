import { Box, Container, Typography } from "@mui/material";

import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
    const { cartItems, totalAmount, error } = useCart();

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">My Cart</Typography>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <Box key={item.productId}>{item.title}</Box>
                ))
            )}
        </Container>
    );  
};

export default CartPage;
