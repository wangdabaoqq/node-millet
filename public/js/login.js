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

var handler2 = function (captchaObj) {

    $("#submitone").click(function (e) {
        var result = captchaObj.getValidate();
        if (!result) {
            $("#notice2").show();
            setTimeout(function () {
                $("#notice2").hide();
            }, 2000);
        } else {
            $.ajax({
                url: '/api/user/login',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: $('#username2').val(),
                    password: $('#password2').val(),
                },
                success: function (data) {
                    $('.www1').show();
                    $('.war1').html(data.message);
                    if(!data.code){
                        setTimeout(function() {
                            window.location.href='/';
                        },1000);
                    }

                }
            })
        }
        e.preventDefault();
    });
    // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
    captchaObj.appendTo("#captcha2");

    captchaObj.onReady(function () {
        $("#wait2").hide();
    });
};
$.ajax({
    url: "/gt/register2?t=" + (new Date()).getTime(), // 加随机数防止缓存
    type: "get",
    dataType: "json",
    success: function (data) {

        // 调用 initGeetest 初始化参数
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: "popup", // 产品形式，包括：float，popup
            width: "100%"

            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
        }, handler2);
    }
});

/*登录end*/