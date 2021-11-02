
var timer;
var per=0;


timer = setInterval(function () {
    $('.bar').css('width', per + '%');
    per += 1;
    if (per > 100) {
        $('.pageLoading').addClass('complete');
        setTimeout(function(){
         $('.monsterText').html('<h2>We are  <br>SQUARE <br>MOSTER!<br></h2>')   
        }, 2000);
        // setTimeout 是一个延时器
        clearInterval(timer);
    }
}, 30)