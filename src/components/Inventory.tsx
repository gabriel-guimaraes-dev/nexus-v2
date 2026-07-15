import { ItemCard } from './ItemCard'
import type { GameItem } from './Cart'

type InventoryProps ={
    filteredInventory: GameItem[];
    handleSellItem: (item: GameItem, indexClicked: number) => void;
}

export function Inventory({filteredInventory, handleSellItem}: InventoryProps) {
    


    return (
        <div>
            <h1>Inventory</h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {filteredInventory.map((item, index) => (
                <ItemCard key={index} 
                name={item.name} 
                price={item.price} 
                icon={item.icon} 
                isInventory={item.isInventory} 
                type={item.type} 
                power={item.power}
                quantity={item.quantity} 
                onBuy={() => {}} 
                onSell={() => handleSellItem(item, index)}/>
                ))}
            </div>
        </div>
    )
}