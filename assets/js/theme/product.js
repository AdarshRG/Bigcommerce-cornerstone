/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';
import 'fslightbox';
import Splide from '@splidejs/splide';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory('#modal-review-form')[0];
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }  
          
        });


        //fslightbox package working..............................

        $('.productThumbVisible').on('click', function(){
            fsLightbox.open(parseInt($(this).attr('data-lightBox-index')));
        });
        new Splide('.splide', {
            lazyLoad: 'nearby',
            breakpoints: {
                960: {
                    fixedHeight: '380px',
                },
                9999999: {
                    fixedHeight: '610px',
                },
            }
        }
        ).mount();
        // const storefrontAPIToken = this.context.storefrontAPIToken;
        // this.populateMetafieldContent(storefrontAPIToken);

        

        // Add onclick for thumbnails 
        $('.productThumbVisible').on('click', function () {
            fsLightbox.open(parseInt($(this).attr('data-lightBox-index')));
        });

        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        const $reviewForm = classifyForm('.writeReview-form');

        if ($reviewForm.length === 0) return;

        const review = new Review({ $reviewForm });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
    }

    
    
    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;

            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }

  
}

document.getElementById('showMoreButton').addEventListener('click', function () {
    var tabsContents = document.getElementById('tabs-contents');
    tabsContents.classList.toggle('expanded');
    var buttonText = tabsContents.classList.contains('expanded') ? 'Show less' : 'Show more';
    this.innerText = buttonText;
});




$('#product-brandPolicyTrig').click(function(event){
    event.preventDefault()
       $('#brandPolicy-Modal-backdrop').css('display','block');
       $('body').addClass('prevent-scroll');

    });

$(document).on('click','#brandPolicy-Modal-backdrop',function(){
    if($('#brandPolicy-Modal-backdrop').css('display') == "block"){
        $('#brandPolicy-Modal-backdrop').css('display','none');
        $('body').removeClass('prevent-scroll');
    }else{
        $('#brandPolicy-Modal-backdrop').css('display','block'); 
        $('body').addClass('prevent-scroll');
    }
});


