import $ from "jquery";

import AOS from "aos";
import "aos/dist/aos.css";

$(() => {
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
   * Countdown
   */
  const weddingDate = new Date("2025-11-08T19:00:00").getTime();

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
