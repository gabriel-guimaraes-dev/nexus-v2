import './App.css'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Filters } from './components/Filters'
import { Cart } from './components/Cart'
import type { GameItem } from './components/Cart'
import { Toast } from './components/Toast'
import { Store } from './components/Store'  
import { Inventory } from './components/Inventory'
import { EquippedSilhouette } from './components/EquippedSilhouette'


export type EquippedItemsType = {
  head: GameItem | null;
  armor: GameItem | null;
  legs: GameItem | null;
  weapon: GameItem | null;
  shield: GameItem | null;
}

function App() {
  const [playerGold, setPlayerGold] = useState(5000)
  const [itemcards] = useState<GameItem[]>([
    { name: 'Poção de Vida', price: 100, icon: '❤️', isInventory: false, type: 'potion', power: 10, quantity:1 },
    { name: 'Espada', price: 250, icon: '🗡️', isInventory: false, type: 'weapon', power: 20, quantity: 1},
    { name: 'Veneno', price: 600, icon: '☠️', isInventory: false, type: 'poison', power: 50, quantity: 1 }
  ])
  const [cartItems, setCartItems] = useState<GameItem[]>([])
  const [inventoryItems, setInventoryItems] = useState<GameItem[]>([])
  const [notification, setNotification] = useState<string>('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const filteredStore = activeFilter === 'All' ? itemcards : itemcards.filter(item => item.type === activeFilter)
  const filteredInventory = activeFilter === 'All' ? inventoryItems : inventoryItems.filter(item => item.type === activeFilter)
  const [equippedItems, setEquippedItems] = useState<EquippedItemsType>({
    head: null,
    armor: null,
    legs: null,
    weapon: null,
    shield: null,
  })

  function handleSellItem(item: GameItem, indexClicked: number){
    if(item.quantity > 1){
      setInventoryItems(inventoryItems.map((inventoryItem, index) => {
        if(index === indexClicked) {
          return { ...inventoryItem, quantity: inventoryItem.quantity - 1 };
        }
        return inventoryItem;
      }));
      setPlayerGold(playerGold + (item.price * 0.6)) // Selling gives back 60% of the original price
      showNotification(`You sold ${item.name} for ${Math.round(item.price * 0.6)} gold! With success!`)
    } else {
      setPlayerGold(playerGold + (item.price * 0.6)) // Selling gives back 60% of the original price
      setInventoryItems(inventoryItems.filter((_, index) => index !== indexClicked))
      showNotification(`You sold ${item.name} for ${Math.round(item.price * 0.6)} gold! With success!`)
    }
  }

  function handleEquipItem(item: GameItem, indexClicked: number){
    const validTypes = ['head', 'armor', 'legs', 'weapon', 'shield'];
    
    if(!validTypes.includes(item.type)){
      return;
    }

    const oldItem = equippedItems[item.type as keyof typeof equippedItems];
    let newInventoryItems: GameItem[];

    if(item.quantity > 1){
      newInventoryItems = inventoryItems.map((inventoryItem, index) => {
        if(index === indexClicked){
          return { ...inventoryItem, quantity: inventoryItem.quantity - 1 };
        } 
          return inventoryItem
      });
    } else {
      newInventoryItems = inventoryItems.filter((_, index) => index !== indexClicked);
    }

    if(oldItem){
      newInventoryItems.push(oldItem);
    }

    setInventoryItems(newInventoryItems)
    setEquippedItems(prev => ({...prev, [item.type]: item}))
    showNotification(`${item.name} equipped!`, 'success')
  }


  function handleUnequipItem(slotName: keyof typeof equippedItems){
    const oldItem = equippedItems[slotName];
    
    if(oldItem) {
      const itemIndex = inventoryItems.findIndex(item => item.name === oldItem.name);

      if(itemIndex >= 0){
        const newInventoryItems = inventoryItems.map((item, index) => {
          if(index === itemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setInventoryItems(newInventoryItems);
      } else {
        setInventoryItems([...inventoryItems, oldItem]);
      }

      setEquippedItems(prev => ({...prev, [slotName]: null}))
      showNotification(`${oldItem.name} unequipped!`, 'success')
    }
  }

  function addCart(item: GameItem){
    const alreadyExistsInCart = (item: GameItem) => cartItems.some(cartItem => cartItem.name === item.name);
    if(alreadyExistsInCart(item)){
      const updatedCartItems = cartItems.map(cartItem => {
        if(cartItem.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
      showNotification(`Increased quantity of ${item.name} in cart!`, 'success')
    } else {
      setCartItems([ ...cartItems, item ]);
      showNotification(`${item.name} added to cart!`, 'success')
    }
    
  }

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification(message)
    setToastType(type)
    setTimeout(() => {
      setNotification('')
    }, 3000) // Clear notification after 3 seconds
  }


  return (
    <div>
      <div>
        <Navbar playerGold={playerGold} />

        <Toast message={notification} type={toastType} />

        <Filters onFilterChange={setActiveFilter} />

        <Store filteredStore={filteredStore} addCart={addCart} />

        <Inventory filteredInventory={filteredInventory} handleSellItem={handleSellItem} handleEquipItem={handleEquipItem} />

        <EquippedSilhouette equippedItems={equippedItems} handleUnequipItem={handleUnequipItem} />

      </div>
      <div>
        <Cart cartItems={cartItems} setCartItems={setCartItems} playerGold={playerGold} setPlayerGold={setPlayerGold} inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} showNotification={showNotification}/>
      </div>
    </div>
  )
}

export default App
