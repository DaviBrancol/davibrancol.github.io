/**
 * Product: Elune
 * Description: Coming Soon Template
 * Author: Davi Brancol
 * Author URL: https://themeforest.net/user/brancol
 * Version: v1.0.0
 * License: Licensed by Themeforest - Themeforest Licenses can be found at https://themeforest.net/licenses
 */

/*----------- Indexes -----------*/

/**
 * Menu Toggle
 * Color Toggle
 * Navbar - Sidebar Scrolling
 * Navbar - Sidebar Smooth Scroll
 * Navbar - Sidebar Toggle - Mobile
 * Preloader
 * Countdown Logic
 */

jQuery(document).ready(function ($) {
  'use strict'

  function runSlick(id) {
    console.log(id)
    if (id === 'slick-portfolio') {
      $('.slick-portfolio').slick({
        dots: false,
        infinite: true,
        center: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow slick-arrow-portfolio slick-arrow-left"><i class="fa fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-arrow-portfolio slick-arrow-right"><i class="fa fa-chevron-right"></i></div>',
      })
    } else if (id === 'slick-node') {
      $('.slick-node').slick({
        dots: true,
        infinite: true,
        center: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow slick-arrow-left"><i class="fa fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-arrow-right"><i class="fa fa-chevron-right"></i></div>',
      })
    } else if (id === 'slick-medium') {
      $('.slick-medium').slick({
        dots: true,
        infinite: true,
        center: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow slick-arrow-left"><i class="fa fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-arrow-right"><i class="fa fa-chevron-right"></i></div>',
      })
    }
  }

  $('nav > ul > li').on('click', (e) => {
    const modal = e.target.getAttribute('data-modal')
    $('#transition-overlay').addClass('transition-fadeIn')
    $('#transition-overlay').addClass('transition-fadeIn-active')
    setTimeout(() => {
      $('#transition-overlay').removeClass('transition-fadeIn-active')
      $(`#${modal}`).removeClass('hidden')
      runSlick(`slick-${modal}`)
    }, 800)
    setTimeout(() => {
      $('#transition-overlay').removeClass('transition-fadeIn')
    }, 1400)
  })

  $('.menu-close').on('click', (e) => {
    const modal = e.target.getAttribute('data-modal')
    $('#transition-overlay').addClass('transition-fadeOut')
    $('#transition-overlay').addClass('transition-fadeOut-active')
    setTimeout(() => {
      $('#transition-overlay').removeClass('transition-fadeOut-active')
      $(`#${modal}`).addClass('hidden')
    }, 800)
    setTimeout(() => {
      $('#transition-overlay').removeClass('transition-fadeOut')
    }, 1400)
  })

  /*------------------------------------
    Menu Toggle
  ------------------------------------*/

  $('#menu-toggle-open').on('click', function (e) {
    $('#body').addClass('side-open')
  })

  $('#cta-open').on('click', function (e) {
    $('#body').addClass('side-open')
  })

  $('#menu-toggle-close').on('click', function (e) {
    $('#body').removeClass('side-open')
    var $navigationLinks = $('#navigation > ul > li > a')
    $navigationLinks.removeClass('nav-active')
    $('#nav-home').addClass('nav-active')
  })

  $("navbar > ul > li > a:not([href='#home'])").on('click', function (e) {
    $('#body').addClass('side-open')
    var $navigationLinks = $('#navigation > ul > li > a')
    $navigationLinks.removeClass('nav-active')
  })

  $("navbar > ul > li > a[href='#home']").on('click', function (e) {
    $('#body').removeClass('side-open')
    var $navigationLinks = $('#navigation > ul > li > a')
    $navigationLinks.removeClass('nav-active')
    $('#nav-home').addClass('nav-active')
  })

  /*------------------------------------
    Color Toggle
  ------------------------------------*/

  $('#settings-cog').on('click', function (e) {
    const el = $('#body')
    if (el.hasClass('settings-open')) {
      el.removeClass('settings-open')
    } else {
      el.addClass('settings-open')
    }
  })

  $('.color').on('click', function (e) {
    $('#body').removeClass(function (index, css) {
      return (css.match(/\bcolor-\S+/g) || []).join(' ')
    })
    $('#body').addClass($(e.target).attr('data-color'))
  })

  /*------------------------------------
    Navbar - Sidebar Scrolling
  ------------------------------------*/

  var $navigationLinks = $('#navigation > ul > li > a')
  var $sections = $($('.section').get().reverse())

  var sectionIdTonavigationLink = {}
  $sections.each(function () {
    var id = $(this).attr('id')
    sectionIdTonavigationLink[id] = $('#navigation > ul > li > a[href=\\#' + id + ']')
  })

  function highlightNavigation() {
    var scrollPosition = $('#sidearea').scrollTop()
    $sections.each(function () {
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

  $('#sidearea').scroll(highlightNavigation)

  /*------------------------------------
    Navbar - Sidebar Smooth Scroll
  ------------------------------------*/
  $('#navigation > ul > li > a')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href="#home"]')
    .on('click', function (event) {
      var target = $(this).attr('href')
      var element = $(target)
      event.preventDefault()
      const topValue = $('#sidearea').scrollTop() + element.offset().top
      $('#sidearea').animate(
        {
          scrollTop: topValue,
        },
        1000,
        function () {
          var $target = $(target)
          $target.focus()
          if ($target.is(':focus')) {
            return false
          } else {
            $target.focus()
          }
        }
      )
    })

  /*------------------------------------
    Navbar - Sidebar Toggle - Mobile
  ------------------------------------*/
  function navbarCollapse() {
    if ($(window).width() < 992) {
      $(document).on('click', function (event) {
        var clickover = $(event.target)
        var _opened = $('#navbar-collapse').hasClass('in')
        if (_opened === true && !clickover.is('.dropdown')) {
          $('button.navbar-toggle').trigger('click')
        }
      })

      $('.dropdown').unbind('click')
      $('.dropdown').on('click', function () {
        $(this).children('.dropdown-menu').slideToggle()
      })

      $('.dropdown *').on('click', function (e) {
        e.stopPropagation()
      })
    }
  }
  navbarCollapse()

  /*------------------------------------
    Preloader
  ------------------------------------*/

  $('.preloader').delay(1000).fadeOut('slow')

  /*------------------------------------
    Countdown Logic
  ------------------------------------*/

  // Set your initial time here (in seconds)
  let time = 24 * 60 * 60 + 4
  timeInterval()

  setInterval(() => {
    timeInterval()
  }, 1000)

  function timeInterval() {
    let timer = time
    var day = Math.floor(timer / (24 * 3600))

    timer = timer % (24 * 3600)
    var hours = Math.floor(timer / 3600)

    timer %= 3600
    var minutes = Math.floor(timer / 60)

    timer %= 60
    var seconds = timer
    updateTimer('#timer-days', day)
    updateTimer('#timer-hours', hours)
    updateTimer('#timer-minutes', minutes)
    updateTimer('#timer-seconds', seconds)
    time = time - 1
  }

  function updateTimer(id, time) {
    if ($(id).html() !== time.toString().padStart(2, '0')) {
      $(id).html(time.toString().padStart(2, '0'))
    }
  }
})
