import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../context/Cart/CartContext";
import { PriceCheckOutlined } from "@mui/icons-material";

const CartPage = () => {
    const { cartItems, totalAmount, error } = useCart();

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">My Cart</Typography>
            <Box display="flex" flexDirection="column" gap={4} mt={4}>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                                    <Button>Remove Item</Button>
                                </Box>
                            </Box>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button>-</Button>
                                <Button>+</Button>
                            </ButtonGroup>
                        </Box>
                    ))
                )}
                <Box>
                    <Typography variant="h5">
                        Total Amount: {totalAmount} EGP
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default CartPage;
