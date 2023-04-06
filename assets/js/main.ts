import Swup from './swup/Swup.modern.js';
import SwupA11yPlugin from '@swup/a11y-plugin';

const swup = new Swup({
    plugins: [new SwupA11yPlugin()]
});

const toggleMenu = (event) => {


    event.stopImmediatePropagation();
    console.debug(event.target.classList.toggle('is-active'), event.target.classList);
    console.debug(event.currentTarget.getAttribute('aria-controls'));

    let menuId = event.currentTarget.getAttribute('aria-controls');
    let hamMenu = document.getElementById(menuId) as Element;

    if (hamMenu) {

        let isExpanded = hamMenu.ariaExpanded === 'true' ? false : true;

        console.debug('isExpanded', isExpanded);

        document.body.style.overflow = isExpanded? null : 'hidden';
        hamMenu.ariaExpanded = (isExpanded).toString();

    }

}

let hamMenu = document.getElementById('ham-menu') as Element;
hamMenu.addEventListener('click', toggleMenu);

const resetNav = () => {
    let menuEntries = document.getElementsByClassName('menu-item active');
    for(let entry of menuEntries){
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

    if(ham.getAttribute('aria-expanded') === 'true'){
        ham.setAttribute('aria-expanded', 'false');
        hamMenu.ariaExpanded = "false";
        hamMenu.classList.remove('is-active');
        console.debug(hamMenu);

    }


}

// query all menu entries of navigation
const menuEntries = document.querySelectorAll('.header-nav .menu-item');
menuEntries.forEach((entry) => {
    entry.addEventListener('click', changeNav, );
})