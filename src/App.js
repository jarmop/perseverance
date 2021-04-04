import { useEffect } from 'react'
import './App.css'
import image from './PIA23727_ultrawide_small.png'

const IMAGE_WIDTH = 93355
const IMAGE_HEIGHT = 2127
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT
const IMAGE_ELEMENT_HEIGHT = 500
const IMAGE_ELEMENT_WIDTH = IMAGE_ASPECT_RATIO * IMAGE_ELEMENT_HEIGHT
const CANVAS_SIZE = 200
const CANVAS_CENTER = {
  X: CANVAS_SIZE / 2,
  Y: CANVAS_SIZE / 2,
}
const CIRCLE_RADIUS = CANVAS_SIZE / 2

const draw = (ctx, background, viewAngleRight, viewAngleLeft) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.beginPath()
  ctx.drawImage(background, 0, 0)
  ctx.arc(CANVAS_CENTER.X, CANVAS_CENTER.Y, CIRCLE_RADIUS, 0, 2 * Math.PI)
  ctx.moveTo(CANVAS_CENTER.X, CANVAS_CENTER.Y)
  ctx.lineTo(
    CANVAS_CENTER.X + CIRCLE_RADIUS * Math.cos(viewAngleLeft),
    CANVAS_CENTER.Y + CIRCLE_RADIUS * Math.sin(viewAngleLeft)
  )
  ctx.moveTo(CANVAS_CENTER.X, CANVAS_CENTER.Y)
  ctx.lineTo(
    CANVAS_CENTER.X + CIRCLE_RADIUS * Math.cos(viewAngleRight),
    CANVAS_CENTER.Y + CIRCLE_RADIUS * Math.sin(viewAngleRight)
  )
  ctx.stroke()
}

const getPositionInRadians = (position) => {
  return (position / IMAGE_ELEMENT_WIDTH) * 2 * Math.PI + 0.75
}
const getLeftInRadians = () => getPositionInRadians(window.scrollX)
const getRightInRadians = () =>
  getPositionInRadians(window.scrollX + window.innerWidth)

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const background = new Image()
    background.src = 'jezero.png'
    background.onload = () => {
      draw(ctx, background, getLeftInRadians(), getRightInRadians())
    }
    document.addEventListener('scroll', () => {
      draw(ctx, background, getLeftInRadians(), getRightInRadians())
    })
  }, [])

  return (
    <div className="App">
      <img src={image} alt=""></img>
      <canvas id="canvas" width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
    </div>
  )
}

export default App
