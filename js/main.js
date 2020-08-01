/**
 * Product: Taldarine - Personal Portfolio
 * Description: Personal Portfolio
 * Author: Davi Brancol
 * Author URL: https://davibrancol.com.br
 * Version: v1.0.0
 */

/*----------- Indexes -----------*/

/**
 * Carousel
 * Menu Toggle
 * Preloader
 */

jQuery(document).ready(function ($) {
  'use strict'

  function runSlick(id) {
    if (id === 'slick-portfolio') {
      $('.slick-portfolio').slick({
        dots: false,
        infinite: true,
        center: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow slick-arrow-portfolio slick-arrow-left"><i class="fa fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-arrow-portfolio slick-arrow-right"><i class="fa fa-chevron-right"></i></div>',
        responsive: [
          {
            breakpoint: 771,
            settings: {
              arrows: false,
            },
          },
        ],
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
        responsive: [
          {
            breakpoint: 771,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
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
        responsive: [
          {
            breakpoint: 771,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
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
      $('#hamburger-close').addClass('hidden')
      $('#hamburger-open').removeClass('hidden')
      $('nav').removeClass('active')
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

  $('#hamburger-open').on('click', function (e) {
    $('#hamburger-open').addClass('hidden')
    $('#hamburger-close').removeClass('hidden')
    $('nav').addClass('active')
  })

  $('#hamburger-close').on('click', function (e) {
    $('#hamburger-close').addClass('hidden')
    $('#hamburger-open').removeClass('hidden')
    $('nav').removeClass('active')
  })

  /*------------------------------------
    Preloader
  ------------------------------------*/

  // $('.preloader').delay(300).fadeOut('fast')
})
