import $ from "jquery";

import AOS from "aos";
import "aos/dist/aos.css";

$(() => {

  /**
   * AOS
   */
  AOS.init();

  /**
   * Hide preloader
   */
  $("#preloader").fadeOut();
});
