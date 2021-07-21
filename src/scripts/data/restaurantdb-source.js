import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

class restaurantDbSource {
  static async recommendedRestaurant () {
    const response = await fetch(API_ENDPOINT.RECOMMENDATION)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailRestaurant (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    return response.json()
  }

  static async postReview (review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY
      },
      body: JSON.stringify(review)
    }
    const response = await fetch(API_ENDPOINT.REVIEW, options)
    return response.json()
  }
}

export default restaurantDbSource
