import type { EquippedItemsType } from '../App';

export type EquippedSilhouetteProps = {
    equippedItems: EquippedItemsType;
    handleUnequipItem: (slotName: keyof EquippedItemsType) => void;
}

export function EquippedSilhouette({equippedItems, handleUnequipItem}: EquippedSilhouetteProps) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '150px', textAlign: 'center'}}>
            <div>
                <h2>Head</h2>
                {equippedItems.head ? (
                    <>
                        <p>Item Icon: {equippedItems.head.icon}</p>
                        <p>Item Name: {equippedItems.head.name}</p>
                        <p>Item Power: {equippedItems.head.power}</p>
                        <button onClick={() => handleUnequipItem('head')}>Unequip</button>
                    </>
                ) : (
                    <p className="bg-gray-500 text-white p-2 rounded-md">Slot is empty!</p>
                )}
            </div>
            <div>
                <h2>Torso</h2>
                {equippedItems.armor ? (
                    <>
                        <p>Item Icon: {equippedItems.armor.icon}</p>
                        <p>Item Name: {equippedItems.armor.name}</p>
                        <p>Item Power: {equippedItems.armor.power}</p>
                        <button onClick={() => handleUnequipItem('armor')}>Unequip</button>
                    </>
                ) : (
                    <p className="bg-gray-500 text-white p-2 rounded-md">Slot is empty!</p>
                )}
            </div>
            <div>
                <h2>Legs</h2>
                {equippedItems.legs ? (
                    <>
                        <p>Item Icon: {equippedItems.legs.icon}</p>
                        <p>Item Name: {equippedItems.legs.name}</p>
                        <p>Item Power: {equippedItems.legs.power}</p>
                        <button onClick={() => handleUnequipItem('legs')}>Unequip</button>
                    </>
                ) : (
                    <p className="bg-gray-500 text-white p-2 rounded-md">Slot is empty!</p>
                )}
            </div>
            <div>
                <h2>Weapon</h2>
                {equippedItems.weapon ? (
                    <>
                        <p>Item Icon: {equippedItems.weapon.icon}</p>
                        <p>Item Name: {equippedItems.weapon.name}</p>
                        <p>Item Power: {equippedItems.weapon.power}</p>
                        <button onClick={() => handleUnequipItem('weapon')}>Unequip</button>
                    </>
                ) : (
                    <p className="bg-gray-500 text-white p-2 rounded-md">Slot is empty!</p>
                )}
            </div>
            <div>
                <h2>Shield</h2>
                {equippedItems.shield ? (
                    <>
                        <p>Item Icon: {equippedItems.shield.icon}</p>
                        <p>Item Name: {equippedItems.shield.name}</p>
                        <p>Item Power: {equippedItems.shield.power}</p>
                        <button onClick={() => handleUnequipItem('shield')}>Unequip</button>
                    </>
                ) : (
                    <p className="bg-gray-500 text-white p-2 rounded-md">Slot is empty!</p>
                )}
            </div>
        </div>
    )
}
              