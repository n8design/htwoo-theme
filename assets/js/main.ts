const toggleMenu = (event) => {


    event.stopImmediatePropagation();
    console.debug(event.target.classList.toggle('is-active'), event.target.classList);
    console.debug(event.currentTarget.getAttribute('aria-controls'));

    let menuId = event.currentTarget.getAttribute('aria-controls');
    let hamMenu = document.getElementById(menuId) as Element;

    if (hamMenu) {

        let isExpanded = hamMenu.ariaExpanded === 'true' ? true : false;

        console.debug('isExpanded', isExpanded);

        hamMenu.ariaExpanded = (!isExpanded).toString();

    }

}

let hamMenu = document.getElementById('ham-menu') as Element;
hamMenu.addEventListener('click', toggleMenu);