/**
 * Navbar scripts
 */
var mobileMenuButton = document.querySelector('.navbar-mobile-button');
var mobileNavbar = document.querySelector('.mobile-navbar');
var mobileNavbarList = document.querySelectorAll('.mobile-navbar li');

mobileMenuButton.addEventListener('click', function() {
    if (mobileNavbar.classList.contains('hidden')) {
        mobileNavbar.classList.remove('hidden');
    } else {
        mobileNavbar.classList.add('hidden');
    }
});

for (var i = 0; i < mobileNavbarList.length; ++i) {
    mobileNavbarList[i].addEventListener('click', function() {
        mobileNavbar.classList.add('hidden');
    });
}
