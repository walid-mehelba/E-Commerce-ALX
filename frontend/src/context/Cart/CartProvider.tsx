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

            if (!response.ok) {
                // detailed error message from backend
                setError("Failed to add to cart");
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
        } catch (error) {
            console.error("Exception in addItemToCart:", error);
        }
    };

    const updateItemInCart = async (productId: string, quantity: number) => {
        try {

            const response = await fetch("http://localhost:3001/cart/items", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity,
                }),
            });

            if (!response.ok) {
                // detailed error message from backend
                setError("Failed to update cart");
            }

            const cart = await response.json();

            if (!cart) {
                setError("Failed to retrieve cart data");
            }

            const cartItemsMapped = cart.items.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    quantity,
                    unitPrice
                })
            );

            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
        } catch (error) {
            console.error("Exception in updating quantity:", error);
        }
    }

    const removeItemInCart = async (productId: string) => {
        try {

            const response = await fetch(`http://localhost:3001/cart/items/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Failed to delete cart");
            }

            const cart = await response.json();

            if (!cart) {
                setError("Failed to retrieve cart data");
            }

            const cartItemsMapped = cart.items.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    quantity,
                    unitPrice
                })
            );

            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
        } catch (error) {
            console.error(error);
        }
    }

    const clearCart = async () => {
        try {

            const response = await fetch(`http://localhost:3001/cart/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Failed to empty cart");
            }

            const cart = await response.json();

            if (!cart) {
                setError("Failed to retrieve cart data");
            }



            setCartItems([]);
            setTotalAmount(0);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart, removeItemInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
