import React, {Component} from 'react'

import Image from 'react-image-resizer'

import Files from 'react-butterfiles'
import Button from '@material-ui/core/Button'
class UserHome extends Component {
  constructor(props) {
    super(props)

    // Set initial files, type 'local' means this is a file
    // that has already been uploaded to the server (see docs)
    this.state = {
      files: [],
      errors: [],
      uploaded: false,
      cropped: false
    }

    this.showState = this.showState.bind(this)
    this.changeImage = this.changeImage.bind(this)
  }
  showState() {
    console.log(this.state.files[0].src)
  }
  changeImage() {
    this.setState({
      cropped: true
    })
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        This is your Glaive Dashboard, where you can access your Glaive-related
        things
        <br />
        {this.state.uploaded && (
          <Button
            variant="contained"
            color="primary"
            onClick={this.changeImage}
          >
            Click to crop the image
          </Button>
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
              <Button variant="contained" color="primary" onClick={browseFiles}>
                Browse files...
              </Button>
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
        {this.state.uploaded && (
          <div>
            Preview:
            <br />
            <img src={this.state.files[0].src.base64} />
            <br />
            Done:
            {this.state.cropped && (
              <div>
                <Image
                  src={this.state.files[0].src.base64}
                  height={200}
                  width={200}
                />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
export default UserHome
