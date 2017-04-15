import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const PrivateHeader = (props) => {
  let navImg = props.navOpen ? '/images/x.svg' : '/images/bars.svg'

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={ navImg } onClick={ props.toggleNav } />
        <h1 className="header__title">{ props.title }</h1>
        <button 
          className="button button--link-text"
          onClick={ props.handleLogout }>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    toggleNav: () => Session.set('navOpen', !Session.get('navOpen')),
    navOpen: Session.get('navOpen')
  }
}, PrivateHeader)