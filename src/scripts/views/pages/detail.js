import UrlParser from '../../routes/url-parser'
import restaurantDbSource from '../../data/restaurantdb-source'
import { createRestaurantDetailTemplate, createReviewTemplate } from '../templates/template-creator'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb'

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

    const restaurantReview = await restaurant.customerReviews
    const restaurantReviewContainer = document.querySelector('#restaurantReview').firstElementChild
    restaurantReview.forEach((review) => {
      restaurantReviewContainer.insertAdjacentHTML(
        'afterend', createReviewTemplate(review)
      )
    })

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        rating: restaurant.rating,
        pictureId: restaurant.pictureId
      }
    })

    const reviewerName = document.querySelector('#name')
    const writtenReview = document.querySelector('#review')
    const submitButton = document.querySelector('#submitButton')
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault()

      if (window.navigator.onLine === false) {
        alert('Ulasan gagal ditambahkan. Koneksi internet tidak tersedia.')
      } else if (reviewerName.value === '' || writtenReview.value === '') {
        alert('Nama dan ulasan tidak boleh kosong.')
      } else {
        const review = {
          id: restaurant.id,
          name: reviewerName.value,
          review: writtenReview.value
        }
        const postReview = await restaurantDbSource.postReview(review)
        reviewerName.value = ''
        writtenReview.value = ''

        alert('Ulasan berhasil dikirim.')

        const latestReview = postReview.customerReviews[
          postReview.customerReviews.length - 1
        ]

        restaurantReviewContainer.insertAdjacentHTML(
          'afterend', createReviewTemplate(latestReview)
        )
      }
    })
  }
}

export default Detail
