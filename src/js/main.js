var mobileMode = false;

function checkMediaQuery() {
  var mq = window.matchMedia("(max-width: 768px)");
  if (mq.matches) {
    mobileMode = true;
  } else {
    mobileMode = false;
  }
}

function clearSecondColumn() {
  $("#inner-nav-container-column-two").html("");
}

function clearThirdColumn() {
  $("#inner-nav-container-column-three").html("");
}

function clearMainContentArea() {
  $("#inner-container-main-content-area").html("");
}

function getPost(id, offset) {

  // Set correct offset from top of doc
  if (!mobileMode) {
    $("#inner-container-main-content-area").css("margin-top", (16 * (offset + 1)) + "px");
  }

  // Start Loading animation
  var dot_loader = window.setInterval(function () {
    $("#inner-container-main-content-area").append(" . ");
  }, 100);

  // Get post by ID
  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/posts/' + id,
    dataType: 'json',
    success: function (data) {
      // State management
      window.location.hash = "#!" + data.slug;
      // Stop loading animation
      window.clearInterval(dot_loader);
      //  Render template

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      console.log(data);

      $("#inner-container-main-content-area").html(MyApp.templates.post(data));
      // Preload images for overlay viewer
      var l = data.acf.bilder.length;
      if (l !== 0) {
        for (var i = 0; i < l; i++) {
          $('<img/>')[0].src = data.acf.bilder[i].bild.sizes["pwr-large"];
        }
      }
    }
  });
}

function getChildren(id, offset) {

  if (!mobileMode) {
    $("#inner-nav-container-column-two").css("margin-top", (16 * (offset + 1)) + "px");
  }

  var dot_loader = window.setInterval(function () {
    $("#inner-nav-container-column-two").append(" . ");
  }, 100);

  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/pages',
    dataType: 'json',
    data: {
      filter: {
        'post_parent': id
      }
    },
    success: function (data) {

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      data.offset = offset;

      window.clearInterval(dot_loader);

      console.log(data);

      $("#inner-nav-container-column-two").html(MyApp.templates.menuleveltwo(data));
    }
  });

}

function getCategoryContent(category_name, offset, col) {

  if (col === 2) {
    if (!mobileMode) {
      $("#inner-nav-container-column-two").css("margin-top", (16 * (offset + 1)) + "px");
    }
    var dot_loader = window.setInterval(function () {
      $("#inner-nav-container-column-two").append(" . ");
    }, 100);
  } else if (col === 3) {
    if (!mobileMode) {
      $("#inner-nav-container-column-three").css("margin-top", (16 * (offset + 1)) + "px");
    }
    var dot_loader = window.setInterval(function () {
      $("#inner-nav-container-column-three").append(" . ");
    }, 100);
  }


  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/posts',
    dataType: 'json',
    data: {
      filter: {
        'category_name': category_name
      }
    },
    success: function (data) {

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      data.offset = offset;

      window.clearInterval(dot_loader);

      console.log(data);

      if (col === 2) {
        $("#inner-nav-container-column-two").html(MyApp.templates.menuleveltwo(data));
      } else if (col === 3) {
        $("#inner-nav-container-column-three").html(MyApp.templates.menulevelthree(data));
      }

    }
  });
}

function getMenu() {

  // Start Loading animation
  var dot_loader = window.setInterval(function () {
    $("#navigation-column-one").append(" . ");
  }, 100);

  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/pages',
    data: {
      filter: {
        'post_parent': 0,
        'posts_per_page': -1
      }
    },
    dataType: 'json',
    success: function (data) {
      // Stop loading animation
      window.clearInterval(dot_loader);
      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }
      console.log(data);
      //  Render template
      $("#navigation-column-one").html(MyApp.templates.menu(data));
    }
  });
}

function getNews(offset) {

  if (!mobileMode) {
    $("#inner-container-main-content-area").css("margin-top", (16 * (offset + 1)) + "px");
  }
  var dot_loader = window.setInterval(function () {
    $("#inner-container-main-content-area").append(" . ");
  }, 100);

  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/posts',
    dataType: 'json',
    data: {
      'type': "news"
    },
    success: function (data) {

      window.clearInterval(dot_loader);

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      console.log(data)
      $("#inner-container-main-content-area").html(MyApp.templates.news(data));
    }
  });

}

function getSchedule(offset) {

  if (!mobileMode) {
    $("#inner-container-main-content-area").css("margin-top", (16 * (offset + 1)) + "px");
  }

  var dot_loader = window.setInterval(function () {
    $("#inner-container-main-content-area").append(" . ");
  }, 100);

  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/posts',
    dataType: 'json',
    data: {
      'type': "schedule",
      filter: {
        'meta_key': 'datum',
        'orderby': 'meta_value',
        'order': "DESC"
      }
    },
    success: function (data) {

      window.clearInterval(dot_loader);

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      console.log(data)
      $("#inner-container-main-content-area").html(MyApp.templates.schedule(data));
    }
  });

}

function getShop(offset) {

  if (!mobileMode) {
    $("#inner-container-main-content-area").css("margin-top", (16 * (offset + 1)) + "px");
  }
  var dot_loader = window.setInterval(function () {
    $("#inner-container-main-content-area").append(" . ");
  }, 100);

  $.ajax({
    type: 'GET',
    url: 'http://93.95.228.60/projects/ccap/wp-json/posts',
    dataType: 'json',
    data: {
      'type': "shop"
    },
    success: function (data) {

      window.clearInterval(dot_loader);

      if ($.cookie('ccap_language') == "english") {
        data.ccap_english = true;
      } else if ($.cookie('ccap_language') == "swedish") {
        data.ccap_swedish = true;
      }

      console.log(data)
      $("#inner-container-main-content-area").html(MyApp.templates.shop(data));
    }
  });

}

$(function () {

  $(window).resize(function () {
    checkMediaQuery();
  });


  // LANGUAGE COOKIE
  if ($.cookie('ccap_language') === undefined) {
    $.cookie('ccap_language', 'english', {
      expires: 30,
      path: '/'
    });
  } else {
    console.log($.cookie('ccap_language'));
  }

  getMenu();

  console.log(window.location.hash);
  if (window.location.hash) {
    var postSlug = window.location.hash.replace("#!", "");
    console.log(postSlug);

    // Get post by ID
    $.ajax({
      type: 'GET',
      url: 'http://93.95.228.60/projects/ccap/wp-json/posts',
      dataType: 'json',
      data: {
        filter: {
          'name': postSlug
        }
      },
      success: function (data) {

        if ($.cookie('ccap_language') == "english") {
          data[0].ccap_english = true;
        } else if ($.cookie('ccap_language') == "swedish") {
          data[0].ccap_swedish = true;
        }

        // State management
        console.log(data[0]);
        //  Render template
        $("#inner-container-main-content-area").html(MyApp.templates.post(data[0]));
        // Preload images for overlay viewer
        var l = data[0].acf.bilder.length;
        if (l !== 0) {
          for (var i = 0; i < l; i++) {
            $('<img/>')[0].src = data.acf.bilder[i].bild.sizes["pwr-large"];
          }
        }
      }
    }).fail(function () {
      window.clearInterval(dot_loader);
    });

  }


  // Navigation
  $(document).on("click", ".nav-element", function (e) {

    e.preventDefault();

    if ($(this).hasClass("level-one")) {
      $(".pathfinder").removeClass("pathfinder");
      $(this).addClass("pathfinder");
    } else if ($(this).hasClass("level-two")) {
      $(".level-two.pathfinder").removeClass("pathfinder");
      $(this).addClass("pathfinder");
    } else if ($(this).hasClass("level-three")) {
      $(".level-three.pathfinder").removeClass("pathfinder");
      $(this).addClass("pathfinder");
    }

    if ($(this).data("post-id") == 21) {
      clearSecondColumn();
      clearThirdColumn();
      clearMainContentArea();
      getNews($(this).data("nav-offset"));
    } else if ($(this).data("post-id") == 27) {
      clearSecondColumn();
      clearThirdColumn();
      clearMainContentArea();
      getSchedule($(this).data("nav-offset"));
    } else if ($(this).data("post-id") == 74) {
      clearSecondColumn();
      clearThirdColumn();
      clearMainContentArea();
      getShop($(this).data("nav-offset"));
    } else if ($(this).hasClass("category")) {
      if ($(this).hasClass("level-two")) {
        clearThirdColumn();
        clearMainContentArea();
        getCategoryContent($(this).data("category-name"), $(this).data("nav-offset") + $(this).data("second-offset"), 3);
      } else {
        clearSecondColumn();
        clearMainContentArea();
        getCategoryContent($(this).data("category-name"), $(this).data("nav-offset"), 2);
      }

    } else if ($(this).hasClass("children")) {
      clearSecondColumn();
      clearThirdColumn();
      clearMainContentArea();
      getChildren($(this).data("post-id"), $(this).data("nav-offset"));
    } else {
      if ($(this).hasClass("level-one")) {
        clearSecondColumn();
        clearThirdColumn();
        clearMainContentArea();
        getPost($(this).data("post-id"), $(this).data("nav-offset"));

      } else {
        clearMainContentArea();
        getPost($(this).data("post-id"), $(this).data("nav-offset") + $(this).data("second-offset"));
      }
    }

  });

  // COOKIE SWITCH: ENGLISH
  $(document).on("click", '#english', function (e) {
    $.cookie('ccap_language', 'english');
    location.reload();
    e.preventDefault();
  });

  // COOKIE SWITCH: SWEDISH
  $(document).on("click", '#swedish', function (e) {
    $.cookie('ccap_language', 'swedish');
    location.reload();
    e.preventDefault();
  });

  // LIGHTBOX
  $(document).on("click", '.light-box', function (e) {
    var largeLink = '<img src="' + $(this).data("large-src") + '">';
    $("#overlay").html(largeLink);
    $("#overlay").fadeIn();
    e.preventDefault();
  });

  $(document).on("click", '#overlay', function (e) {
    $("#overlay").fadeOut();
    e.preventDefault();
  });

});