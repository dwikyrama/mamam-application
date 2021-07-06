import API_ENDPOINT from '../globals/api-endpoint'

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
}

export default restaurantDbSource
