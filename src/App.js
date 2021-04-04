import { useEffect } from 'react'
import './App.css'
import image from './PIA23727_ultrawide_small.png'

const IMAGE_WIDTH = 93355
const IMAGE_HEIGHT = 2127
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT
const IMAGE_ELEMENT_HEIGHT = 500
const IMAGE_ELEMENT_WIDTH = IMAGE_ASPECT_RATIO * IMAGE_ELEMENT_HEIGHT
const CANVAS_SIZE = 500
const CANVAS_CENTER = {
  X: CANVAS_SIZE / 2,
  Y: CANVAS_SIZE / 2,
}
// Make circle just large enough to go outside of canvas
const CIRCLE_RADIUS = Math.sqrt(2 * Math.pow(CANVAS_SIZE / 2, 2))

const draw = (ctx, background, viewAngleRight, viewAngleLeft) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.beginPath()
  ctx.drawImage(background, 0, 0)
  ctx.moveTo(CANVAS_CENTER.X, CANVAS_CENTER.Y)
  ctx.arc(
    CANVAS_CENTER.X,
    CANVAS_CENTER.Y,
    CIRCLE_RADIUS,
    viewAngleRight,
    viewAngleLeft
  )
  ctx.closePath()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.fill()
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
    background.src = 'jezero500.png'
    background.onload = () => {
      draw(ctx, background, getLeftInRadians(), getRightInRadians())
    }
    document.addEventListener('scroll', () => {
      draw(ctx, background, getLeftInRadians(), getRightInRadians())
    })
  }, [])

  return (
    <div className="App">
      <img src={image} alt="" height={IMAGE_ELEMENT_HEIGHT}></img>
      <canvas id="canvas" width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
    </div>
  )
}

export default App
