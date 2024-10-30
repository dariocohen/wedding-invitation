import $ from "jquery";
import Swiper from "swiper";

$(() => {
  /**
   * Menu toggle
   */
  $("#hamburger").on("click", () => {
    $("header").toggleClass("menu-open");
  });

  $("nav a").on("click", () => {
    $("header").removeClass("menu-open");
  });

  $(window).on("resize", () => {
    $("header").removeClass("menu-open");
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
  const navHeight = nav.outerHeight();

  $(window).on("scroll", function () {
    const curPos = $(this).scrollTop();

    sections.each(function () {
      const top = $(this).offset().top - navHeight - 20;
      const bottom = top + $(this).outerHeight();

      if (curPos >= top && curPos <= bottom) {
        nav.find("a").removeClass("text-secondary");
        nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .addClass("text-secondary");
        // change url
        if (history.pushState) {
          history.pushState(null, null, "#" + $(this).attr("id"));
        } else {
          location.hash = "#" + $(this).attr("id");
        }
      }
    });
  });

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
        break;
      case "groom":
        $("#bride-timeline").addClass("hidden");
        $("#groom-timeline").removeClass("hidden").addClass("flex");
        $("#brideBtn").addClass("hidden");
        $("#groomBtn").removeClass("hidden");
        break;
    }
  }

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
});
