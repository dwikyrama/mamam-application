import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb'
import { createRestaurantItemTemplate } from '../templates/template-creator'

const Like = {
  async render () {
    return `
        <h2 class="restaurant__fav__title">Restoran Favoritmu</h2>
        <div id="restaurant" class="wrapper"></div>
    `
  },

  async afterRender () {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants()
    const restaurantContainer = document.querySelector('#restaurant')
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant)
    })
    if (restaurants.length === 0) {
      restaurantContainer.innerHTML += `
            <p>Kamu belum punya restoran favorit 😞 </p>
        `
    }
  }
}

export default Like
