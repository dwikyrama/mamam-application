import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import App from './views/app.js'
import swRegister from './utils/sw-register'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  const loader = document.querySelector('#loader')
  const page = document.querySelector('#page')

  setTimeout(function () {
    loader.style.opacity = 0
    page.style.display = 'block'
    setTimeout(function () {
      loader.remove()
    }, 500)
  }, 2000)

  app.renderPage()
  swRegister()
})
