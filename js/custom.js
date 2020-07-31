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
 * YOUR_INDEX_HERE
 */

/*------------------------------------
  YOUR_INDEX_HERE
------------------------------------*/

// JAVASCRIPT CODE HERE
var getDirection = function (ev, obj) {
  var w = obj.offsetWidth,
    h = obj.offsetHeight,
    x = ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? h / w : 1),
    y = ev.pageY - obj.offsetTop - (h / 2) * (h > w ? w / h : 1),
    d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4

  return d
}
