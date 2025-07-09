
import { Box, Card, Typography } from "@mui/material"
import { Grid } from "@mui/material";
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
        <>
            <Box sx={{ backgroundColor: "#E0E1DD", minHeight: "100vh" }}>
                <Grid container spacing={2} >
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <Grid m={4} sx={{ xs: 12, sm: 6, md: 4 }} >
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                        height: "100%",
                                    }}
                                >
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Order ID: {order._id}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        Adress: {order.address}
                                    </Typography>
                                    <Typography variant="body2">Items: {order.orderItems?.length || 0}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Total: {order.total} EGP
                                    </Typography>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No orders found.</Typography>
                    )}

                </Grid>
            </Box>
        </>
    );
}

export default MyOrdersPage