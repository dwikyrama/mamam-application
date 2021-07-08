import UrlParser from '../../routes/url-parser'
import restaurantDbSource from '../../data/restaurantdb-source'
import { createRestaurantDetailTemplate } from '../templates/template-creator'
import LikeButtonInitiator from '../../utils/like-button-initiator'

const Detail = {
  async render () {
    return `
      <div id="restaurantDetail" class="restaurant__wrapper"></div>
      <div id="likeButtonContainer"></div>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurantId = await restaurantDbSource.detailRestaurant(url.id)
    const restaurant = restaurantId.restaurant
    const restaurantDetailContainer = document.querySelector('#restaurantDetail')
    restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant)

    const restaurantCategories = restaurant.categories
    const restaurantCategoryContainer = document.querySelector('#restaurantCategory')
    restaurantCategories.forEach((category) => {
      restaurantCategoryContainer.innerHTML += `
          <li>${category.name}</li>
        `
    })

    const restaurantMenuFoods = restaurant.menus.foods
    const restaurantMenuFoodsContainer = document.querySelector('#restaurantMenuFoods')
    restaurantMenuFoods.forEach((menu) => {
      restaurantMenuFoodsContainer.innerHTML += `
          <li>${menu.name}</li>
        `
    })

    const restaurantMenuDrinks = restaurant.menus.drinks
    const restaurantMenuDrinksContainer = document.querySelector('#restaurantMenuDrinks')
    restaurantMenuDrinks.forEach((menu) => {
      restaurantMenuDrinksContainer.innerHTML += `
          <li>${menu.name}</li>
        `
    })

    const restaurantReview = restaurant.customerReviews
    const restaurantReviewContainer = document.querySelector('#restaurantReview')
    restaurantReview.forEach((review) => {
      restaurantReviewContainer.innerHTML += `
          <div class="restaurant__review__container">
            <div class="restaurant__review__image"></div>
            <div class="restaurant__review__meta">
              <h5 class="restaurant__review__name">${review.name}</h5>
              <p class="restaurant__review__date">${review.date}</p>
            </div>
            <p class="restaurant__review__desc">${review.review}</p>
          </div>
        `
    })

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        rating: restaurant.rating,
        pictureId: restaurant.pictureId
      }
    })
  }
}

export default Detail
