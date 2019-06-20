import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {FilePond, registerPlugin} from 'react-filepond'

// Import FilePond styles
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import ImageUploader from 'react-images-upload'
import Files from 'react-butterfiles'
// Register the plugins
// registerPlugin(FilePondPluginImagePreview)

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)

    // Set initial files, type 'local' means this is a file
    // that has already been uploaded to the server (see docs)
    this.state = {
      files: [],
      errors: [],
      uploaded: false
    }
    // this.onDrop = this.onDrop.bind(this)

    this.showState = this.showState.bind(this)
  }
  showState() {
    console.log(this.state.files[0].src)
  }
  // onDrop(picture) {
  //   this.setState({
  //     pictures: this.state.pictures.concat(picture)
  //   })
  // }
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
          accept={['application/pdf', 'image/jpg', 'image/jpeg']}
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
        <button onClick={this.showState} type="button">
          Click me!
        </button>
        {this.state.uploaded ? (
          <div>
            <img src={this.state.files[0].src.base64} />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}
export default UserHome
