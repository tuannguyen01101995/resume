var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 150;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);


  /*Loading page*/ 
  $("#loading-page").hide();
  $("body").removeClass("hideScroll");
  new WOW().init();
};



$('.js-tilt').tilt({
  maxTilt: 20,
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 300, // Speed of the enter/exit transition.
  transition: true, // Set a transition on enter/exit.
  disableAxis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  glare: true, // Enables glare effect
  maxGlare: 0.5 // From 0 - 1.
})



$('[data-fancybox]').fancybox({
  protect: true,
  loop: true
});



$(window).resize(function () {
  var height = $(window).height();
  var width = $(".avatar").width();

  $("#welcome").css({ "height": height });
  $(".content").css({ "margin-top": (height * 0.25) });
  $(".border-inner").css({ "width": (width - 40) });
})
$(document).scroll(function () {
  var height = $(window).height();
  if ($(document).scrollTop() >= height - 50) {
    $("nav").css({ "background": "#333333" });
    $("#scroll-totop").css({ "right": "20px" });
  }
  else {
    $("nav").css({ "background": "transparent" });
    $("#scroll-totop").css({ "right": "-50px" });

  }
})
$(document).ready(function () {
  var height = $(window).height();
  var width = $(".avatar").width();
  $("#welcome").css({ "height": height });
  $(".content").css({ "margin-top": (height * 0.25) });
  $(".border-inner").css({ "width": (width - 40) });

  if ($(document).scrollTop() >= height - 50) {
    $("nav").css({ "background": "#333333" });
    $("#scroll-totop").css({ "right": "20px" });
  }
  else {
    $("nav").css({ "background": "transparent" });
    $("#scroll-totop").css({ "right": "-50px" });

  }

  $('.scroll').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: eval($($(this).attr('href')).offset().top)
    }, 700);
  });


  function Valid_Empty(id) {
    var value = $(id);
    var kq = false;
    if (value.val() === "") {
      kq = false;
      value.attr("placeholder", "This input be filled");
      value.focus();
    }
    else {
      kq = true;
    }
    return kq;
  }
  function Check_Email() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $('#txt_email');
    var kq = false;
    if (email.val().match(mailformat)) {
      kq = true;
    }
    else {
      kq = false;
      email.attr("placeholder", "This input be filled");
      email.focus();
    }
    return kq;
  }
  function Check_Input() {
    return Valid_Empty("#txt_name") &&
      Check_Email() &&
      Valid_Empty("#txt_title") &&
      Valid_Empty("#txt_content");
  }

  function Blank() {
    $("#txt_name").val("");
    $("#txt_email").val("");
    $("#txt_phone").val("");
    $("#txt_title").val("");
    $("#txt_content").val("");
  }
  $("#btn_Send_Email").click(function () {
    if (Check_Input()) {
      var name = $("#txt_name").val();
      var email = $("#txt_email").val();
      var phone = $("#txt_phone").val();
      var subject = $("#txt_title").val();
      var content = $("#txt_content").val();

      // window.location.href =
      //   ("mailto:tuannguyen01101995@gmail.com?subject=" + subject +
      //     "&body=" + content);


      emailjs.init("user_F6UH5hrmlxJWVUe1YIZNv");

      var template_params = {
        "from_name": name,
        "email_from": email,
        "reply_to": email,
        "subject": subject,
        "to_name": "Nguyễn Ngọc Tuấn",
        "content": content
      }

      var service_id = "service_k1n397w";
      var template_id = "template_5deLy2vG";
      emailjs.send(service_id, template_id, template_params).then(function (response) {
        swal({
          type: 'success',
          title: 'Email sent successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        Blank();
      }, function (error) {
        swal({
          type: 'success',
          title: 'Email sent failed!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  })
})
