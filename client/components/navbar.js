import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Typography from '@material-ui/core/Typography'
const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Typography variant="h2" align="center" gutterBottom>
      {' '}
      Glaive{' '}
    </Typography>
    <nav>
      <div>{/* The navbar will show these links after you log in */}</div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
