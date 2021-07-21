/* eslint-disable no-undef */
const assert = require('assert')

Feature('Posting A Review')

Before(({ I }) => {
  I.amOnPage('/')
})

Scenario.only('Posting a review on a restaurant', async ({ I }) => {
  I.seeElement('.post-item__name')
  const firstRestaurant = locate('.post-item__name').at(4)
  I.click(firstRestaurant)

  const name = 'Jane Doe'
  const review = 'Recommended!'

  I.seeElement('#name')
  I.fillField('#name', name)

  I.seeElement('#review')
  I.fillField('#review', review)

  I.seeElement('#submitButton')
  I.click('#submitButton')

  I.acceptPopup()

  I.seeElement('.restaurant__review__name')
  const latestReviewer = locate('.restaurant__review__name').first()
  const latestReviewerName = await I.grabTextFrom(latestReviewer)

  assert.strictEqual(name, latestReviewerName)

  I.seeElement('.restaurant__review__desc')
  const latestReview = locate('.restaurant__review__desc').first()
  const latestReviewDesc = await I.grabTextFrom(latestReview)

  assert.strictEqual(review, latestReviewDesc)
})
