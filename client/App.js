import React from 'react'
import { render } from 'react-dom'
require('bootstrap')
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Base from './components/Layout/Base'
import Header from './components/Header'
import Insert from './components/Insert'
import Find from './components/Find'
import Update from './components/Update'
import Delete from './components/Delete'
render(
  (
    <Base>
      <Header />
      <Insert />
      <Find />
      <Update />
      <Delete />
    </Base>
  ), document.getElementById('app'))
