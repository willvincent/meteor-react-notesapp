import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Router, Route, browserHistory } from 'react-router'

import Dashboard from '../ui/Dashboard'
import Login from '../ui/Login'
import NotFound from '../ui/NotFound'
import Signup from '../ui/Signup'

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id)
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth'
  const isAuthenticatedPage = currentPagePrivacy === 'auth'

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState)
}

export const globalOnEnter = (nextState) => {
  let lastRoute = nextState.routes[nextState.routes.length - 1];

  Session.set('currentPagePrivacy', lastRoute.privacy)
}

export const routes = (
  <Router history={ browserHistory }>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} >
      <Route path="/" component={ Login } privacy="unauth" />
      <Route path="/signup" component={ Signup } privacy="unauth" />
      <Route path="/dashboard" component={ Dashboard } privacy="auth" />
      <Route path="/dashboard/:id" component={ Dashboard } privacy="auth" onEnter={ onEnterNotePage }/>
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
)