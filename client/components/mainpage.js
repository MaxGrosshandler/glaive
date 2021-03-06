import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  NavbarBrand
} from 'reactstrap'

const initialState = {
  toptext: '',
  bottomtext: '',
  isTopDragging: false,
  isBottomDragging: false,
  topY: '10%',
  topX: '50%',
  bottomX: '50%',
  bottomY: '90%',
  textStyle: {
    fontFamily: 'Helvetica',
    fontSize: '50px',
    fill: '#FFF',
    userSelect: 'none'
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,

      ...initialState
    }
  }

  openImage = index => {
    const image = this.props.photos[index]
    const base_image = new Image()
    base_image.src = image.src.base64
    const base64 = this.getBase64Image(base_image)
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }))
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }

  changeText = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  changeFont = event => {
    this.setState({
      textStyle: {
        fontFamily: event.currentTarget.value,
        fontSize: this.state.textStyle.fontSize,
        fill: this.state.textStyle.fill,

        userSelect: 'none'
      }
    })
  }
  changeSize = event => {
    this.setState({
      textStyle: {
        fontSize: event.currentTarget.value,
        fill: this.state.textStyle.fill,

        userSelect: 'none'
      }
    })
  }
  changeColor = event => {
    this.setState({
      textStyle: {
        fontSize: this.state.textStyle.fontSize,
        fill: event.currentTarget.value,

        userSelect: 'none'
      }
    })
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect()
    const xOffset = e.clientX - rect.left
    const yOffset = e.clientY - rect.top
    let stateObj = {}
    if (type === 'bottom') {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === 'top') {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type)
    document.addEventListener('mousemove', event =>
      this.handleMouseMove(event, type)
    )
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {}
      if (type === 'bottom' && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type)
      } else if (type === 'top' && this.state.isTopDragging) {
        stateObj = this.getStateObj(e, type)
      }
      this.setState({
        ...stateObj
      })
    }
  }

  handleMouseUp = event => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    })
  }

  convertSvgToImage = () => {
    const svg = this.svgRef
    let svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    const svgSize = svg.getBoundingClientRect()
    canvas.width = svgSize.width
    canvas.height = svgSize.height
    const img = document.createElement('img')
    img.setAttribute(
      'src',
      'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    )
    img.onload = function() {
      canvas.getContext('2d').drawImage(img, 0, 0)
      const canvasdata = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.download = 'meme.png'
      a.href = canvasdata
      document.body.appendChild(a)
      a.click()
    }
  }

  getBase64Image(img) {
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    var dataURL = canvas.toDataURL('image/png')
    return dataURL
  }

  render() {
    let photos = this.props.photos
    const image = photos[this.state.currentImage]
    const base_image = new Image()
    base_image.src = image.src.base64
    var wrh = base_image.width / base_image.height
    var newWidth = base_image.width
    var newHeight = newWidth / wrh

    return (
      <div>
        <Modal className="meme-gen-modal" isOpen={true}>
          <ModalHeader toggle={this.toggle}>
            Apply some text directly to the image and drag the text as you see
            fit before downloading the image.
          </ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => {
                this.svgRef = el
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                ref={el => {
                  this.imageRef = el
                }}
                xlinkHref={this.props.photos[0].src.base64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{
                  ...this.state.textStyle,
                  zIndex: this.state.isTopDragging ? 4 : 1
                }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                {this.state.toptext}
              </text>
              <text
                style={this.state.textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">
              <FormGroup>
                <Label for="fontChange">Change Font Family</Label>
                <select onChange={this.changeFont}>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Impact">Impact</option>
                  <option value="Bank Gothic">Bank Gothic</option>
                  <option value="Arial">Arial</option>

                  <option value="Serif Bold">Serif Bold</option>
                  <option value="Comic Sans MS">Comic Sans</option>
                  <option value="Monospace">Monospace</option>
                </select>
                <Label for="fontSize">Change Font Size</Label>
                <input
                  className="form-control"
                  type="number"
                  name="fontSize"
                  id="fontSize"
                  onChange={this.changeSize}
                />
                <Label for="fontChange">Change Font Color</Label>
                <select onChange={this.changeColor}>
                  <option value="white">White</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="black">Black</option>
                  <option value="yellow">Yellow</option>
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                </select>
                <Label for="toptext">Top Text</Label>
                <input
                  className="form-control"
                  type="text"
                  name="toptext"
                  id="toptext"
                  placeholder="Add text to the top"
                  onChange={this.changeText}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input
                  className="form-control"
                  type="text"
                  name="bottomtext"
                  id="bottomtext"
                  placeholder="Add text to the bottom"
                  onChange={this.changeText}
                />
              </FormGroup>
              <button
                onClick={() => this.convertSvgToImage()}
                className="btn btn-primary"
              >
                Download image
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage
