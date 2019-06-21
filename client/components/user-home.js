import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import ProcessImage from 'react-imgpro'
import MainPage from './mainpage'
import Files from 'react-butterfiles'

import Button from '@material-ui/core/Button'
import {save} from 'save-file'
class UserHome extends Component {
  constructor(props) {
    super(props)

    // Set initial files, type 'local' means this is a file
    // that has already been uploaded to the server (see docs)
    this.state = {
      files: [],
      errors: [],
      uploaded: false,
      resized: false,
      addText: false,
      manipulated: false,
      imageSrc: 'non',
      height: 100,
      width: 100
    }

    this.showState = this.showState.bind(this)
    this.changeImage = this.changeImage.bind(this)
    this.addText = this.addText.bind(this)
    this.resetState = this.resetState.bind(this)
    this.downloadImage = this.downloadImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  showState() {
    console.log(this.state.files[0].src)
  }

  changeImage() {
    this.setState({
      resized: true,
      manipulated: true
    })
  }
  addText() {
    this.setState({
      addText: true,
      manipulated: true
    })
  }
  async downloadImage() {
    await save(this.state.imageSrc, 'newPhoto.jpeg')
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: Number(evt.target.value)})
  }

  resetState() {
    this.setState({
      files: [],
      errors: [],
      uploaded: false,
      resized: false,
      addText: false,
      manipulated: false,
      width: 120,
      height: 120,
      imageSrc: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        This is your Glaive Dashboard, where you can resize images and add text
        to them!
        <br />
        {this.state.uploaded && (
          <div>
            {!this.state.manipulated && (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    {/* <input
                      type="number"
                      name="width"
                      value={this.state.width}
                      onChange={this.handleChange}
                    /> */}
                    <TextField
                      name="width"
                      label="Height (in pixels):"
                      value={this.state.width}
                      onChange={this.handleChange}
                      type="number"
                    />
                  </label>
                  <label>
                    <TextField
                      name="height"
                      label="Height (in pixels):"
                      value={this.state.height}
                      onChange={this.handleChange}
                      type="number"
                    />
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={this.changeImage}
                  >
                    Click to generate images!
                  </Button>
                </form>
              </div>
            )}

            {!this.state.manipulated && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.addText}
              >
                Add text to this image!
              </Button>
            )}

            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={this.resetState}
            >
              Choose a new file
            </Button>

            {this.state.addText && <MainPage photos={this.state.files} />}
          </div>
        )}
        <Files
          multiple={false}
          convertToBase64
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          onSuccess={files => this.setState({files, uploaded: true})}
          onError={errors => this.setState({errors})}
        >
          {({browseFiles, getDropZoneProps}) => (
            <>
              <br />
              <div {...getDropZoneProps({className: 'myDropZone'})} />
              {!this.state.uploaded && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={browseFiles}
                >
                  Browse files...
                </Button>
              )}

              <ol>
                {this.state.files.map(file => (
                  <li key={file.name}>{file.name}</li>
                ))}
                {this.state.errors.map(error => (
                  <li key={error.file.name}>
                    {error.file.name} - {error.type}
                  </li>
                ))}
              </ol>
            </>
          )}
        </Files>
        {this.state.uploaded &&
          !this.state.addText && (
            <div>
              {!this.state.manipulated ? (
                <div>
                  Preview:
                  <br />
                  <img src={this.state.files[0].src.base64} />
                  <br />
                </div>
              ) : (
                <div> </div>
              )}
              {this.state.resized && (
                <div>
                  Your new image:
                  <br />
                  <ProcessImage
                    image={this.state.files[0].src.base64}
                    resize={{
                      width: this.state.width,
                      height: this.state.height
                    }}
                    processedImage={(imageSrc, err) =>
                      this.setState({imageSrc})
                    }
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.downloadImage}
                  >
                    Download image
                  </Button>
                </div>
              )}
            </div>
          )}
      </div>
    )
  }
}
export default UserHome
