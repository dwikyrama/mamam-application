import CONFIG from '../../globals/config'

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + 'medium/' + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
  <h3>Information</h3>
    <h4>City</h4>
    <p>${restaurant.city} minutes</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class="restaurant__description">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
`

const createRestaurantItemTemplate = (restaurant) => `
    <article class="post-item">
        <figure>
            <img class="post-item__thumbnail" alt="${restaurant.name}"
                src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + 'medium/' + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        </figure>
        <div class="post-item__content">
            <h3 class="post-item__title">
                <a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a>
            </h3>
            <h4>
                <span class="post-item__city">${restaurant.city}</span>    
                <span class="post-item__rating">&#9733; ${restaurant.rating}</span>
            </h4>
            <p class="post-item__description">${restaurant.description}</p>
        </div>
    </article>
  `

export { createRestaurantItemTemplate, createRestaurantDetailTemplate }
