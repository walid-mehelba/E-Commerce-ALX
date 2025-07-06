import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/AuthContext";


const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCart = async () => {

            const response = await fetch("http://localhost:3001/cart", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Failed to fetch user cart, Please try again");
            }

            const cart = await response.json();

            const cartItemsMapped = cart.items.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    quantity,
                    unitPrice,
                })
            );
            setCartItems(cartItemsMapped);
            setTotalAmount(cart.totalAmount)
        };

        fetchCart();
    }, [token]);

    const addItemToCart = async (productId: string) => {
        try {

            console.log("Token in addItemToCart:", token);

            console.log("Calling backend to add item to cart with productId:", productId);


            const response = await fetch("http://localhost:3001/cart/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                }),
            });




            const data = await response.json();
            console.log("Response status:", response.status);
            console.log("Response data:", data);

            if (!response.ok) {
                // detailed error message from backend
                setError(data || "Failed to add to cart");
                console.error("Error adding to cart:", data);
                return;
            }

            const cart = await response.json();

            if (!cart) {
                setError("Failed to retrieve cart data");
            }

            const cartItemsMapped = cart.items.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ product, quantity }: { product: any; quantity: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    quantity,
                    unitPrice: product.unitPrice,
                })
            );

            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
            setError("")
        } catch (error) {
            console.error("Exception in addItemToCart:", error);
            setError("Something went wrong, please try again.");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
