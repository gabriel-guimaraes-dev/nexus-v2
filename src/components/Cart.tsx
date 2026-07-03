import { useState } from 'react';

export type GameItem ={
    name: string;
    price: number;
    icon: string;
    isInventory: boolean;
    type: string;
    power: number;
    quantity: number;
}

type CartProps ={
    cartItems: GameItem[];
    setCartItems: React.Dispatch<React.SetStateAction<GameItem[]>>;
    playerGold: number;
    setPlayerGold: React.Dispatch<React.SetStateAction<number>>;
    inventoryItems: GameItem[];
    setInventoryItems: React.Dispatch<React.SetStateAction<GameItem[]>>;
    showNotification: (message: string, type?: 'success' | 'error') => void;
}


export function Cart({ cartItems, setCartItems, playerGold, setPlayerGold, inventoryItems, setInventoryItems, showNotification }: CartProps) {

    const [discount, setDiscount] = useState<number>(1)

    function handleRemoveFromCart(indexToRemove: number) {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove))
    showNotification('Item removed from cart!')
  }

    return(
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
                    <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} - {item.price} gold <button onClick={() => handleRemoveFromCart(index)}>❌</button></li>
                    ))}
                    <label>Discount:</label>
                    <input style={{ textTransform: 'uppercase' }}type="text" placeholder="Enter discount code" onChange={(e) => {
                        const discountCode = e.target.value.toUpperCase();
                        if (discountCode === 'NEXUS10') {
                        setDiscount(0.9); //Apply a 10% discount
                        showNotification('Discount code applied! 10% off on all items in the cart.', 'success');
                        }else if(discountCode === 'NEXUS20') {
                        setDiscount(0.8); // Apply a 20% discount
                        showNotification('Discount code applied! 20% off on all items in the cart.', 'success');
                        }else if(discountCode === 'NEXUS50') {
                        setDiscount(0.5); // Apply a 50% discount
                        showNotification('Discount code applied! 50% off on all items in the cart.', 'success');
                        }else {
                        showNotification('Invalid discount code!', 'error');
                        setDiscount(1); // Reset discount if invalid code
                        }
                    }}></input>

                    <p>Total: {cartItems.reduce((total, item) => total + (item.price * discount), 0)} gold</p>
                    </ul>
                )}
                <button onClick={() => {
                    const totalCost = cartItems.reduce((total, item) => total + (item.price * discount), 0);
                    if (playerGold >= totalCost) {
                    setPlayerGold(playerGold - totalCost);
                    setInventoryItems([...inventoryItems, ...cartItems.map(item => ({ ...item, isInventory: true }))]);
                    setCartItems([]);
                    showNotification(`You bought ${cartItems.length} items for ${totalCost} gold! With success!`, 'success');
                    }else {
                    showNotification('Not enough gold to buy all items in the cart!', 'error');
                    }
                }}>Buy All Items in Cart</button>

                <button onClick={() => {
                    setCartItems([]);
                    showNotification('Cart cleared!', 'success');
                }}>Clear Cart</button>
        </div>
    )
}
