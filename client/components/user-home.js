import React, {Component} from 'react'

import Image from 'react-image-resizer'

import Files from 'react-butterfiles'

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
        <Files
          multiple={false}
          convertToBase64
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          onSuccess={files => this.setState({files, uploaded: true})}
          onError={errors => this.setState({errors})}
        >
          {({browseFiles, getDropZoneProps, getLabelProps}) => (
            <>
              <label {...getLabelProps()}>Your files</label>
              <br />
              <div {...getDropZoneProps({className: 'myDropZone'})} />
              <button type="button" onClick={browseFiles}>
                Select files...
              </button>
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
        Preview:
        {this.state.uploaded ? (
          <div>
            <img src={this.state.files[0].src.base64} />
          </div>
        ) : (
          <div />
        )}
        Done:
        {this.state.cropped ? (
          <div>
            <Image
              src={this.state.files[0].src.base64}
              height={200}
              width={200}
            />
          </div>
        ) : (
          <div />
        )}
        <button onClick={this.changeImage} type="button">
          Click to crop the image
        </button>
        <button onClick={this.showState} type="button">
          Click to show the state
        </button>
      </div>
    )
  }
}
export default UserHome
