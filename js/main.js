// AOS js를 사용하기 위한 초기화
AOS.init();
// 메인 슬라이더 swiper js
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
// 아이템 리스트 swiper js
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
// 스와이퍼 내부에 마우스가 있을경우 자동적으로 넘어가지 않게 설정
$(".swiper-slide").on("mouseover", function () {
  swiper.autoplay.stop();
});
$(".swiper-slide").on("mouseout", function () {
  swiper.autoplay.start();
});

let header_bool = false;
// 문서내 이벤트를 위한 함수
$(document).ready(function () {
  // 브라우저 크기가 변경될때마다 체크해서 브라우저 크기를 계속 받아옴.
  let win_size = $(window).width();
  $(window).resize(function () {
    win_size = $(window).width();
    console.log(win_size);
  });
  // 스크롤 할경우 스크롤값을 계속 받아, 스크롤 위치에 맞는 이벤트 적용
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
    // 모바일 사이즈일경우에는 적용하지 않음
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
  // 모바일 검색 버튼
  $(".search > a").click(function () {
    event.preventDefault();
    $("#mobile_search_box").addClass("on");
    $("#mobile_search_box")
      .animate({ opacity: 0 }, 0, function () {})
      .animate({ opacity: 1 }, 500, function () {});
  });
  // 메뉴 검색 버튼
  $(".menu > a").click(function () {
    event.preventDefault();

    $("#mobile_menu").addClass("on");
    menu_box_width = $("#mobile_menu > .menu_box").width();
    $("#mobile_menu > .menu_box")
      .animate({ left: -menu_box_width }, 0, function () {})
      .animate({ opacity: 1 }, 200, function () {})
      .animate({ left: 0 }, 100, function () {
        $("#mobile_menu > .exit > div").addClass("active");
        $("#mobile_menu > .menu_box").addClass("active");
        MenuInit();
        $("#mobile_menu > div > .menu > li")
          .eq(0)
          .css("background-color", "white")
          .css("border-bottom", "none");
        $("#mobile_menu > div > .menu_list > ul").eq(0).css("display", "block");
      });
  });
  // 메뉴 닫기 버튼
  $("#mobile_menu > .exit").click(function () {
    menu_box_width = $("#mobile_menu > .menu_box").width();
    $("#mobile_menu > .exit > div").removeClass("active");
    $("#mobile_menu > .menu_box").remove("active");
    $("#mobile_menu > .menu_box")
      .animate({ left: 0 }, 0, function () {})
      .animate({ left: -menu_box_width }, 100, function () {})
      .animate({ opacity: 0 }, 500, function () {
        $(this).parent().removeClass("on");
      });
  });
  // 메뉴 내 카테고리 선택
  $("#mobile_menu > div > .menu > li").click(function (index) {
    MenuInit();
    $(this).children("ul").css("display", "block");
    $(this).css("border-bottom", "none");
    $(this).css("background-color", "white");
    $("#mobile_menu > div > .menu_list")
      .children("." + $(this).attr("class"))
      .css("display", "block");
  });
  // 검색 박스에서 외부 박스를 선택시 나갈수 있도록 함
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
$(".top_btn").on("click", () => {
  event.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 300);
});
// marquee 이벤트
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
function MenuInit() {
  $("#mobile_menu > div > .menu_list").children("ul").css("display", "none");
  $("#mobile_menu > div > .menu > li").css("background-color", "#f5f5f5");
  $("#mobile_menu > div > .menu > li").css("border-bottom", "1px solid #ccc");
}
