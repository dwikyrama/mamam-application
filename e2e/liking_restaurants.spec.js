/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('Showing empty liked restaurant', ({ I }) => {
  I.seeElement('#query')

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found')
})

Scenario('Liking a restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found')

  I.amOnPage('/')
  I.wait(5)

  I.seeElement('.post-item__name')
  const firstRestaurant = locate('.post-item__name').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
  I.click(firstRestaurant)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.post-item__name')
  const likedRestaurantName = await I.grabTextFrom('.post-item__name')

  assert.strictEqual(firstRestaurantName, likedRestaurantName)
})

Scenario('Searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found')

  I.amOnPage('/')
  I.wait(5)

  const titles = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.post-item__name').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    titles.push(await I.grabTextFrom('.restaurant__title'))
    I.amOnPage('/')
    I.wait(5)
  }

  I.amOnPage('/#/favorite')
  I.seeElement('#query')

  const searchQuery = titles[1].substring(1, 3)
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item__name')
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants)

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.post-item__name').at(index + 1))
    assert.strictEqual(title, visibleTitle)
  })
})
