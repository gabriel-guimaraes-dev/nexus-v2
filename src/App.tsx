import './App.css'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { ItemCard } from './components/ItemCard'
import { Filters } from './components/Filters'
import { Cart } from './components/Cart'
import type { GameItem } from './components/Cart'
import { Toast } from './components/Toast'


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
  

  function handleSellItem(item: GameItem, indexClicked: number){
    setPlayerGold(playerGold + (item.price * 0.6)) // Selling gives back 60% of the original price
    setInventoryItems(inventoryItems.filter((_, index) => index !== indexClicked))
    showNotification(`You sold ${item.name} for ${Math.round(item.price * 0.6)} gold! With success!`)
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

        <h1>Store</h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {filteredStore.map((item, index) => (
            <ItemCard key={index} name={item.name} price={item.price} icon={item.icon} isInventory={item.isInventory} type={item.type} power={item.power} quantity={item.quantity} onBuy={() => addCart(item)} onSell={() => handleSellItem(item, index)}/>
          ))}
        </div>

        <h1>Inventory</h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {filteredInventory.map((item, index) => (
            <ItemCard key={index} name={item.name} price={item.price} icon={item.icon} isInventory={item.isInventory} type={item.type} power={item.power} quantity={item.quantity} onBuy={() => addCart(item)} onSell={() => handleSellItem(item, index)}/>
          ))}
        </div>
      </div>
      <div>
        <Cart cartItems={cartItems} setCartItems={setCartItems} playerGold={playerGold} setPlayerGold={setPlayerGold} inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} showNotification={showNotification}/>
      </div>
    </div>
  )
}

export default App
