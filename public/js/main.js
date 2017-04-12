requirejs.config({

    shim: {
        'register': ['jquery'],
        'lazyload': ['jquery'],
        'bootstrap': ['jquery'],
        'move':['jquery']
    },
    paths : {
        'jquery' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.min',
        'bootstrap' : 'https://cdn.bootcss.com/bootstrap/3.0.3/js/bootstrap.min',
        'lazyload':'https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
    'move':'move'
    }
});
require([ 'jquery', 'bootstrap','lazyload','move'],
    function($) {
    $("img").lazyload({
        skip_invisible : false,
        effect : "fadeIn",
        failure_limit : 10
    });
    });