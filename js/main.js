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
    children: 0,
};

// تحديث القيم
function updateCounter(type, change, event) {
    // منع السلوك الافتراضي
    event.preventDefault();

    const value = counters[type] + change;

    // التأكد من أن القيم لا تنخفض عن الحد الأدنى أو تزيد عن الحد الأقصى
    if ((type === 'rooms' || type === 'adults') && value < 1) return;
    if (type === 'children') {
        if (value < 0) return; // الحد الأدنى للأطفال
        if (value > 10) return; // الحد الأقصى للأطفال
    }

    counters[type] = value;

    // تحديث النص داخل العنصر
    document.getElementById(type).innerText = counters[type];

    // تعطيل الأزرار إذا تم الوصول للحد الأدنى أو الأقصى
    document.getElementById(`${type}-minus`).disabled = counters[type] === (type === 'children' ? 0 : 1);
    if (type === 'children') {
        document.getElementById(`${type}-plus`).disabled = counters[type] === 10;
    }

    // تحديث حقول أعمار الأطفال إذا تغير عددهم
    if (type === 'children') updateChildrenAges();

    // تحديث النص في البوتون مباشرة
    updateDropdownText();
}

// تحديث النص الظاهر في البوتون الرئيسي
function updateDropdownText() {
    const rooms = counters.rooms;
    const adults = counters.adults;
    const children = counters.children;

    // التأكد من عرض 0 children إذا لم يكن هناك أطفال
    const childrenText = children > 0 ? `${children} child${children > 1 ? 'ren' : ''}` : "0 children";

    // تحديد النص الذي سيظهر في البوتون
    const dropdownButton = document.getElementById('guestsDropdown');
    dropdownButton.innerText = `${rooms} room${rooms > 1 ? 's' : ''}, ${adults} adult${adults > 1 ? 's' : ''}, ${childrenText}`;
}

// تحديث حقول أعمار الأطفال
function updateChildrenAges() {
    const childrenCount = counters.children;
    const childrenAgesContainer = document.getElementById('children-ages');

    // إظهار أو إخفاء الحاوية بناءً على عدد الأطفال
    childrenAgesContainer.style.display = childrenCount > 0 ? 'block' : 'none';

    // إعادة تعيين الحقول عند تغيير العدد
    childrenAgesContainer.innerHTML = '';
    for (let i = 0; i < childrenCount; i++) {
        const ageSelect = document.createElement('select');
        ageSelect.className = 'form-select mb-2';
        ageSelect.innerHTML = '<option value="" disabled selected>Select age</option>';
        for (let age = 1; age <= 12; age++) {
            ageSelect.innerHTML += `<option value="${age}">${age} year${age > 1 ? 's' : ''}</option>`;
        }
        childrenAgesContainer.appendChild(ageSelect);
    }
}

// إضافة الأحداث للأزرار
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

// تحديث النص عند النقر على زر "Done"
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

