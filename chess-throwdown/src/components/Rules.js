import React from 'react'


/*
This component will create an element that, when clicked on, will
communicate the rules of the game.
*/
function Rules() {

  const handleClick = () => {
    alert((<div>hello!</div>))
  }

  return (
    <div onClick={handleClick}>Rules</div>
  )
}

export default Rules