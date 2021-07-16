/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb'

describe('Searching restaurants', () => {
  let presenter

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
          <input id="query" type="text">
          <div class="restaurant-result-container">
              <ul class="restaurants">
              </ul>
          </div>
      </div>
      `
  }

  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants')
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurantIdb
    })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  it('should be able to capture the query typed by the user', () => {
    searchRestaurants('film a')

    expect(presenter.latestQuery).toEqual('film a')
  })

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurants('film a')

    expect(FavoriteRestaurantIdb.searchRestaurants)
      .toHaveBeenCalledWith('film a')
  })

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }])
    expect(document.querySelectorAll('.restaurant').length).toEqual(1)

    presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }])
    expect(document.querySelectorAll('.restaurant').length).toEqual(2)
  })

  it('should show the name of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }])
    expect(document.querySelectorAll('.restaurant__name').item(0).textContent).toEqual('Satu')

    presenter._showFoundRestaurants(
      [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]
    )

    const restaurantNames = document.querySelectorAll('.restaurant__name')
    expect(restaurantNames.item(0).textContent).toEqual('Satu')
    expect(restaurantNames.item(1).textContent).toEqual('Dua')
  })

  it('should show - for found restaurant without name', () => {
    presenter._showFoundRestaurants([{ id: 1 }])

    expect(document.querySelectorAll('.restaurant__name').item(0).textContent)
      .toEqual('-')
  })
})
