function Mine(tr, td, mineNum) {
    this.tr = tr; //行数
    this.td = td; //列数
    this.mineNum = mineNum; //雷数

    this.squares = []; //存储所d点方块的信息，他是一个二维数组，安行与列的顺序排放，存取都使用行列的形式
    this.tds = []; // 存储所有的单元格的DOM
    this.surpluseMine = mineNum; //剩余雷的数量
    this.allRight = false; //右击游标的小红旗是否全是雷，判断用户是否游戏成功

    this.parent = document.querySelector('.gameBox');

}
//生成N个不重复的随机数
Mine.prototype.randomNum = function () {
    var square = new Array(this.tr * this.td); //生成一个空数组，但是有长度，长度为格子的总数
    for (var i = 0; i < square.length; i++) {
        square[i] = i;
    }
    square.sort(function () { return 0.5 - Math.random() });
    return square.slice(0, this.mineNum);
}
//雷
Mine.prototype.init = function () {

    var rn = this.randomNum(); //雷的位置
    var n = 0;  //用来找到格子的索引
    for (var i = 0; i < this.tr; i++) {
        this.squares[i] = [];
        for (var j = 0; j < this.td; j++) {
            // this.squares[i][j]=;
            //取一个方块在数组里的数据要使用行与列的形式去取。找方块周围的方块的时候要用坐标的形式去取。行与列的形式跟xy形式刚好相反
            if (rn.indexOf(++n) != -1) {
                this.squares[i][j] = { type: 'mine', x: j, y: i };
            } else {
                this.squares[i][j] = { type: 'number', x: j, y: i, value: 0 }
            }

        }
    }
    this.parent.oncontextmenu=function(){
        return false;     //阻止右键菜单出来
    }
    this.updateNum();
    this.createDom();

    this.mineNumDom=document.querySelector('.mineNum');
    this.mineNumDom.innerHTML=this.surpluseMine;
};
//创建表格
Mine.prototype.createDom = function () {
    var This=this;
    var table = document.createElement('table');

    for (var i = 0; i < this.tr; i++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];

        for (var j = 0; j < this.td; j++) {
            var domTd = document.createElement('td');
            domTd.pos = [i,j];       //把格子对应的行列存到格子里，为了下面通过这个值取数组里取到对应的数据
            domTd.onmousedown=function(){
                This.play(event,this);    //This指的是实力的对象，this指的是点击的那个td

            };

            this.tds[i][j] = domTd; //这里是把所有创建的td添加到数组当中

            // if (this.squares[i][j].type == 'mine') {
            //     domTd.className = 'mine'
            // }
            // if (this.squares[i][j].type == 'number') {
            //     domTd.innerHTML = this.squares[i][j].value;

            // }
           
            domTr.appendChild(domTd);

        }
        table.appendChild(domTr);
    }
    this.parent.innerHTML='';    //避免多次点击创建多个
    this.parent.appendChild(table);
};
//找个格子周围的8个方格
Mine.prototype.getAround = function (square) {  //square是雷的位置，squares是所有方块的信息。
    var x = square.x;
    var y = square.y;
    var result = [];   //把找到的格子的坐标返回出去（二维数组）

    //通过雷的坐标来循环九宫格                         //  x-1,y-1   x,y-1   x+1,y-1
    for (var i = x - 1; i <= x + 1; i++) {         //  x-1,y     x,y     x+1,y
        for (var j = y - 1; j <= y + 1; j++) {     //  x-1,y-1   x,y     x+1,y+1
            if (
                i < 0 ||           //格子超出左边的范围                 
                j < 0 ||           //格子超出上边的范围                 
                i > this.td - 1 ||     //格子超出右边的范围             
                j > this.tr - 1 ||     //格子超出下边的范围
                (i == x && j == y) ||  //当前循环到自己
                this.squares[j][i].type == 'mine'     //周围的格子是个雷
            ) {
                continue;
            }
            result.push([j,i]);   //要以行和列的形式返回出去
        }
    }
    return result;
}
//更新所有的数字
Mine.prototype.updateNum = function () {
    for (var i = 0; i < this.tr; i++) {
        for (var j = 0; j < this.td; j++) {
            //只更新雷周围的数字
            if (this.squares[i][j].type == 'number') {
                continue;
            }
            var num = this.getAround(this.squares[i][j]);  //获取到每一个雷周围的数字 
            for (var k = 0; k < num.length; k++) {
                //num[i] == [0,1]
                //num[i] == 0
                //num[i] == 1
                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }

}
Mine.prototype.play = function (ev, obj) {
    var This = this;
    var curSquare = this.squares[obj.pos[0]][obj.pos[1]];     //点击的那个格子成为对象，用curSquare来存起来
    if (ev.which == 1 && obj.className!='flag') {
       
        console.log(curSquare);
        var cl = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

        if (curSquare.type == 'number') {

            obj.innerHTML = curSquare.value;
            obj.className = cl[curSquare.value];

            if (curSquare.value == 0) {
                obj.innerHTML = '';

                function getAllzero(square) {
                    var around = This.getAround(square);  //找到了周围的格子

                    for (var i = 0; i < around.length; i++) {
                        var x = around[i][0];   //行
                        var y = around[i][1];   //列
                        This.tds[x][y].className = cl[This.squares[x][y].value];
                        if (This.squares[x][y].value == 0) {
                            if (!This.tds[x][y].chack) {
                                This.tds[x][y].chack = true;     //给对应的td添加一个属性，这条属性用于决定这个个格子有没有被找过，如果有被找过，他的值就为true,就不会被找了
                                getAllzero(This.squares[x][y]);
                            }
                        } else {
                            //如果以某个格子为中心找到的四周的格子的值不为0，那就把数字显示出来
                            This.tds[x][y].innerHTML = This.squares[x][y].value;
                        }
                    }
                }
                getAllzero(curSquare);
            }

        } else {

            //游戏失败的函数
            Mine.prototype.gameOver = function (clickTd) {
                for (var i = 0; i < this.tr; i++) {
                    for (var j = 0; j < this.td; j++) {
                        if (this.squares[i][j].type == 'mine') {
                            this.tds[i][j].className = 'mine';
                        }
                        this.tds[i][j].onmousedown = null;
                    }
                }
                if (clickTd) {
                    clickTd.style.backgroundColor = '#f00';
                }
            }

            this.gameOver(obj);
        }
    }
    if(ev.which==3){
        //如果右击的是一个数字，就不能点击
        if(obj.className && obj.className!='flag'){
            return;
        }
        obj.className=obj.className=='flag'?'':'flag'; //三目运算符，判断className是否等于flag,如果是flag则变为‘’空，如果不等于flag则变为‘flag’
        if(this.squares[obj.pos[0]][obj.pos[1]].type=='mine'){
            this.allRight=true; //用户标的小红旗都是雷
        }else{
            this.allRight=false;
        }
        if(obj.className=='flag'){
            this.mineNumDom.innerHTML=--this.surpluseMine;
        }else{
            this.mineNumDom.innerHTML=++this.surpluseMine;
        }
        if(this.surpluseMine==0){
            if(this.allRight){
                alert('恭喜你游戏通过！');
            }else{
                alert('很遗憾，游戏失败~');
            }
        }
    }
};
var btns = document.querySelectorAll('.level button');
var mine = null;    //用来存当前生成的实例
var ln = 0;        //用来处理当前选中的状态
var arr = [[9,9,10],[16, 16, 40], [28, 28, 99]];//不同级别的行数列数和雷数
for (let i = 0; i < btns.length - 1; i++) {
    btns[i].onclick = function () {
        btns[ln].className = '';
        this.className = 'active';
        mine = new Mine(...arr[i]);  //es6里，...arr[i]可以把数组里的所有子元素都取出来，用来代替arr[i][0],arr[i][1],arr[i][2]
        mine.init();
        ln = i;
    }
}
btns[0].onclick();
btns[3].onclick = function () {
    mine.init();
}


// var mine = new Mine(28, 28, 99);
// mine.init();

//console.log(mine.getAround(mine.squares[0][0]));