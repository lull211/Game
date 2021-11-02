var sw = 20,       //一个方块的宽
    sh = 20,       //一个方块的高
    tr = 30,       //行数
    td = 30;       //列数
var snake = null,   //蛇的实例
    food = null;          //食物的实例
    game = null;



//方块构造函数
function Square(x,y,classname){   //这个classname是不能大写的，className表示对象身上的属性，不能用来表示参数
    this.x=x*sw;
    this.y=y*sh;
    this.class=classname;
    this.viewContent=document.createElement('div');  //方块对应的DOM元素
    this.viewContent.className=this.class;
    this.parent=document.getElementById('snakeWrap');  //方块的父级
};
//创建方块,并添加到页面里
Square.prototype.create=function(){ 
    this.viewContent.style.position='absolute';
    this.viewContent.style.width=sw+'px';
    this.viewContent.style.height=sh+'px';
    this.viewContent.style.left=this.x+'px';
    this.viewContent.style.top=this.y+'px';
    this.parent.appendChild(this.viewContent)
};

//移除方块
Square.prototype.remove=function(){
    this.parent.removeChild(this.viewContent);
};
//蛇
function Snake(){
    this.head=null;
    this.tail=null;  
    this.pos=[];  //存储蛇身上每一个方块的位置
    this.directionNum={         //存储蛇走的方向，用一个对象来存储 
        left:{      //创造一个对象
            x:-1,
            y:0,
            rotate:180     //CSS3里，蛇头往左边走调转180度

        },
        right:{
            x:1,
            y:0,
            rotate:0
        },
        up:{
            x:0,
            y:-1,
            rotate:-90,   //顺时针为正逆时针为负
        },
        down:{
            x:0,
            y:1,
            rotate:90,
        }

    }
};
//init 一般是用来初始化的
Snake.prototype.init=function(){
    //创建蛇头
    var snakeHead=new Square(2,0,'snakeHead');
    snakeHead.create();
    this.head=snakeHead;    //存储蛇头信息
    this.pos.push([2,0]);  //把蛇头的位置存起来

    //创建蛇身体1
    var snakeBody1=new Square (1,0,'snakeBody');
    snakeBody1.create();
    this.pos.push([1,0]);  //把蛇身体的位置存一下
    //创建蛇身体2
    var snakeBody2=new Square (0,0,'snakeBody');
    snakeBody2.create();
    this.tail=snakeBody2;  //把蛇尾的信息更新一下
    this.pos.push([0,0]);  //把蛇身体的位置存一下

    //形成链表关系
    snakeHead.last=null;  //新蛇头
    snakeHead.next=snakeBody1;

    snakeBody1.last=snakeHead;  //新蛇身
    snakeBody1.next=snakeBody2;

    snakeBody2.last=snakeBody1;  //新蛇尾
    snakeBody2.next=null;
    //给蛇添加一条属性，，用来表示走的方向
    this.direction=this.directionNum.right;  //默认情况下向右走
};

//用来获取蛇头下一个位置对应的元素，根据元素来做不同的事情
Snake.prototype.getNextPos = function () {
    var nextPos = [                           //用一个数组来计算,蛇头要走的下一个坐标
        this.head.x / sw + this.direction.x,
        this.head.y / sh + this.direction.y
    ]

    //下个点是自己，代表撞到了自己，游戏结束,  在this.pos【】里面找坐标，如果找到相同的坐标，就证明怼到了自己
    var selfCollied = false;
    this.pos.forEach(function (value) {          //如果数组中的两个数据都相等，就说明下一个点在蛇的身上
        if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
            selfCollied = true;
        }

    });
    if (selfCollied) {
        alert('撞到自己了！你的得分为：'+game.score);
        this.strategies.die.call(this);
        return;     //结束判断，返回值，避免继续往下走继续往下判断，避免代码冗长效率低下
    }

    //下个点是墙，游戏结束
    if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1) {
        alert('撞墙了！你的得分为：'+game.score);
        this.strategies.die.call(this);
        return;
    }
    //下个点是苹果 ，吃
    if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {   //有时候刷新的是时候食物并没有
        this.strategies.eat.call(this);
    }
    //下个点什么也没有，走  ,除了上述条件外
    this.strategies.move.call(this);
};

//处理碰撞后要发生的事
Snake.prototype.strategies = {
    move: function (format) {   //format参数用于决定要不要删除方块
        //创建新身体
        var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody');
        //更新链表的关系
        newBody.next = this.head.next;  //head的下一个是newBody的下一个  ，故而言之用newBody替换了原来蛇头的位置，用原来body1的位置来相对对newBody定位
        newBody.next.last = newBody;
        newBody.last = null;
        this.head.remove();
        newBody.create();
        //创建一个蛇头  （蛇头要走的下一个点为nextPos)
        var newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snakeHead');
        newHead.create();
        //更新链表的关系
        newHead.next = newBody;
        newBody.last = null;
        newBody.last = newHead;
        newBody.next.className='snakeBody2';
        newHead.viewContent.style.transform='rotate( '+this.direction.rotate+'deg)';   //newHead的DOM对象在viewContent上，不能直接newHead.style
        //蛇身上的坐标位置也要更新
        this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y])
        this.head = newHead;  //还要把this.head的信息更新一下


        if (!format) {    //如果format的值为false,表示要删除（除了吃之外的操作）
            this.tail.remove();
            this.tail = this.tail.last;
            this.pos.pop();  //pop删除数组最后一位
        }
    },
    eat: function () {
        this.strategies.move.call(this, true);
        createFood();   //吃了之后重新创一个食物方块，creatFood方法里有存储食物方块信息
        game.score++;
    },
    die: function () {
        game.over();
    }

}
snake=new Snake();


//创建食物方块，比较食物与蛇的关系
function createFood() {
    var x = null;
    var y = null;           //食物小方块的随机坐标
    var include = true;   //循环跳出的条件 ，true表示事物的坐标在蛇身上，false表示食物的坐标不在蛇身上
    while (include) {
        x = Math.round(Math.random() * (td - 1));  //产生一个从0到29的随机数
        y = Math.round(Math.random() * (tr - 1));
        snake.pos.forEach(function (value) {
            if (x != value[0] && y != value[1]) {
                include = false;     //这个条件成立说明随机出来的这个坐标，不在蛇身上
            }
        });
    }
    food = new Square(x, y, 'food');    //创建一个新方块
    food.pos=[x,y];  //存储一下生成食物的坐标，用于跟蛇头要走的下一个点做对比
    var foodDom=document.querySelector('.food');
    if (foodDom){
        foodDom.style.left=x*sw+'px';
        foodDom.style.top=y*sh+'px';
    } else {
        food.create();//将新方块放在页面里
    } 
}

//创建游戏逻辑
function Game(){
    this.timer=null;
    this.score=0;
}
Game.prototype.init = function () {
    snake.init();
    // snake.getNextPos(); 
    createFood();      //创建食物方块
    document.onkeydown=function(ev){
        if(ev.which ==37 && snake.direction!=snake.directionNum.right){       //onkeydowm.which的值为37，为键盘左键  ,同时蛇往右边走的时候不能直接往左边走
            snake.direction=snake.directionNum.left;   
        }else if((ev.which ==38 && snake.direction!=snake.directionNum.down)){
            snake.direction=snake.directionNum.up; 
        }else if((ev.which ==39 && snake.direction!=snake.directionNum.left)){
            snake.direction=snake.directionNum.right;  
        }else if((ev.which ==40 && snake.direction!=snake.directionNum.up)){  //左键37 上键38 右键39 下键40
            snake.direction=snake.directionNum.down; 
        }
    }
    this.start();
}
//开始游戏
Game.prototype.start=function(){
    this.timer=setInterval(function(){
        snake.getNextPos();
    },100);    //定时器，200毫秒
}
Game.prototype.pause=function(){
    clearInterval(this.timer);
}
game=new Game();
var startBtn=document.querySelector('.startBtn button');
startBtn.onclick=function(){
    startBtn.parentNode.style.display='none';
     game.init();
}
//结束游戏 
Game.prototype.over=function(){
    clearInterval(this.timer);
    //游戏回到初始状态
    var snakeWrap=document.getElementById('snakeWrap');
    snakeWrap.innerHTML='';
    snake=new Snake();
    game=new Game();
    var startBtnWrap=document.querySelector('.startBtn');
    startBtnWrap.style.display='block';
}
//暂停游戏功能
var snakeWrap=document.getElementById('snakeWrap');
var pauseBtn=document.querySelector('.pauseBtn button');
snakeWrap.onclick=function(){
    game.pause();
    pauseBtn.parentNode.style.display='block';
}
pauseBtn.onclick=function(){
    game.start();
    pauseBtn.parentNode.style.display='none';

}