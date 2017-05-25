/**
 * Created by Martin on 5/26/2017.
 */
/**
 * TODO add documentation
 * example usage <div class="shakable"></div>
 * */

var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
$('.shakable').click(function () {
  $(this).addClass('shake wrongAlert');
  $(this).one(animationEvent, function(event) {
    $(this).removeClass('shake')
  });
});