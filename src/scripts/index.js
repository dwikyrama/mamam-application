import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import App from './views/app.js'
import data from '../DATA.json'

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
})

// data.json
const elementRestaurant = document.querySelector('#myData')

data.restaurants.forEach(resto => {
  elementRestaurant.innerHTML += `
        <article class="post-item">
            <figure>
                <img src="${resto.pictureId}" alt="Suasana ${resto.name}" class="post-item__thumbnail">
            </figure>
            <div class="post-item__content">
                <h3 class="post-item__title"><a href="#">${resto.name}</a></h3>
                <h4>
                    <span class="post-item__city">${resto.city}</span>    
                    <span class="post-item__rating">&#9733; ${resto.rating}</span>
                </h4>
                <p class="post-item__description">${resto.description}</p>
            </div>
        </article>
    `
})
