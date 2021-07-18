import { createRestaurantItemTemplate } from '../../templates/template-creator'

class FavoriteRestaurantSearchView {
  getTemplate () {
    return `
      <h2 class="restaurant__fav__title">Restoran Favoritmu</h2>
      <div class="searchbox">
        <input id="query" type="text">
      </div>
      <div id="restaurants" class="restaurants">
      
      </div>
    `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate()
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'))
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">Restoran tidak ditemukan</div>'
  }
}

export default FavoriteRestaurantSearchView
