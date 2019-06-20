import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {FilePond, registerPlugin} from 'react-filepond'

// Import FilePond styles
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Register the plugins
registerPlugin(FilePondPluginImagePreview)

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: 'index.html',
          options: {
            type: 'local'
          }
        }
      ],
      email: props.email
    }
    this.showState = this.showState.bind(this)
  }
  showState() {
    console.log(this.state.files)
  }
  render() {
    let snake = window.location.host

    if (snake === 'localhost:8080') {
      snake = 'http://localhost:8080'
    } else {
      snake = 'https://' + window.location.host
    }
    console.log(snake)
    return (
      <div>
        <h3>Welcome, {this.state.email}</h3>
        This is your Glaive Dashboard, where you can access your Glaive-related
        things
        <br />
        <FilePond
          server={snake}
          allowMultiple={true}
          maxFiles={3}
          onupdatefiles={fileItems => {
            console.log(fileItems)
            this.setState({files: fileItems.map(fileItem => fileItem.file)})
          }}
        />
        <br />
        <button onClick={this.showState}>Click me to see state!</button>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
