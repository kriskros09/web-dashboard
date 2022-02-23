import React from 'react'
import ReactDOM from 'react-dom'

import './assets/styles/styles.css'
import './i18n'
import { App } from './containers/App'
import * as serviceWorker from './serviceWorker'

const render = (Component: React.FC) => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
