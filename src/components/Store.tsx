import { ItemCard } from './ItemCard'
import type { GameItem } from './Cart'


type StoreProps ={
    filteredStore: GameItem[];
    addCart: (item: GameItem) => void;
}

export function Store({filteredStore, addCart}: StoreProps) {

    return (
        <div>
            <h1>Store</h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {filteredStore.map((item, index) => (
                <ItemCard 
                key={index} 
                name={item.name} 
                price={item.price} 
                icon={item.icon} 
                isInventory={item.isInventory} 
                type={item.type} 
                power={item.power} 
                quantity={item.quantity} 
                onBuy={() => addCart(item)} 
                onSell={() => {}}/>
                ))}
            </div>
        </div>
    )
} 