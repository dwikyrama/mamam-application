/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb'

describe('Searching restaurants', () => {
  let presenter
  let favoriteRestaurants

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
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants
    })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('film a')

      expect(presenter.latestQuery).toEqual('film a')
    })

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('film a')

      expect(favoriteRestaurants.searchRestaurants)
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

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3)
          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' }
      ])

      searchRestaurants('film a')
    })

    it('should show the name of restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name')
          expect(restaurantNames.item(0).textContent).toEqual('film abc')
          expect(restaurantNames.item(1).textContent).toEqual('ada juga film abcde')
          expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh film a')

          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' }
      ])

      searchRestaurants('film a')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurants('    ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurants('')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurants('\t')
      expect(presenter.latestQuery.length).toEqual(0)
    })

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ')

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled()

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalledTimes(1)
    })
  })

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length)
            .toEqual(1)
          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([])

      searchRestaurants('film a')
    })

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0)
        done()
      })

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([])

      searchRestaurants('film a')
    })
  })
})
