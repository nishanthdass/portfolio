import React from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import './SpringBoxDemo.css'

function Simple() {
  
  const [props, api] = useSpring(() => ({
    
    x: 0,
    y: 0,
    scale: 1
  }))
  const bind = useDrag(({ active, movement: [x, y] }) => {
    console.log(active, x, y)
    api.start({
      x: active ? x : 0,
      y: active ? y : 0,
      scale: active ? 1.2 : 1
    })
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return <animated.div className="simple" {...bind()} style={props} />
}

export default Simple;

