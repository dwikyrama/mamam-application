import CONFIG from '../../globals/config'

const createRestaurantDetailTemplate = (detail) => `
    <h2 class="restaurant__title">${detail.restaurant.name}</h2>
    <div class="restaurant__info">
        <h4>
            <span class="post-item__city">${detail.restaurant.city}</span>    
            <span class="post-item__rating">&#9733; ${detail.restaurant.rating}</span>
        </h4>
    </div>
    <img class="restaurant__poster" alt="${detail.restaurant.name}" 
        src="${CONFIG.BASE_IMAGE_URL + 'medium/' + detail.restaurant.pictureId}" />
    <div class="restaurant__description">
        <p>${detail.restaurant.description}</p>
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
