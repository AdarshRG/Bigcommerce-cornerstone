import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        const storefrontAPIToken = this.context.storefrontAPIToken;
        const context = this.context;
        cartPreview(secureBaseUrl, cartId);
        const userLogged = this.context.userLogged;
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();


 // Handle add/remove to wishlist from card
        const $productCardSet = $('.product-card-wishlist');
        $productCardSet.each(function () {
            $(this).on("click", function () {
                if ($(this).hasClass("is-in-wishlist")) {
                    removeFromWishlist(userLogged, storefrontAPIToken, $(this));
                } else {
                    addToWishlist(userLogged, storefrontAPIToken, $(this));
                }
            })
        });

    }
    
}



// $(document).ready(function(){
//     $(".navPages-item").click(function(event){
//         var subMenuList = $(this).find(".navPage-subMenu-list");
//         subMenuList.slideToggle("slow");
//     });
// })

// $(document).ready(function(){
//     $(".navPages-item").click(function(event){
//         var subMenuList = $(this).find(".navPage-subMenu-list");
        
//         if (subMenuList.is(":visible")) {
//             subMenuList.slideUp("slow");
//         } else {
//             subMenuList.slideDown("slow");
//         }
        
//         event.stopPropagation(); 
//     });
// });






$(document).ready(function () {
    function updateShowMoreButton() {
        var windowWidth = $(window).width();
        var footerInfoList = $('.footer-info-list');

        if (windowWidth < 900) {
            var isExpanded = footerInfoList.hasClass('expanded');
            footerInfoList.toggleClass('expanded', !isExpanded);

            var buttonText = footerInfoList.hasClass('expanded') ? 'Show less' : 'Show more';
            $('.show-more').text(buttonText);

        } else {
            footerInfoList.addClass('expanded');
            $('.show-more').text('Show less');
           
        }
    }

    // updateShowMoreButton();


    $('.show-more').on('click', () => updateShowMoreButton());
});



let navPage_L1_Link = $(".navPages-list > .navPages-item > .navPages-action.has-subMenu");
let navPage_L2_Link = $(".navPage-subMenu-list >.has-submenu >.navPage-subMenu-action");

function L1_Menu_InDesktop() {
    //remove all active classes
    $('.navPages-list > .navPages-item').removeClass("active");
    $('.navPage-subMenu-item').removeClass("active");
    $('.navPage-childList').removeClass("active");
    //remove height in resize
    $('.navPage-subMenu').css("height", "0");
    //make first item and first child active by default
    $('.navPage-subMenu-item0,.navPage-childList0').addClass("active");
}
function L1_Menu_InMobile() {

    $('.navPages-list > .navPages-item').removeClass("active");
    $('.navPage-subMenu-item').removeClass("active");
    $('.navPage-childList').removeClass("active").css("height", "inherit");
    $('.navPage-subMenu-item0,.navPage-childList0').removeClass("active");
}


/**First Child Menu Click */
navPage_L1_Link.on('click', function (e) {
    e.preventDefault();

    if ($(window).width() < 960) {
        L1_Menu_InMobile();
    }
    else {
        L1_Menu_InDesktop();
    }

    if ($(this).next(".navPage-subMenu").hasClass("active")) {
        $(this).next(".navPage-subMenu").removeClass("active");
        if ($(window).width() < 960) {
            $(this).next(".navPage-subMenu").css("height", "0");
        }
    }
    else {
        $(".navPage-subMenu").removeClass("active");
        $(this).parent().addClass("active");
        $(this).next(".navPage-subMenu").addClass("active");
        if ($(window).width() < 960) {
            $(".navPage-subMenu").css("height", "0")
            let menuHeight = $(this).next(".navPage-subMenu").find('.navPage-subMenu-list').prop('scrollHeight');
            console.log(this.scrollHeight);
            console.log(menuHeight);
            $(this).next(".navPage-subMenu").css("height", "auto")
        }
    }
});










