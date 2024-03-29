const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];
const sectionHeadings = document.querySelectorAll('.sectionHeading');

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    console.log("window.pageYOffset", window.pageYOffset);
    console.log("document.body.offsetHeight", document.body.offsetHeight);
    console.log("window.innerHeight", window.innerHeight);

}, false);



// on scroll animation for headings

let callback = (entries, observer) => {
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            console.log("entry.boundingClientRect", entry.boundingClientRect);
            // Add 'show-heading' class if observation target is inside viewport
            console.log("entry.intersectionRatio", entry.intersectionRatio);
            entry.target.classList.add('show-heading');
        } else {
            // Remove 'show-heading' class otherwise
            entry.target.style.opacity = 1;
        }
    })
}

const options = {
    // root: null,
    // rootMargin: '0px',
    // threshold: 1.0
};

let observer = new IntersectionObserver(callback, options);
sectionHeadings.forEach(el => observer.observe(el));







// nav animation function

function navAnimation(direction1, direction2) {

    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}


function toggleNav() {
    // toggle : menu bars open/closed
    menuBars.classList.toggle('change');
    //    menu active or not
    overlay.classList.toggle('overlay-active')
    if (overlay.classList.contains('overlay-active')) {
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

        // animate in nav items
        navAnimation('out', 'in');
    } else {

        // animate out nav items
        navAnimation('in', 'out');

        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    }
}

// event listeners

menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
})

