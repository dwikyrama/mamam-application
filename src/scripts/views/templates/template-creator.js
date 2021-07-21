import CONFIG from '../../globals/config'

const createRestaurantDetailTemplate = (restaurant) => `
    <figure class="restaurant__poster">
        <img class="lazyload restaurant__poster__image" alt="${restaurant.name}" 
            data-src="${CONFIG.BASE_IMAGE_URL + 'medium/' + restaurant.pictureId}" />    
    </figure>
    
    <div class="restaurant__info">
        <ul id="restaurantCategory" class="restaurant__category"></ul>
        <h2 class="restaurant__title">${restaurant.name}</h2>
        <h3>
            <span class="restaurant__city">${restaurant.city}</span>    
            <span class="restaurant__rating">&#9733; ${restaurant.rating}</span>
        </h3>
        <p class="restaurant__address">${restaurant.address}</p>
    </div>
    
    <div class="restaurant__details">
        <div class="restaurant__description">
            <h4 class="restaurant__subtitle">Deskripsi</h4>
            <p>${restaurant.description}</p>
        </div>
        <div class="restaurant__menu">
            <h4 class="restaurant__subtitle">Menu</h4>
                <h5 class="restaurant__menu">Makanan</h5>
                    <ul id="restaurantMenuFoods" class="restaurant__menu__list"></ul>
                <h5 class="restaurant__menu">Minuman</h5>
                    <ul id="restaurantMenuDrinks" class="restaurant__menu__list"></ul>
        </div>
        <div>
            <h4 class="restaurant__subtitle">Beri Ulasan</h4>
            <form>
                <input id="name" class="form__name" required type="text"
                    name ="name" aria-label="Input your name" placeholder="Nama"/>
                <textarea id="review" class="form__review" required name="review" rows="4"
                    aria-label="Write your review" placeholder="Tulis ulasan"></textarea>
                <button id="submitButton" class="form__submit"
                    type="submit" aria-label="Send review">Kirim</button>
            </form>   
        </div>
        <div id="restaurantReview" class="restaurant__review">
            <h4 class="restaurant__subtitle">Ulasan</h4>
        </div>
    </div>
`

const createRestaurantItemTemplate = (restaurant) => `
    <article class="post-item">
        <figure class="post-item__thumbnail">
            <img class="lazyload post-item__thumbnail__image" alt="${restaurant.name || '-'}"
                data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + 'small/' + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        </figure>
        <div class="post-item__content">
            <h3 class="post-item__title">
                <a class="post-item__name" href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a>
            </h3>
            <h4>
                <span class="post-item__city">${restaurant.city}</span>    
                <span class="post-item__rating">&#9733; ${restaurant.rating}</span>
            </h4>
            <p class="post-item__description">${restaurant.description}</p>
        </div>
    </article>
`

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`

const createReviewTemplate = (review) => `
    <div class="restaurant__review__container">
    <div class="restaurant__review__image"></div>
    <div class="restaurant__review__meta">
        <h5 class="restaurant__review__name">${review.name}</h5>
        <p class="restaurant__review__date">${review.date}</p>
    </div>
    <p class="restaurant__review__desc">${review.review}</p>
    </div>
`

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createReviewTemplate
}
