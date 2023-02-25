const innerContainer = document.querySelector('.inner-container')
const outerContainer = document.querySelector('.outer-container')
const header = document.createElement('header')
const controlPanel = document.createElement('div')
const controlPanelRight = document.createElement('div')
const grid = document.createElement('div');
const cells = document.querySelectorAll('.cells')
const colorWheel = document.createElement('input')
const colorModeBtn = document.createElement('button')
const rainbowModeBtn = document.createElement('button')
const eraserBtn = document.createElement('button')
const resetBtn = document.createElement('button')


const defaultSize = 16
const defaultMode = 'color'
const defaultColor = '#000000'

let currentSize = defaultSize
let currentMode = defaultMode
let currentColor = defaultColor

function setCurrentColor(newColor) {
    colorWheel.style.background = newColor
    currentColor = newColor
}

header.innerHTML = `<h1>Etch-A-Sketch</h1>`
outerContainer.prepend(header)

controlPanel.classList.add('control-panel')
innerContainer.appendChild(controlPanel)

//Control Panel children

colorWheel.classList.add('colorWheel')
controlPanel.appendChild(colorWheel)
colorWheel.setAttribute('type', 'color')
colorWheel.setAttribute('value', '#000000')

colorModeBtn.classList.add('colorModeBtn')
colorModeBtn.classList.add('active')
controlPanel.appendChild(colorModeBtn)

rainbowModeBtn.classList.add('rainbowModeBtn')
controlPanel.appendChild(rainbowModeBtn)

eraserBtn.classList.add('eraserBtn')
controlPanel.appendChild(eraserBtn)

resetBtn.classList.add('resetBtn')
controlPanel.appendChild(resetBtn)

colorModeBtn.innerHTML = `Color Mode`
rainbowModeBtn.innerHTML = `Rainbow Mode`
eraserBtn.innerHTML = `Eraser`
resetBtn.innerHTML = `Reset`

colorWheel.addEventListener('change', e => {
    setCurrentColor(e.target.value)
})


const changeColor = (e,color) => e.target.style.backgroundColor = color

const buttons = document.querySelectorAll('button')

buttons.forEach((button) => {
    button.addEventListener('click', changeMode)
})


function changeMode(e){
    console.log(e);
    if(e.target.className === 'colorModeBtn'){
        currentMode = 'color'
        e.target.classList.add('active')
        rainbowModeBtn.classList.remove('active')
        eraserBtn.classList.remove('active')
    }else if(e.target.className ==='rainbowModeBtn'){
        currentMode = 'rainbow'
        e.target.classList.add('active')
        colorModeBtn.classList.remove('active')
        eraserBtn.classList.remove('active')
    }else if(e.target.className === 'eraserBtn'){
        currentMode = 'eraser'
        e.target.classList.add('active')
        colorModeBtn.classList.remove('active')
        rainbowModeBtn.classList.remove('active')
    }else if(e.target.className === 'resetBtn'){
        location.reload()
    }
}

function cellColor(e){
    //prevents drop and drag
    e.preventDefault()

    if(e.buttons === 1 && e.target.matches('.cell') && currentMode === 'color'){
        changeColor(e, currentColor)
        console.log(e);
    }else if(e.buttons === 1 && e.target.matches('.cell') && currentMode === 'eraser'){
        changeColor(e, '#ffffff')
    }else if(e.buttons === 1 && e.target.matches('.cell') && currentMode === 'rainbow'){
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        changeColor(e, `rgb(${r}, ${g}, ${b})`)
    }
}

grid.addEventListener('mouseover', cellColor)
// click to color the element
grid.addEventListener('mousedown',cellColor)

// Make Grid

grid.classList.add('grid')
innerContainer.appendChild(grid)
//initialize first grid with cells

// Calculate square size
let cellSize = function(){
    let cell = 594/(currentSize)
    return cell
}
// Make divs 
function addDivs(){

    for(let i = 1; i <= currentSize * currentSize; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.width = cellSize(currentSize)+'px';
        grid.appendChild(cell)
    }
}

function removeDivs(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
        cell.remove()
    })
}

//Range slider 

const gridSlider = document.createElement('input')
const gridSliderOutput = document.createElement('span')
controlPanel.append(gridSlider)
gridSlider.classList.add('slider')
controlPanel.append(gridSliderOutput)


gridSliderOutput.innerHTML = `${currentSize} * ${currentSize} GRID` 


const sliderAttributes = {
    type: 'range',
    min: '1',
    max: '64',
    value: '16',
    class: 'slider'
}

// set all attributes 
function setAttributes(element, attributes){
    Object.keys(attributes).forEach( att => {
        element.setAttribute(att, attributes[att])
    })
}
setAttributes(gridSlider, sliderAttributes)


gridSlider.oninput = () => {
   gridSliderOutput.innerHTML = `${gridSlider.value} * ${gridSlider.value} GRID` 
   currentSize = gridSlider.value
}

gridSlider.addEventListener('change', updateGrid)

function updateGrid(e){
    if(e.isTrusted){
        removeDivs()
        addDivs()
    }

}

// On page load/refresh initialise a grid.
window.onload = () => {
    addDivs()
}