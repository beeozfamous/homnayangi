$(function () {
  //Check to see if the window is top if not then display button

  $(window).scroll(function () {
    if ($(this).scrollTop() < 100) {
      $('#scroll_to_top').fadeOut();
    } else if ($(this).scrollTop() > 200) {

      $('#scroll_to_top').fadeIn(100);
    }
  });

  //Click event to scroll to top
  $('#scroll_to_top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

  $('.content').infiniteScroll()({
    path: '.pagination__next',
    append: '.post',
    history: false,
  });
});

// var infiniteScroll = new InfiniteScroll('.container', {
//   initialize: function () {
//     document.addEventListener("scroll", this.handleScroll);
//     this.loadStuff('data.json');
//   },

//   handleScroll: function () {

//     if (document.getElementById("content").scrollTop + parseInt(document.getElementById("content").style.height, 10) >= document.getElementById("products").scrollHeight) {
//       //logic when user has scrolled to the bottom of the page
//       ++infiniteScroll.data.currentPage;
//       infiniteScroll.loadStuff('data.json');
//     }
//   }
// })
