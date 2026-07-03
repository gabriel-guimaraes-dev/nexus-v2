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

export function ItemCard(props: ItemCardProps) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '150px', textAlign: 'center'}}>
            <p>Item Icon: {props.icon}</p>
            <p>Item Name: {props.name}</p>
            <p>Item Power: {props.power}</p>
            {props.isInventory ?
                <div>
                    <button>Equip</button> <button onClick={props.onSell}>Sell</button>
                </div>:<button onClick={props.onBuy}>Add to cart by: {props.price}</button>
            }
        </div>
    )
}