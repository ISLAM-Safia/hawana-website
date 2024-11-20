(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').fadeOut('slow');
                $('#spinner').removeClass('show');

            }
        }, 1);
    };
    spinner();
    






    // reservation 
 // Reservation - Updating counters
 const counters = {
    rooms: 1,
    adults: 1,
    children: 0
};

function updateCounter(type, change, event) {
    // Prevent default behavior
    event.preventDefault();

    const value = counters[type] + change;

    // Ensure values do not go below minimum
    if ((type === 'rooms' || type === 'adults') && value < 1) return;
    if (type === 'children' && value < 0) return;

    counters[type] = value;

    // Update the text inside the element
    document.getElementById(type).innerText = counters[type];

    // Disable buttons if the minimum limit is reached
    document.getElementById(`${type}-minus`).disabled = counters[type] === (type === 'children' ? 0 : 1);

    // Update the dropdown button text immediately
    updateDropdownText();
}

function updateDropdownText() {
    const rooms = counters.rooms;
    const adults = counters.adults;
    const children = counters.children;

    // تأكد من عرض 0 children إذا لم يكن هناك أطفال
    const childrenText = children > 0 ? `${children} child${children > 1 ? 'ren' : ''}` : "0 children";

    // تحديد النص الذي سيظهر في البوتون
    const dropdownButton = document.getElementById('guestsDropdown');
    dropdownButton.innerText = `${rooms} room${rooms > 1 ? 's' : ''}, ${adults} adult${adults > 1 ? 's' : ''}, ${childrenText}`;
}


// Add event listeners for buttons
document.getElementById('rooms-plus').addEventListener('click', function (event) {
    updateCounter('rooms', 1, event);
});

document.getElementById('rooms-minus').addEventListener('click', function (event) {
    updateCounter('rooms', -1, event);
});

document.getElementById('adults-plus').addEventListener('click', function (event) {
    updateCounter('adults', 1, event);
});

document.getElementById('adults-minus').addEventListener('click', function (event) {
    updateCounter('adults', -1, event);
});

document.getElementById('children-plus').addEventListener('click', function (event) {
    updateCounter('children', 1, event);
});

document.getElementById('children-minus').addEventListener('click', function (event) {
    updateCounter('children', -1, event);
});

// Update dropdown text when the "Done" button is clicked
document.querySelector('.done-btn').addEventListener('click', function (event) {
    updateDropdownText();
});










    // 
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

