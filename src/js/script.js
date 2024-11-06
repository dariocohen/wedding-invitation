import $ from "jquery";
import Swiper from "swiper";
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
    $("nav a").removeClass("text-secondary");
    $(this).addClass("text-secondary");
  });

  // when have hash in url add active class
  if (window.location.hash) {
    const hash = window.location.hash;
    $("nav a").removeClass("text-secondary");
    $('a[href="' + hash + '"]').addClass("text-secondary");
  }

  // active class on scroll and change url
  const sections = $("section");
  const nav = $("nav");

  $(window).on("scroll", function () {
    const curPos = $(this).scrollTop();

    sections.each(function () {
      const top = $(this).offset().top - 20;
      const bottom = top + $(this).outerHeight();

      if (curPos >= top && curPos <= bottom) {
        nav.find("a").removeClass("text-secondary");
        nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .addClass("text-secondary");

        if (history.pushState) {
          history.pushState(null, null, "#" + $(this).attr("id"));
        } else {
          location.hash = "#" + $(this).attr("id");
        }
      }
    });
  });

  // scroll to section on load if have hash in url
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = $(hash);

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        200
      );
    }
  }

  /**
   * Swiper
   */
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 1000,
    },
    pagination: false,
  });

  $(".swiper-button-next").on("click", () => {
    swiper.slideNext();
  });

  $(".swiper-button-prev").on("click", () => {
    swiper.slidePrev();
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
        $("#brideFriendly").removeClass("hidden");
        $("#groomFriendly").addClass("hidden");
        break;
      case "groom":
        $("#bride-timeline").addClass("hidden");
        $("#groom-timeline").removeClass("hidden").addClass("flex");
        $("#brideBtn").addClass("hidden");
        $("#groomBtn").removeClass("hidden");
        $("#groomFriendly").removeClass("hidden");
        $("#brideFriendly").addClass("hidden");
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
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    const email = $("#email").val();
    const phone = $("#phone").val();
    const guests = $("#guests").val();

    if (!name || !email || !phone || !guests) {
      alert("Please fill in all fields");
      return;
    }

    alert("Form submitted successfully");
  });

  /**
   * AOS
   */
  AOS.init();
});
