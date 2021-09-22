AOS.init();
let swiper = new Swiper("#main_slider", {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  on: {
    activeIndexChange: function () {
      let active_slide_txt_box = $("#main_slider")
        .find(".swiper-slide")
        .children(".slide_txt");
      active_slide_txt_box.animate(
        { opacity: 0, top: -100 },
        10,
        function () {}
      );
      active_slide_txt_box.animate(
        {
          opacity: 1,
          top: 0,
        },
        1000,
        function () {}
      );
    },
  },
});
let swiper2 = new Swiper("#new_item_list", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // 1280px 보다 클 경우
    1280: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});
$(".swiper-slide").on("mouseover", function () {
  swiper.autoplay.stop();
});
$(".swiper-slide").on("mouseout", function () {
  swiper.autoplay.start();
});

let header_bool = false;
$(document).ready(function () {
  let win_size = $(window).width();
  $(window).resize(function () {
    win_size = $(window).width();
    console.log(win_size);
  });
  $(this).scroll(function () {
    let user_scroll = window.pageYOffset;
    let sb_top = $("#best_review").offset().top;
    let review_container_bottom =
      $("#best_review").offset().top + $("#best_review").height();
    let header = $("header");

    if (header.height() < user_scroll) {
      if (!header_bool) {
        header.slideUp(0);
      }
      header.addClass("fixed");
      header.slideDown(500);
      header.css("background-color", "rgba(0,0,0,0.9)");
      header_bool = true;
    } else {
      $("header").removeClass("fixed");
      header.css("background-color", "rgba(0,0,0,0)");
      header_bool = false;
    }
    if (win_size > 768) {
      if (
        sb_top < user_scroll &&
        review_container_bottom - $(".sticky_box").height() > user_scroll
      ) {
        //유저스크롤이 sticky박스보다 크고 리뷰박스보다 작을 경우 fixed 추가
        if (!$(".sticky_box").hasClass("fixed")) {
          $(".sticky_box").addClass("fixed");
        }
      } else if (
        review_container_bottom - $(".sticky_box").height() <
        user_scroll
      ) {
        if ($(".sticky_box").hasClass("fixed")) {
          $(".sticky_box").removeClass("fixed");
          $(".sticky_box").css(
            "top",
            $("#best_review").height() - $(".sticky_box").height()
          );
          console.log("in");
        }
      } else {
        if ($(".sticky_box").hasClass("fixed")) {
          $(".sticky_box").removeClass("fixed");
          $(".sticky_box").css("top", 100);
        }
      }
    } else {
      $(".sticky_box").removeClass("fixed");
    }
  });
  $(".search > a").click(function () {
    event.preventDefault();
    $("#mobile_search_box").addClass("on");
    $("#mobile_search_box")
      .animate({ opacity: 0 }, 0, function () {})
      .animate({ opacity: 1 }, 500, function () {});
  });
  $("#mobile_search_box").click(function (e) {
    if ($(e.target).hasClass("on")) {
      $("#mobile_search_box")
        .animate({ opacity: 1 }, 0, function () {})
        .animate({ opacity: 0 }, 500, function () {
          $(this).removeClass("on");
        });
    }
  });
});

$.each($(".marquee"), function (index, item) {
  const wrapper = $(".marquee_wrapper");
  const roller = $(item);
  roller.append(wrapper);
  const span = wrapper.find("span");
  wrapper.append(span);
  let span_width = -280; //마진값
  for (let i = 0; i < 5; i++) {
    span_width += span.get(i).offsetWidth;
  }
  const max_width = roller.width() + span_width;
  let inner_width = span_width;
  while (max_width > inner_width) {
    wrapper.append(span.clone());
    inner_width += span_width;
  }
  anime({
    targets: wrapper.get(0),
    translateX: {
      value: "-=" + span_width + "px",
      duration: 10000,
    },
    loop: true,
    easing: "linear",
  });
});
