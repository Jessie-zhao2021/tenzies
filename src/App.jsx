import { useEffect, useState } from 'react'
import Die from './Die'
import './App.css'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  
  useEffect(() => {
     const firstValue = dice[0].value
     const allHeld = dice.every(die => die.isHeld)
     const allSameValue = dice.every( die=> die.value ===firstValue)
     if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You Won!")
     }
    
  },[dice])

  function generateNewDice(){
    return { 
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()}
  }

  function allNewDice(){
     const newArray = []
     for (let i=0; i<10; i++){
        newArray.push({
          value: Math.ceil(Math.random()*6),
          isHeld: false,
          id: nanoid()
        })
     }
      return newArray
  }
  
  function rollDice(){
      if (!tenzies){
      setDice(oldDice => oldDice.map(die =>{
       return die.isHeld ? 
              die:
              generateNewDice()
     }
     ))}else{
       setTenzies(false)
       setDice(allNewDice())
     }
  }

  function holdDice(id){
     setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
               {...die, isHeld : !die.isHeld} :
               die
      }
     ))
  }
  

  const diceElements = dice.map(die =>
     <Die key = {die.id} 
          value = {die.value} 
          isHeld = {die.isHeld}
          holdDice = {() => holdDice(die.id)}
    />)
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze 
      it at its current value between rolls.</p>
      <div className='die-container'>
          {diceElements}
      </div>
      <button className='roll-dice' 
              onClick={rollDice}>
                {tenzies ? "New Game" :"Roll Dice"}
      </button>
    </main>
  )
}

export default App
