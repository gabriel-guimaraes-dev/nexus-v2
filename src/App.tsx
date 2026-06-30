import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { ItemCard } from './components/ItemCard'
import { Filters } from './components/Filters'

function App() {
  const [playerGold, setPlayerGold] = useState(5000)
  const [itemcards, setItemCards] = useState([
    { name: 'Poção de Vida', price: 100, icon: '❤️', isInventory: false, type: 'potion', power: 10, quantity:1 },
    { name: 'Espada', price: 250, icon: '🗡️', isInventory: false, type: 'weapon', power: 20, quantity: 1},
    { name: 'Veneno', price: 600, icon: '☠️', isInventory: false, type: 'poison', power: 50, quantity: 1 }
  ])
  const [inventoryItems, setInventoryItems] = useState<{ name: string, price: number, icon: string, isInventory: boolean, type: string, power: number, quantity: number}[]>([])
  const [notification, setNotification] = useState<string>('')
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const filteredStore = activeFilter === 'All' ? itemcards : itemcards.filter(item => item.type === activeFilter)
  const filteredInventory = activeFilter === 'All' ? inventoryItems : inventoryItems.filter(item => item.type === activeFilter)

  function handleBuyItem(item: { name:string, price: number, icon: string, isInventory: boolean, type: string, power: number, quantity: number}){
    if(playerGold >= item.price){
      setPlayerGold(playerGold - item.price)
      setInventoryItems([...inventoryItems, { name: item.name, price: item.price, icon: item.icon, isInventory: true, type: item.type, power: item.power, quantity: item.quantity }])
      showNotification(`You bought ${item.name} for ${item.price} gold! With success!`)
    } else {
      showNotification('Not enough gold to buy this item!')
    }
  }

  function handleSellItem(item: { name:string, price: number, icon: string, isInventory: boolean, type: string, power: number, quantity: number}, indexClicked: number){
    setPlayerGold(playerGold + (item.price * 0.6)) // Selling gives back 60% of the original price
    setInventoryItems(inventoryItems.filter((_, index) => index !== indexClicked))
    showNotification(`You sold ${item.name} for ${Math.round(item.price * 0.6)} gold! With success!`)
  }

  function showNotification(message: string) {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 3000) // Clear notification after 3 seconds
  }

  return (
    <div>
      <Navbar playerGold={playerGold} />

      {notification && <div className="notification" style={{ background: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>{notification}</div>}

      <h1>Nexus V2</h1>

      <Filters onFilterChange={setActiveFilter} />

      <button onClick={() => setItemCards([...itemcards, { name: 'Escudo', price: 300, icon:'🛡️', isInventory: false, type: 'shield', power: 45, quantity: 1 }])}>Adicionar Escudo</button>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {filteredStore.map((item, index) => (
          <ItemCard key={index} name={item.name} price={item.price} icon={item.icon} isInventory={item.isInventory} type={item.type} power={item.power} quantity={item.quantity} onBuy={() => handleBuyItem(item)} onSell={() => handleSellItem(item, index)}/>
        ))}
      </div>

      <h1>Inventory</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {filteredInventory.map((item, index) => (
          <ItemCard key={index} name={item.name} price={item.price} icon={item.icon} isInventory={item.isInventory} type={item.type} power={item.power} quantity={item.quantity} onBuy={() => handleBuyItem(item)} onSell={() => handleSellItem(item, index)}/>
        ))}
      </div>
    </div>
  )
}

export default App
