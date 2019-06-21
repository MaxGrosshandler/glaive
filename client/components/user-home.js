import React, {Component} from 'react'

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
      cropped: false,
      addText: false,
      manipulated: false,
      imageSrc: 'non'
    }

    this.showState = this.showState.bind(this)
    this.changeImage = this.changeImage.bind(this)
    this.addText = this.addText.bind(this)
    this.resetState = this.resetState.bind(this)
    this.downloadImage = this.downloadImage.bind(this)
  }
  showState() {
    console.log(this.state.files[0].src)
  }
  changeImage() {
    this.setState({
      cropped: true,
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
  resetState() {
    console.log(this.state)

    this.setState({
      files: [],
      errors: [],
      uploaded: false,
      cropped: false,
      addText: false,
      manipulated: false,
      imageSrc: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        This is your Glaive Dashboard, where you can generate banners and
        widget-sized images!
        <br />
        {this.state.uploaded && (
          <div>
            {!this.state.manipulated && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.changeImage}
              >
                Click to generate images!
              </Button>
            )}

            <br />
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
              {this.state.cropped && (
                <div>
                  Widget-sized:
                  <br />
                  <ProcessImage
                    image={this.state.files[0].src.base64}
                    resize={{width: 320, height: 120}}
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
