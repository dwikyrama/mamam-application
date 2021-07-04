import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json';

console.log('Hello Coders! :)');

// Hamburger Navigation
const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector("#drawer");
const mainElement = document.querySelector("main");

hamburgerButtonElement.addEventListener("click", event => {
    drawerElement.classList.toggle("open");
    event.stopPropagation();
});

mainElement.addEventListener("click", event => {
    drawerElement.classList.remove("open");
    event.stopPropagation();
})

// data.json
const elementRestaurant = document.querySelector('#myData')

data.restaurants.forEach(resto => {
    elementRestaurant.innerHTML += `
        <article class="post-item">
            <figure>
                <img src="${resto.pictureId}" alt="Suasana ${resto.name}" class="post-item__thumbnail">
            </figure>
            <div class="post-item__content">
                <h3 class="post-item__title"><a href="#">${resto.name}</a></h3>
                <h4>
                    <span class="post-item__city">${resto.city}</span>    
                    <span class="post-item__rating">&#9733; ${resto.rating}</span>
                </h4>
                <p class="post-item__description">${resto.description}</p>
            </div>
        </article>
    `
});