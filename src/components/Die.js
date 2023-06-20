import React from 'react'

 function Die (props) {
    const styles={
        backgroundColor: props.isHeld?"#59E391":"#FFFFFF"
    };
  return (
    <div  style= {styles} 
            className='die-elements'
            onClick={props.hold}>
        <h2 key={props.id}>{props.value}</h2>
    </div>
  )
}

export default Die