import $ from "jquery";

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

import AOS from "aos";
import "aos/dist/aos.css";

$(() => {
  /**
   * Menu toggle
   */
  const openMenu = () => {
    $("header").addClass("menu-open");
    $("body").css("overflow", "hidden");
  };

  const closeMenu = () => {
    $("header").removeClass("menu-open");
    $("body").css("overflow", "auto");
  };

  $("#hamburger").on("click", () => {
    if ($("header").hasClass("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $("nav a").on("click", () => {
    closeMenu();
  });

  $(window).on("resize", () => {
    if ($(window).width() > 768) {
      closeMenu();
    }
  });

  /**
   * Menu active state
   */
  $("nav a").on("click", function () {
    $(".header-line").removeClass("scale-x-100");
    $(this).find(".header-line").addClass("scale-x-100");
  });

  // scroll to section on load if have hash in url
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = $(hash);

    if (target.length) {
      $(".header-line").removeClass("scale-x-100");
      $(`nav a[href="${hash}"]`).find(".header-line").addClass("scale-x-100");

      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        200
      );
    }
  } else {
    $("nav a").find(".header-line").first().addClass("scale-x-100");
  }

  /**
   * Swiper
   */
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Navigation, Autoplay],
  });

  /**
   * Modal
   */
  $(".modal-open").on("click", (e) => {
    e.preventDefault();
    const modalId = $(e.currentTarget).data("modal");
    $(modalId).fadeIn();
    $("#modal-bg").fadeIn();
  });

  $(".modal-close").on("click", () => {
    if (!$("#brideOrGroom").is(":visible")) {
      $(".modal").fadeOut();
      $("#modal-bg").fadeOut();
    }
  });

  const changeGuestType = (type) => {
    localStorage.setItem("guestType", type);

    switch (type) {
      case "bride":
        $("#groom-timeline").addClass("hidden");
        $("#bride-timeline").removeClass("hidden").addClass("flex");

        $("#groomBtn").addClass("hidden");
        $("#brideBtn").removeClass("hidden");

        $("#groomForm").addClass("hidden");
        $("#brideForm").removeClass("hidden");
        break;
      case "groom":
        $("#bride-timeline").addClass("hidden");
        $("#groom-timeline").removeClass("hidden").addClass("flex");

        $("#brideBtn").addClass("hidden");
        $("#groomBtn").removeClass("hidden");

        $("#brideForm").addClass("hidden");
        $("#groomForm").removeClass("hidden");
        break;
    }
  };

  // find guest type from local storage
  const guestType = localStorage.getItem("guestType");
  if (!guestType) {
    $("#brideOrGroom").fadeIn();
    $("#modal-bg").fadeIn();
  } else {
    changeGuestType(guestType);
  }

  // set guest type to local storage
  $(".guest-type").on("click", function () {
    const type = $(this).data("type");
    changeGuestType(type);
    $(".modal").fadeOut();
    $("#modal-bg").fadeOut();
  });

  // change guest type
  $("#changeGuestType").on("click", () => {
    const guestType = localStorage.getItem("guestType");
    changeGuestType(guestType === "bride" ? "groom" : "bride");
  });

  /**
   * Countdown
   */
  const weddingDate = new Date("2025-01-01T14:00:00").getTime();

  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minutesEl = $("#minutes");
  const secondsEl = $("#seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      daysEl.text("00");
      hoursEl.text("00");
      minutesEl.text("00");
      secondsEl.text("00");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.text(days);
    hoursEl.text(hours);
    minutesEl.text(minutes);
    secondsEl.text(seconds);
  };

  const countdownInterval = setInterval(updateCountdown, 1000);

  /**
   * Registry form validation
   */
  $("form").on("submit", (e) => {
    e.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val() || "N/A";
    const phone = $("#phone").val() || "N/A";
    const guests = $("#guests").val() || "N/A";

    if (!name) {
      alert("Please fill in all fields");
      return;
    }

    // send form data to https://formspree.io/f/xpwzlkbr
    $.ajax({
      url: "https://formspree.io/f/xpwzlkbr",
      method: "POST",
      data: {
        name,
        email,
        phone,
        guests,
      },
      dataType: "json",
      success: () => {
        alert("Cảm ơn Quý khách đã xác nhận tham dự tiệc cưới của chúng tôi!");
        $("form")[0].reset();
      },
    });
  });

  /**
   * AOS
   */
  AOS.init();

  /**
   * Hide preloader
   */
  $("#preloader").fadeOut();
});
