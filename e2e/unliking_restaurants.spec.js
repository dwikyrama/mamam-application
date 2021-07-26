/* eslint-disable no-undef */
const assert = require('assert')

Feature('Unliking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('Unliking restaurants', async ({ I }) => {
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
  const likedRestaurant = locate('.post-item__name').first()
  const likedRestaurantName = await I.grabTextFrom(likedRestaurant)

  assert.strictEqual(firstRestaurantName, likedRestaurantName)

  I.click(likedRestaurant)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found')
})
