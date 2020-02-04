jQuery(document).ready(function($) {
  'use strict'

  /*-------------------------------------
    Mobile Menu Open
    -------------------------------------*/

  $('#menu-toggle-open').on('click', function(e) {
    $('#body').addClass('mobile-open')
  })

  $('#menu-toggle-closer').on('click', function(e) {
    $('#body').removeClass('mobile-open')
  })

  /*-------------------------------------
    TypeWritter Effect
    -------------------------------------*/
  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate
    this.el = el
    this.loopNum = 0
    this.period = parseInt(period, 10) || 2000
    this.txt = ''
    this.tick()
    this.isDeleting = false
  }

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length
    var fullTxt = this.toRotate[i]

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    $('#typewritter-content').html(this.txt)

    var that = this
    var delta = 200 - Math.random() * 100

    if (this.isDeleting) {
      delta /= 2
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      this.loopNum++
      delta = 500
    }

    setTimeout(function() {
      that.tick()
    }, delta)
  }

  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite')
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type')
      var period = elements[i].getAttribute('data-period')
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period)
      }
    }
  }

  /*-------------------------------------
    Navbar scrolling
    -------------------------------------*/
  var $navigationLinks = $('#navigation > li > a')
  var $sections = $(
    $('.section')
      .get()
      .reverse()
  )

  var sectionIdTonavigationLink = {}
  $sections.each(function() {
    var id = $(this).attr('id')
    sectionIdTonavigationLink[id] = $(
      '#navigation > li > a[href=\\#' + id + ']'
    )
  })

  function highlightNavigation() {
    var scrollPosition = $(window).scrollTop()
    $sections.each(function() {
      var currentSection = $(this)
      var sectionTop = currentSection.offset().top

      if (scrollPosition >= sectionTop - 10) {
        var id = currentSection.attr('id')
        var $navigationLink = sectionIdTonavigationLink[id]
        if (!$navigationLink.hasClass('nav-active')) {
          $navigationLinks.removeClass('nav-active')
          $navigationLink.addClass('nav-active')
        }
        return false
      }
    })
  }

  $(window).scroll(highlightNavigation)

  /*-------------------------------------
    Smooth Scroll
    -------------------------------------*/
  $('#navigation > li > a')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function(event) {
      var target = $(this).attr('href')
      console.log(target)
      var element = $(target)
      console.log(element)
      // Does a scroll target exist?
      event.preventDefault()
      $('html, body').animate(
        {
          scrollTop: element.offset().top
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target)
          $target.focus()
          if ($target.is(':focus')) {
            // Checking if the target was focused
            return false
          } else {
            $target.focus()
          }
        }
      )
    })

  /*-------------------------------------
    Navbar Toggle for Mobile
    -------------------------------------*/
  function navbarCollapse() {
    if ($(window).width() < 992) {
      $(document).on('click', function(event) {
        var clickover = $(event.target)
        var _opened = $('#navbar-collapse').hasClass('in')
        if (_opened === true && !clickover.is('.dropdown')) {
          $('button.navbar-toggle').trigger('click')
        }
      })

      $('.dropdown').unbind('click')
      $('.dropdown').on('click', function() {
        $(this)
          .children('.dropdown-menu')
          .slideToggle()
      })

      $('.dropdown *').on('click', function(e) {
        e.stopPropagation()
      })
    }
  }
  navbarCollapse()

  /*-------------------------------------
    Steller Parallax
    -------------------------------------*/
  $(window).stellar({
    responsive: true,
    positionProperty: 'position',
    verticalOffset: 50,
    horizontalScrolling: false
  })

  /*-----------------------------------------------------
    Banner Slider
    ------------------------------------------------------*/
  if ($('#cps-banner-slider').length > 0) {
    $('#cps-banner-slider').owlCarousel({
      singleItem: true,
      slideSpeed: 200,
      autoPlay: 5000,
      stopOnHover: false,
      navigation: false,
      pagination: false
    })
  }

  /*-----------------------------------------------------
    Banner Slider 2
    ------------------------------------------------------*/
  $('.cps-banner-slider-2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    asNavFor: '.cps-banner-slider-2-screen'
  })
  $('.cps-banner-slider-2-screen').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.cps-banner-slider-2',
    arrows: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 6000
  })

  /*-------------------------------------
    Testimonial Carousel
    -------------------------------------*/
  $('.testimonial-carousel').each(function() {
    if ($(this).is('#testimonial-carousel-2')) {
      $(this).owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [991, 2],
        itemsMobile: [579, 1],
        slideSpeed: 200,
        stopOnHover: true,
        autoPlay: 3000,
        navigation: true,
        navigationText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        pagination: false
      })
    } else {
      $(this).owlCarousel({
        singleItem: true,
        slideSpeed: 200,
        stopOnHover: true,
        autoPlay: 3000,
        navigation: true,
        navigationText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        pagination: false
      })
    }
  })

  /*-------------------------------------
    Screenshot carousel
    -------------------------------------*/
  if ($('#screenshot-carousel').length > 0) {
    var transformProp = Modernizr.prefixed('transform')

    function Carousel3D(el) {
      this.element = el
      this.rotation = 0
      this.panelCount = 0
      this.totalPanelCount = this.element.children.length
      this.theta = 0

      this.isHorizontal = true
    }

    Carousel3D.prototype.modify = function() {
      var panel, angle, i

      this.panelSize = this.element[
        this.isHorizontal ? 'offsetWidth' : 'offsetHeight'
      ]
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX'
      this.theta = 360 / this.panelCount

      this.radius = Math.round(
        this.panelSize / 2 / Math.tan(Math.PI / this.panelCount)
      )

      for (i = 0; i < this.panelCount; i++) {
        panel = this.element.children[i]
        angle = this.theta * i
        panel.style.opacity = 1
        panel.style[transformProp] =
          this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)'
      }

      // hide other panels
      for (; i < this.totalPanelCount; i++) {
        panel = this.element.children[i]
        panel.style.opacity = 0
        panel.style[transformProp] = 'none'
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round(this.rotation / this.theta) * this.theta

      this.transform()
    }

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[transformProp] =
        'translateZ(-' +
        this.radius +
        'px) ' +
        this.rotateFn +
        '(' +
        this.rotation +
        'deg)'
    }

    var init = function() {
      var carousel = new Carousel3D(
          document.getElementById('screenshot-carousel')
        ),
        navButtons = document.querySelectorAll('#navigation button'),
        onNavButtonClick = function(event) {
          var increment = parseInt(
            event.target.getAttribute('data-increment'),
            10
          )
          carousel.rotation += carousel.theta * increment * -1
          carousel.transform()
        }

      // populate on startup
      carousel.panelCount = 12
      carousel.modify()

      for (var i = 0; i < 2; i++) {
        navButtons[i].addEventListener('click', onNavButtonClick, false)
      }

      setTimeout(function() {
        $('body').addClass('ready')
      }, 0)
    }

    $(window).on('load', function() {
      init()
    })
  }

  /*-------------------------------------
    Screenshot carousel 2
    -------------------------------------*/
  $('.screenshot-slick').slick({
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  })

  /*-------------------------------------
    Magnific Popup
    -------------------------------------*/
  $('.image-large').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  })
  $('.play-video, .open-map').magnificPopup({
    type: 'iframe'
  })
  $.extend(true, $.magnificPopup.defaults, {
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        }
      }
    }
  })

  /*-----------------------------------------------------
    Plyr Video
    ------------------------------------------------------*/
  plyr.setup()

  /*-----------------------------------------------------
    Case Study Isotope
    ------------------------------------------------------*/
  // init Isotope
  var $grid = $('.cps-grid').isotope({
    itemSelector: '.cps-grid-item'
  })

  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function() {
    $grid.isotope('layout')
  })

  // filter items on button click
  $('.cps-grid-filter').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter')
    $(this)
      .siblings('button')
      .removeClass('active')
    $(this).addClass('active')
    $grid.isotope({
      filter: filterValue
    })
  })

  /*-------------------------------------
    roadmap content show
    -------------------------------------*/
  function roadmapContent() {
    $('.cps-roadmap-section').each(function() {
      if ($(this).is(':in-viewport')) {
        $(this)
          .children('.cps-roadmap-right')
          .fadeIn()
      } else {
        $(this)
          .children('.cps-roadmap-right')
          .fadeOut()
      }
    })
  }

  roadmapContent()

  /*-------------------------------------
    Animate Progress Bars
    -------------------------------------*/
  function animateProgressBar(pb) {
    if ($.fn.visible && $(pb).visible() && !$(pb).hasClass('animated')) {
      $(pb).css('width', $(pb).attr('aria-valuenow') + '%')
      $(pb).addClass('animated')
    }
  }

  function initProgressBar() {
    var progressBar = $('.progress-bar')
    progressBar.each(function() {
      animateProgressBar(this)
    })
  }

  initProgressBar()

  /*-------------------------------------
    Count To
    -------------------------------------*/
  function animateCountTo(ct) {
    if ($.fn.visible && $(ct).visible() && !$(ct).hasClass('animated')) {
      $(ct).countTo({
        speed: 2000
      })
      $(ct).addClass('animated')
    }
  }

  function initCountTo() {
    var counter = $('.cps-count')
    counter.each(function() {
      animateCountTo(this)
    })
  }

  initCountTo()

  /*-----------------------------------------------------
    Countdown 
    ------------------------------------------------------*/
  $('.countdown').each(function() {
    var endTime = $(this).data('time')
    $(this).countdown(endTime, function(tm) {
      var countTxt = ''
      countTxt +=
        '<span class="section_count"><span class="section_count_data"><span class="count-data"><span class="tcount days">%D </span><span class="text">Days</span></span></span></span>'
      countTxt +=
        '<span class="section_count"><span class="section_count_data"><span class="count-data"><span class="tcount hours">%H</span><span class="text">Hours</span></span></span></span>'
      countTxt +=
        '<span class="section_count"><span class="section_count_data"><span class="count-data"><span class="tcount minutes">%M</span><span class="text">Minutes</span></span></span></span>'
      countTxt +=
        '<span class="section_count"><span class="section_count_data"><span class="count-data"><span class="tcount seconds">%S</span><span class="text">Seconds</span></span></span></span>'

      $(this).html(tm.strftime(countTxt))
    })
  })

  $('#contactForm').on('submit', function(e) {
    e.preventDefault()
    const prName = $('#pr_name').val()
    const email = $('#email').val()

    $(window.location).attr(
      'href',
      `${$('#contactForm').attr('url')}?pr_name=${prName}&email=${email}`
    )
    return false
  })

  /*-----------------------------------
    Subscription
    -----------------------------------*/
  $('.cps-subscription').ajaxChimp({
    callback: mailchimpResponse,
    url:
      'http://codepassenger.us10.list-manage.com/subscribe/post?u=6b2e008d85f125cf2eb2b40e9&id=6083876991' // Replace your mailchimp post url inside double quote "".
  })

  function mailchimpResponse(resp) {
    if (resp.result === 'success') {
      $('.newsletter-success')
        .html(resp.msg)
        .fadeIn()
        .delay(3000)
        .fadeOut()
    } else if (resp.result === 'error') {
      $('.newsletter-error')
        .html(resp.msg)
        .fadeIn()
        .delay(3000)
        .fadeOut()
    }
  }
  /*
  $('.showcase-item').hover(function(event){
    console.log('hey');
  });
*/
  $('.showcase-item').hover(
    function(event) {
      var index = $(this).index() + 1
      $('.showcase-item').addClass('hovering-' + index)

      $('.showcase-item').addClass('not-hovering')
      $(this).removeClass('not-hovering')
    },
    function(event) {
      var index = $(this).index() + 1
      $('.showcase-item').removeClass('hovering-' + index)
      $('.showcase-item').removeClass('not-hovering')
    }
  )

  /*-------------------------------------
    Window Events
    -------------------------------------*/
  $(window).on('scroll', function() {
    initProgressBar()
    initCountTo()
    roadmapContent()
  })

  $(window).on('resize orientationchange', function() {
    navbarCollapse()
  })
})

$(window).on('load', function() {
  if ($('#preloader-wrap').length > 0) {
    $('#preloader-wrap')
      .delay(200)
      .fadeOut()
  }
})
