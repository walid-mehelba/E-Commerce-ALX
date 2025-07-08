
import { Box, Container, Typography } from "@mui/material"
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {

    const { getMyOrders, myOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const orders = myOrders ?? [];


    return (
        <Container sx={{ mt: 20, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            {orders.length > 0 ? (
                orders.map(({ _id, address, orderItems, total }) => (
                    <Box key={_id}>
                        <Typography>Id: {_id}</Typography>
                        <Typography>Address: {address}</Typography>
                        <Typography>Items: {orderItems ? orderItems.length : 0}</Typography>
                        <Typography>Total Amount = {total}</Typography>
                    </Box>
                ))
            ) : (
                <Typography>No orders found.</Typography>
            )}
        </Container>
    );
}

export default MyOrdersPage