import CONFIG from '../../globals/config'

const createRestaurantDetailTemplate = (detail) => `
    <figure class="restaurant__poster">
        <img class="restaurant__poster__image" alt="${detail.restaurant.name}" 
            src="${CONFIG.BASE_IMAGE_URL + 'medium/' + detail.restaurant.pictureId}" />    
    </figure>
    
    <div class="restaurant__info">
        <ul id="restaurantCategory" class="restaurant__category"></ul>
        <h2 class="restaurant__title">${detail.restaurant.name}</h2>
        <h3>
            <span class="restaurant__city">${detail.restaurant.city}</span>    
            <span class="restaurant__rating">&#9733; ${detail.restaurant.rating}</span>
        </h3>
        <p class="restaurant__address">${detail.restaurant.address}</p>
    </div>
    
    <div class="restaurant__details">
        <div class="restaurant__description">
            <h4 class="restaurant__subtitle">Deskripsi</h4>
            <p>${detail.restaurant.description}</p>
        </div>
        <div class="restaurant__menu">
            <h4 class="restaurant__subtitle">Menu</h4>
                <h5 class="restaurant__menu">Makanan</h5>
                    <ul id="restaurantMenuFoods" class="restaurant__menu__list"></ul>
                <h5 class="restaurant__menu">Minuman</h5>
                    <ul id="restaurantMenuDrinks" class="restaurant__menu__list"></ul>
        </div>
        <div id="restaurantReview" class="restaurant__review">
            <h4 class="restaurant__subtitle">Ulasan</h4>
        </div>
    </div>
    `

const createRestaurantItemTemplate = (restaurant) => `
    <article class="post-item">
        <figure class="post-item__thumbnail">
            <img class="post-item__thumbnail__image" alt="${restaurant.name}"
                src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + 'small/' + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
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
