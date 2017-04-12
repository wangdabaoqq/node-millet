
/**
 * Created by king on 2017/4/9.
 */
$('.user').mouseover(function () {
    $('#mm').slideDown('slow');
    $('.user').addClass(' user-active');
});
$('.user').mouseleave(function () {
    $('#mm').slideUp('slow');
    $('.user').removeClass(' user-active');
});

$('#logout').on('click',function () {
    $.ajax({
        url:'/api/user/logout',
        success:function (result) {
            if(!result.code){
                window.location.reload();
            }
        }
    })
})