

    // reservation 
 // Reservation - Updating counters
    // بيانات القائمة الأولى
    // بيانات القوائم
    const dropdownsData = [
      {
        locationId: "dropdownLocation1",
        type: "one",
        rooms: 1,
        adults: 1,
        children: 0,
        withChildAgeFields: true,
      },
      {
        locationId: "dropdownLocation2_1",
        type: "two",
        adults: 1,
        children: 0,
        infants: 0,
        economyClass: true,
        infoText: "Please select the exact number of passengers to view the best prices.",
      },
      {
        locationId: "dropdownLocation2_2",
        type: "two",
        adults: 2,
        children: 1,
        infants: 1,
        economyClass: true,
        infoText: "Plan your trip with the best class selection.",
      },
      {
        locationId: "dropdownLocation2_3",
        type: "two",
        adults: 3,
        children: 2,
        infants: 1,
        economyClass: true,
        infoText: "Select your passengers carefully for accurate pricing.",
      },
      {
        locationId: "dropdownLocation3",
        type: "three",
        adults: 1,
        youths: 1,
        infants: 0,
        seniors: 1,
        infoText: `
          <ul>
            <li>Infants under 4 years old can usually travel for free.</li>
            <li>Passenger types must be selected based on age on the day of travel.</li>
          </ul>
        `,
      },
    ];

    // إنشاء القوائم
    dropdownsData.forEach((dropdown) => {
      if (dropdown.type === "one") {
        createDropdownOne(dropdown);
      } else if (dropdown.type === "two") {
        createDropdownTwo(dropdown);
      } else if (dropdown.type === "three") {
        createDropdownThree(dropdown);
      }
    });

    // إنشاء القائمة الأولى
    function createDropdownOne(data) {
      const locationElement = document.getElementById(data.locationId);
      if (!locationElement) return;

      let dropdownHTML = `
        <div class="dropdown">
          <button class="btn  form-control-focus2 dropdown-toggle" type="button" id="dropdownButton${data.locationId}" data-bs-toggle="dropdown" aria-expanded="false">
            ${data.rooms} Room${data.rooms > 1 ? "s" : ""}, ${data.adults} Adult${data.adults > 1 ? "s" : ""}, ${data.children} Child${data.children > 1 ? "ren" : ""}
          </button>
          <div class="dropdown-menu" onclick="preventClose(event)">
      `;

      dropdownHTML += generateCounterHTML(data.locationId, "Rooms", "rooms", data.rooms, "(Min 1)");
      dropdownHTML += generateCounterHTML(data.locationId, "Adults", "adults", data.adults, "(18+ yrs)");
      dropdownHTML += generateCounterHTML(data.locationId, "Children", "children", data.children, "(0-12 yrs)");

      if (data.withChildAgeFields) {
        dropdownHTML += `<div id="childAges${data.locationId}" class="child-age-select"></div>`;
      }

      dropdownHTML += `
            <div class="text-end mt-3">
              <button class="btn btn-primary" onclick="updateButtonText('${data.locationId}')">Done</button>
            </div>
          </div>
        </div>
      `;

      locationElement.innerHTML = dropdownHTML;
    }

    // إنشاء القائمة الثانية
    function createDropdownTwo(data) {
      const locationElement = document.getElementById(data.locationId);
      if (!locationElement) return;

      let dropdownHTML = `
        <div class="dropdown">
          <button class="btn  room-input-dp form-control-focus2 dropdown-toggle" type="button" id="dropdownButton${data.locationId}" data-bs-toggle="dropdown" aria-expanded="false">
            ${data.adults} Adult${data.adults > 1 ? "s" : ""}, ${data.children} Child${data.children > 1 ? "ren" : ""}, ${data.infants} Infant${data.infants > 1 ? "s" : ""}
          </button>
          <div class="dropdown-menu" onclick="preventClose(event)">
      `;

      if (data.infoText) {
        dropdownHTML += `<p class="info-text">${data.infoText}</p>`;
      }

      dropdownHTML += generateCounterHTML(data.locationId, "Adults", "adults", data.adults, "(18+ yrs)");
      dropdownHTML += generateCounterHTML(data.locationId, "Children", "children", data.children, "(0-12 yrs)");
      dropdownHTML += generateCounterHTML(data.locationId, "Infants", "infants", data.infants, "(0-3 yrs)");

      dropdownHTML += `
        <div class="mt-3">
          <label for="economyClass${data.locationId}">Travel Class</label>
          <select id="economyClass${data.locationId}" class="form-select">
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business</option>
            <option value="First ">First </option>
          </select>
        </div>
      `;

      dropdownHTML += `
            <div class="text-end mt-3">
              <button class="btn btn-primary" onclick="updateButtonText('${data.locationId}')">Done</button>
            </div>
          </div>
        </div>
      `;

      locationElement.innerHTML = dropdownHTML;
    }

    // إنشاء القائمة الثالثة
    function createDropdownThree(data) {
      const locationElement = document.getElementById(data.locationId);
      if (!locationElement) return;

      let dropdownHTML = `
        <div class="dropdown">
          <button class="btn  room-input-dp form-control-focus2 dropdown-toggle" type="button" id="dropdownButton${data.locationId}" data-bs-toggle="dropdown" aria-expanded="false">
            ${generateButtonText(data)}
          </button>
          <div class="dropdown-menu" onclick="preventClose(event)">
      `;

      if (data.infoText) {
        dropdownHTML += `<p class="info-text">${data.infoText}</p>`;
      }

      dropdownHTML += generateCounterHTML(data.locationId, "Adults", "adults", data.adults, "(30-59 yrs)");
      dropdownHTML += generateCounterHTML(data.locationId, "Youths", "youths", data.youths, "(4-29 yrs)");
      dropdownHTML += `<div id="youthAges${data.locationId}" class="child-age-select"></div>`;
      dropdownHTML += generateCounterHTML(data.locationId, "Infants", "infants", data.infants, "(0-3 yrs)");
      dropdownHTML += generateCounterHTML(data.locationId, "Seniors", "seniors", data.seniors, "(60+ yrs)");

      dropdownHTML += `
            <div class="text-end mt-3">
              <button class="btn btn-primary" onclick="updateButtonText('${data.locationId}')">Done</button>
            </div>
          </div>
        </div>
      `;

      locationElement.innerHTML = dropdownHTML;
    }

    // إنشاء النص في الزر بناءً على القيم
    function generateButtonText(data) {
      const parts = [];
      if (data.adults !== undefined) parts.push(`${data.adults} Adult${data.adults > 1 ? "s" : ""}`);
      if (data.youths !== undefined) parts.push(`${data.youths} Youth${data.youths > 1 ? "s" : ""}`);
      if (data.infants !== undefined) parts.push(`${data.infants} Infant${data.infants > 1 ? "s" : ""}`);
      if (data.seniors !== undefined) parts.push(`${data.seniors} Senior${data.seniors > 1 ? "s" : ""}`);
      return parts.join(", ");
    }

    // إنشاء الحقول الديناميكية لكل قيمة
    function generateCounterHTML(locationId, label, type, value, note = "") {
      return `
        <div class="counter-control">
          <span>${label} ${note ? `<small class="small-note">${note}</small>` : ""}</span>
          <div>
            <span class="counter-btn" onclick="updateCounter('${locationId}', '${type}', -1)">−</span>
            <span id="${type}${locationId}" class="mx-2">${value}</span>
            <span class="counter-btn" onclick="updateCounter('${locationId}', '${type}', 1)">+</span>
          </div>
        </div>
      `;
    }

    // منع إغلاق القائمة عند التفاعل داخلها
    function preventClose(event) {
      event.stopPropagation();
    }

    // تحديث العداد
    function updateCounter(locationId, type, increment) {
      const counter = document.getElementById(`${type}${locationId}`);
      let value = parseInt(counter.textContent);
      value += increment;

      if (value < 1 && (type === "adults" || type === "rooms")) value = 1; // الحد الأدنى للبالغين والغرف
      if (value < 0) value = 0;

      counter.textContent = value;

      if (type === "children" && locationId === "dropdownLocation1") {
        updateChildAgeFields(locationId, value);
      }

      if (type === "youths" && locationId === "dropdownLocation3") {
        updateYouthAgeFields(locationId, value);
      }

      updateButtonText(locationId);
    }

    // تحديث النص في الزر الرئيسي
    function updateButtonText(locationId) {
      const button = document.getElementById(`dropdownButton${locationId}`);
      const adults = document.getElementById(`adults${locationId}`)?.textContent || 0;
      const youths = document.getElementById(`youths${locationId}`)?.textContent || 0;
      const infants = document.getElementById(`infants${locationId}`)?.textContent || 0;
      const seniors = document.getElementById(`seniors${locationId}`)?.textContent || 0;
      const rooms = document.getElementById(`rooms${locationId}`)?.textContent || 0;
      const children = document.getElementById(`children${locationId}`)?.textContent || 0;

      let text = "";
      if (rooms) text += `${rooms} Room${rooms > 1 ? "s" : ""}, `;
      if (adults) text += `${adults} Adult${adults > 1 ? "s" : ""}`;
      if (children) text += `, ${children} Child${children > 1 ? "ren" : ""}`;
      if (infants) text += `, ${infants} Infant${infants > 1 ? "s" : ""}`;
      if (youths) text += `, ${youths} Youth${youths > 1 ? "s" : ""}`;
      if (seniors) text += `, ${seniors} Senior${seniors > 1 ? "s" : ""}`;

      button.textContent = text.trim().replace(/,$/, "");
    }

    // تحديث حقول أعمار الأطفال في القائمة الأولى



    // تحديث حقول أعمار الأطفال في القائمة الأولى
    function updateChildAgeFields(locationId, numChildren) {
      const childAgesContainer = document.getElementById(`childAges${locationId}`);
      childAgesContainer.innerHTML = ""; // تنظيف الحقول القديمة

      for (let i = 1; i <= numChildren; i++) {
        // إنشاء الحقل مع النص الافتراضي "Child X Age"
        const childAgeField = document.createElement("select");
        childAgeField.className = "form-select mb-2";
        childAgeField.id = `childAge${locationId}-${i}`;
        childAgeField.innerHTML = `
          <option value="" disabled selected>Child ${i} Age</option>
          ${Array.from({ length: 12 }, (_, j) => `<option value="${j + 1}">${j + 1} years</option>`).join("")}
        `;
        childAgesContainer.appendChild(childAgeField);
      }
    }




    function updateYouthAgeFields(locationId, numYouths) {
      const youthAgesContainer = document.getElementById(`youthAges${locationId}`);
      youthAgesContainer.innerHTML = ""; // تنظيف الحقول القديمة

      for (let i = 1; i <= numYouths; i++) {
        const youthAgeField = document.createElement("select");
        youthAgeField.className = "form-select mb-2";
        youthAgeField.id = `youthAge${locationId}-${i}`;
        youthAgeField.innerHTML = `
          <option value="" disabled selected>Youth ${i} Age</option>
          ${Array.from({ length: 26 }, (_, j) => `<option value="${j + 4}">${j + 4} years</option>`).join("")}
        `;
        youthAgesContainer.appendChild(youthAgeField);
      }
    }



























//   Radio Button (round trip one way multi city)

  // مرجع لعناصر الراديو والنصوص
  const roundTrip = document.getElementById('roundTrip');
  const oneWay = document.getElementById('oneWay');
  const multiCity = document.getElementById('multiCity');
  const roundTripContent = document.getElementById('roundTripContent');
  const oneWayContent = document.getElementById('oneWayContent');
  const multiCityContent = document.getElementById('multiCityContent');

  // تحديث المحتوى بناءً على الاختيار
  function updateTripTypeContent() {
    // إخفاء جميع المحتويات
    roundTripContent.classList.add('d-none');
    oneWayContent.classList.add('d-none');
    multiCityContent.classList.add('d-none');

    // عرض المحتوى المناسب
    if (roundTrip.checked) {
      roundTripContent.classList.remove('d-none');
    } else if (oneWay.checked) {
      oneWayContent.classList.remove('d-none');
    } else if (multiCity.checked) {
      multiCityContent.classList.remove('d-none');
    }
  }

  // إضافة مستمعي الأحداث
  roundTrip.addEventListener('change', updateTripTypeContent);
  oneWay.addEventListener('change', updateTripTypeContent);
  multiCity.addEventListener('change', updateTripTypeContent);

  // عرض النص الافتراضي عند التحميل
  updateTripTypeContent();




//   document.addEventListener("DOMContentLoaded", function () {
//     "use strict";

//     // Spinner
//     function spinner() {
//         setTimeout(function () {
//             const spinnerElement = document.getElementById("spinner");
//             if (spinnerElement) {
//                 spinnerElement.style.display = "none";
//                 spinnerElement.classList.remove("show");
//             }
//         }, 1);
//     }
//     spinner();

//     // WOW.js initialization
//     if (typeof WOW !== "undefined") {
//         new WOW().init();
//     }

//     // Sticky Navbar
//     window.addEventListener("scroll", function () {
//         const navbar = document.querySelector(".navbar");
//         if (window.scrollY > 45) {
//             navbar.classList.add("sticky-top", "shadow-sm");
//         } else {
//             navbar.classList.remove("sticky-top", "shadow-sm");
//         }
//     });

//     // Dropdown on mouse hover
//     const dropdowns = document.querySelectorAll(".dropdown");
//     const showClass = "show";

//     function handleHover(event) {
//         const dropdown = event.currentTarget;
//         const toggle = dropdown.querySelector(".dropdown-toggle");
//         const menu = dropdown.querySelector(".dropdown-menu");

//         if (event.type === "mouseenter") {
//             dropdown.classList.add(showClass);
//             toggle.setAttribute("aria-expanded", "true");
//             menu.classList.add(showClass);
//         } else if (event.type === "mouseleave") {
//             dropdown.classList.remove(showClass);
//             toggle.setAttribute("aria-expanded", "false");
//             menu.classList.remove(showClass);
//         }
//     }

//     function setupDropdownHover() {
//         if (window.matchMedia("(min-width: 992px)").matches) {
//             dropdowns.forEach((dropdown) => {
//                 dropdown.addEventListener("mouseenter", handleHover);
//                 dropdown.addEventListener("mouseleave", handleHover);
//             });
//         } else {
//             dropdowns.forEach((dropdown) => {
//                 dropdown.removeEventListener("mouseenter", handleHover);
//                 dropdown.removeEventListener("mouseleave", handleHover);
//             });
//         }
//     }

//     window.addEventListener("load", setupDropdownHover);
//     window.addEventListener("resize", setupDropdownHover);

//     // Back to top button
//     const backToTopButton = document.querySelector(".back-to-top");

//     window.addEventListener("scroll", function () {
//         if (window.scrollY > 300) {
//             backToTopButton.style.display = "block";
//         } else {
//             backToTopButton.style.display = "none";
//         }
//     });

//     backToTopButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     });

//     // Testimonials carousel using OwlCarousel replacement
//     const testimonialCarousel = document.querySelector(".testimonial-carousel");
//     if (testimonialCarousel && typeof OwlCarousel !== "undefined") {
//         // Replace this with your desired carousel initialization method
//         // since OwlCarousel isn't directly supported in Vanilla JS.
//     }
// });

















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




const typed = new Typed('.multiple-text' ,{
  strings : ['Welcome To Our World Hawana ✈️!' , 'Find Your Paradise with Hawana 🚀!',  'Explore the World with Hawana ✈️!' ,'Adventure Awaits with Hawana 🚀!', 'Travel Beyond Limits with Hawana ✈️!' , 'Let Hawana Take You Places 🚀!' ,
    'Embark on a Global Adventure with Hawana ✈️!'],
    typeSpeed : 100 ,
    backSpeed : 100 ,
    backDelay : 1000 ,
    loop : true
  });

  // //////////////////////////////
  const properties = {
    shanghai: [
      {
        image: 'img/destination-1.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 365',
      },
      {
        image: 'img/destination-2.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 447',
      },
      {
        image: 'img/destination-3.jpg',
        title: 'Yitel Premium (Shanghai peoples Square Nanjing Road Pedestrian Street shop)',
        ratingstar: '⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 310',
      },
    ],
    guangzhou: [
      {
        image: 'img/destination-1.jpg',
        title: 'Guangzhou Hotel A',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 400',
      },
      {
        image: 'img/destination-1.jpg',
        title: 'Guangzhou Hotel B',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 350',
      },
      {
        image: 'img/destination-3.jpg',
        title: 'Guangzhou Hotel C',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 290',
      },
    ],
    beijing: [
      {
        image: 'img/package-1.jpg',
        title: 'Beijing Hotel A',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 420',
      },
      {
        image: 'img/package-2.jpg',
        title: 'Beijing Hotel B',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 390',
      },
      {
        image: 'img/package-3.jpg',
        title: 'Beijing Hotel C',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 360',
      },
    ], 
    Tokyo: [
      {
        image: 'img/destination-1.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 365',
      },
      {
        image: 'img/destination-2.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 447',
      },
      {
        image: 'img/destination-3.jpg',
        title: 'Yitel Premium (Shanghai peoples Square Nanjing Road Pedestrian Street shop)',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 310',
      },
    ],
    'Hong Kong': [
      {
        image: 'img/destination-1.jpg',
        title: 'Guangzhou Hotel A',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 400',
      },
      {
        image: 'img/destination-1.jpg',
        title: 'Guangzhou Hotel B',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 350',
      },
      {
        image: 'img/destination-3.jpg',
        title: 'Guangzhou Hotel C',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 290',
      },
    ],
    Seoul: [
      {
        image: 'img/package-1.jpg',
        title: 'Beijing Hotel A',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 420',
      },
      {
        image: 'img/package-2.jpg',
        title: 'Beijing Hotel B',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 390',
      },
      {
        image: 'img/package-3.jpg',
        title: 'Beijing Hotel C',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 360',
      },
    ],
    Singapore: [
      {
        image: 'img/destination-1.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 365',
      },
      {
        image: 'img/destination-2.jpg',
        title: 'Heyitang Hotel Shanghai International Tourism Resort  ',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 447',
      },
      {
        image: 'img/destination-3.jpg',
        title: 'Da Zhong Airport Hotel',
        ratingstar: '⭐⭐⭐⭐⭐',
        ratingcity : ' 4.7',
        totalrating : ' /5',
        review: ' 6166 reviews',
        price: 'From SAR 310',
      },
    ],
  };

  function showProperties(city, element) {
    // تحديث المحتوى الديناميكي
    for (let i = 0; i < 3; i++) {
      const property = properties[city][i];
      document.getElementById(`property-${i + 1}`).innerHTML = `
        <div class="property-card">
          <div class="property-image">
            <img src="${property.image}" alt="${property.title}">
          </div>
          <div class="property-content">
            <h5 class="mb-2 property-city-title">${property.title}</h5>
            <div class="property-rating">${property.ratingstar}</div>
            <div class="property-review"> 
                <p class="property-city-rating"> 
                  <span >${property.ratingcity}</span><span class ="property-total-rating">${property.totalrating}</span> 
                </p> ${property.review}  </div>
            <div class="price">${property.price}</div>
          </div>
        </div>
      `;
    }

    // ratingcity : ' 4.7',
    // totalrating : ' /5',
    // تحديث الحالة النشطة (Active State)
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');
  }

  // Initialize with Shanghai properties
  showProperties('shanghai', document.getElementById('shanghai-tab'));