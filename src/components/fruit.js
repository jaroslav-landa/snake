import React from 'react';

function Fruit(props) {
  const style = {
    left: `${props.block[0]}%`,
    top: `${props.block[1]}%`
  }

  return (
    <div className="fruit" style={style}></div>
  )
}

export default Fruit;