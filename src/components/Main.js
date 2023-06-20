import React from 'react'
import Die from './Die'
import Confetti from 'react-confetti'
function Main () {
  const [dice, setDice]=  React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    const allDice=dice.every(die=>die.isHeld)
    const value=dice[0].value;
    const allValue=dice.every(die=> die.value===value)

    if(allDice && allValue){
        console.log("Tenizies");
        setTenzies(true);
        //setDice(allNewDice());
    }

  },[dice])

// generating new set of dice on every roll
function allNewDice(){
    const diceArr=[];
    for(let i=0;i<10;i++){
        const randomDieValue=Math.ceil(Math.random()*6);
        const newDie={
            value: randomDieValue,
            isHeld:false,
            id: i+1
        };
        diceArr.push(newDie);
    }
    return diceArr;
}
//Creating Die components for the elements.
const diceElements=dice.map((die)=>{
    return <Die value={die.value}
                key={die.id}
                isHeld={die.isHeld}
                id={die.id}
                hold={()=>holdDice(die.id)}/>

})
//Function to hold dice and set values to true
function holdDice(id){
    setDice(prevDice => prevDice.map(die=>{
        return die.id===id? {...die, isHeld:!die.isHeld}: die
    }))

}

//to roll new dice which are not held
function rollNewDice(){
    setDice(prevDice=> prevDice.map(die=>{
        return die.isHeld? die:{
            ...die,
            value:Math.ceil(Math.random()*6)
        }
        
        }))
        //If tenzies, the game restarts..
        if(tenzies){
            setDice(allNewDice());
            setTenzies(false)
    }
}

  return (
   
    <div className='die-container'>
        { tenzies && <Confetti/>}
        {tenzies &&  <h1>Congratulations You Won!🎉</h1>}
        <div className='title'>
        <h1>Tenzies</h1>
        </div>
        <div className='description'>
            <h3>Roll untill all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </h3>
        </div>
        <div  className='dice'>
            {diceElements}

        </div>
        

        <button className='roll-btn' onClick={rollNewDice}>{tenzies?"NewGame":"ROLL"}</button>
        
    </div>
  )
}

export default Main