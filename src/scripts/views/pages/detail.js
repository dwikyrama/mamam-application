import UrlParser from '../../routes/url-parser'
import restaurantDbSource from '../../data/restaurantdb-source'
import { createRestaurantDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
      <div id="restaurantDetail" class="restaurant__wrapper"></div>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    console.log(url)
    const restaurantId = await restaurantDbSource.detailRestaurant(url.id)
    console.log(restaurantId)

    const restaurantDetailContainer = document.querySelector('#restaurantDetail')
    restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurantId)
  }
}

export default Detail
