/**
 * Created by king on 2017/1/11.
 */
$(function(){
    /*var username2 =  $('#di1').find('[name="username"]').val();
    var sjh = /^1[34578]\d{9}$/
    $('#di1').find('input').on('keyup',function (e) {
        var event = event|| window.event;
        if(event.keyCode == 13){
            if(username2 === ''){
                $('.nb').show();
                $(".vv").html("用户名不能为空");
                return false;
            }
             if(!(sjh.test(username2))){
                 //$('.nb').hide();
                $('.nb1').show();
                $(".vv1").html("符合条件");
            }
        }
    });

    $('#bb').find('button').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $('#di1').find('[name="username"]').val(),
                password: $('#di2').find('[name="password"]').val(),
                repassword: $('#dis').find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function (result) {
                //console.log(result);
                $('.www').show();
                $('.war').html(result.message);
                if(!result.code){
                    setTimeout(function () {
                        $('.ccx').show();
                        $('.bgiframe').hide();
                    },1000);
                }
            }
        });
    });*/
    /*登录*/
/*
    $('#bb1').find('button').on('click', function () {
        $.ajax({

            type: 'post',
            url: '/api/user/login',
            data: {
                username: $('#di3').find('[name="username"]').val(),
                password: $('#di4').find( '[name="password"]').val()
            },
            dataType: 'json',
            success: function (result) {
                //console.log(result);
                $('.war1').html(result.message);
                if(!result.code){
                    setTimeout(function() {
                        window.location.href='/';
                       // $('.user').find('.username').html(result.userInfo.username);
                    },1000);
                }
            }
        });
    });
*/
    var handler2 = function (captchaObj) {
        $("#submit").click(function (e) {
            var result = captchaObj.getValidate();
            if (!result) {
                $("#notice2").show();
                setTimeout(function () {
                    $("#notice2").hide();
                }, 2000);
            } else {
                $.ajax({
                    url: '/api/user/register',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val(),
                        repassword: $('#repassword').val(),
                    },
                    success: function (data) {
                        $('.www').show();
                        $('.war').html(data.message);
                        if(!data.code){
                            setTimeout(function () {
                                window.location.href='/api';
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
})