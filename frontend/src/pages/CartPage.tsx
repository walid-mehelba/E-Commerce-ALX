import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../context/Cart/CartContext";


const CartPage = () => {
    const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart();

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return;
        }
        updateItemInCart(productId, quantity)
    }

    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId)
    }



    return (
        <Container sx={{ mt: 2 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h4">My Cart</Typography>
                <Button onClick={() => clearCart()}>Clear Cart</Button>
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
                        >
                            <Box display={"flex"} flexDirection="row" alignItems="center" gap={2}>
                                <img src={item.image} width={150} />
                                <Box>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} x {item.unitPrice} EGP</Typography>
                                    <Button onClick={() => handleRemoveItem(item.productId)}>Remove Item</Button>
                                </Box>
                            </Box>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                                <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
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
