import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
// import { GitHub } from '../github/github.js';

// const gh = new GitHub();
// gh.testRepo();

// const dosomething = async () => {
//     let startgazers = await gh.starGazer();
//     let mainContent = document.querySelector('.main-content');

//     mainContent.appendChild(startgazers);
// }
// gh.contributors();

// dosomething();
new Swup({
    plugins: [new SwupA11yPlugin()]
});

const toggleMenu = (event) => {
    event.stopImmediatePropagation();

    // Toggle is-active on the button (currentTarget), not the SVG (target)
    event.currentTarget.classList.toggle('is-active');

    let menuId = event.currentTarget.getAttribute('aria-controls');
    let hamMenu = document.getElementById(menuId) as Element;

    if (hamMenu) {
        // Read current state using getAttribute for cross-browser reliability
        let currentState = hamMenu.getAttribute('aria-expanded');
        let isExpanded = currentState !== 'true';

        // Use setAttribute for cross-browser compatibility
        hamMenu.setAttribute('aria-expanded', isExpanded.toString());
        event.currentTarget.setAttribute('aria-expanded', isExpanded.toString());

        // Block scroll when menu is expanded
        document.body.style.overflow = isExpanded ? 'hidden' : null;
    }
}

let hamMenu = document.getElementById('ham-menu') as Element;
hamMenu.addEventListener('click', toggleMenu);

const resetNav = () => {
    let menuEntries = document.getElementsByClassName('menu-item active');
    for (let entry of menuEntries) {
        entry.classList.remove('active');
        entry.ariaCurrent = null
    }

}

const changeNav = (event) => {
    // reset current navigation
    resetNav();
    // get naivation menu entry
    const menuItem = event.target.closest('.menu-item');
    // set element as active
    menuItem.classList.add('active');
    menuItem.ariaCurrent = "page";

    let ham = document.getElementById('ham') as Element;

    if (ham.getAttribute('aria-expanded') === 'true') {
        ham.setAttribute('aria-expanded', 'false');
        hamMenu.ariaExpanded = "false";
        hamMenu.classList.remove('is-active');
        console.debug(hamMenu);

    }


}

// query all menu entries of navigation
const menuEntries = document.querySelectorAll('.header-nav .menu-item');
menuEntries.forEach((entry) => {
    entry.addEventListener('click', changeNav,);
})