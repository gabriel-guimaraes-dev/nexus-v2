type ItemCardProps = {
    name: string;
    price: number;
    icon: string;
    isInventory: boolean;
    onBuy: () => void;
    onSell: () => void;
    type: string;
    power: number;
    quantity: number;
}

export function ItemCard({name, price, icon, isInventory, power, quantity, onBuy, onSell}: ItemCardProps) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '150px', textAlign: 'center'}}>
            <p>Item Icon: {icon}</p>
            <p>Item Name: {name}</p>
            <p>Item Power: {power}</p>
            {isInventory &&
                <p>Item Quantity: {quantity}</p>} 
                        
            {isInventory ?
                <div>
                    <button>Equip</button> <button onClick={onSell}>Sell</button>
                </div>:<button onClick={onBuy}>Add to cart by: {price}</button>
            }
        </div>
    )
}