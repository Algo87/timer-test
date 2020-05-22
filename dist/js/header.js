function activateDropdownBlock() {

    $('.b-dropdown-wrapper').click(function () {

        let curDropEl=$(this).find('.b-dropdown-user');

        if(curDropEl.hasClass('drop-active')){
            curDropEl.removeClass('drop-active');
            curDropEl.slideUp();

        }else{
            $('.b-dropdown-wrapper').find('.b-dropdown-user').slideUp();
            $('.b-dropdown-wrapper').find('.b-dropdown-user').removeClass('drop-active');
            curDropEl.addClass('drop-active');
            curDropEl.slideDown();
        }

    })
}

activateDropdownBlock();

function closeDropdownElOverlayClick(){

    $(window).click(function (e) {
        console.log($(e.target));
        console.log($(e.target).hasClass('b-dropdown-wrapper')||$(e.target).hasClass('help-container')
            ||$(e.target).hasClass('header-right-part-user')||$(e.target).hasClass('header-right-part-avatar'));


        if($(e.target).hasClass('b-dropdown-wrapper')||$(e.target).hasClass('help-container')
            ||$(e.target).hasClass('header-right-part-user')||$(e.target).hasClass('header-right-part-avatar')){
            return
        }else{
            // $('.b-dropdown-wrapper').find('.b-dropdown-user').slideUp();
            $('.b-dropdown-wrapper').find('.b-dropdown-user').removeClass('drop-active');
        }

    })

}
// closeDropdownElOverlayClick();