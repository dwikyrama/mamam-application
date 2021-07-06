import restaurantDbSource from '../../data/restaurantdb-source'
import { createRestaurantItemTemplate } from '../templates/template-creator'

const Recommendation = {
  async render () {
    return `
      <div class="hero">
        <div class="hero__inner">
            <h2 class="hero__title">
                Jaga Persahabatan
            </h2>
            <p class="hero__tagline">
                "Mau makan apa?" Pertanyaan tersulit di dunia.
                Jaga relasi dengan cari referensi makanan di sini.
            </p>
        </div>
      </div>
      
      <div id="restaurant" class="wrapper"></div>
    `
  },

  async afterRender () {
    const restaurants = await restaurantDbSource.recommendedRestaurant()

    const restaurantContainer = document.querySelector('#restaurant')
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant)
    })
  }
}

export default Recommendation
