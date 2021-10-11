window.onload = function () {
    //碎片大盒子
    var bigBox = document.querySelector(".bigBoxOfFragments");
    //默认难度
    var difficulty = 3;
    // 空白盒子
    var blankDiv;
    //随机数组
    var arr = [];
    // 小盒子的宽
    var chWidth;
    // 小盒子的高
    var chHigh;
    // 获取所有孩子
    var child;
    //空白盒子的位置
    var blankPositionX;
    var blankPositionY;
    // 按钮
    var but = document.querySelectorAll("button");
    // 示例图片
    var example = document.querySelector(".example");
    // 默认照片
    var imgSrc = "./img/bg.jpg";
    //步数div
    var stepCount = document.querySelector(".stepCount");
    var stepNum = 0;
    //创建元素
    function createElement(num) {
        for (var i = 0; i < num * num; i++) {
            var div = document.createElement("div");
            bigBox.appendChild(div);
            div.style.backgroundImage = `url(${imgSrc})`;
            div.style.width = bigBox.offsetWidth / num + "px";
            div.style.height = bigBox.offsetHeight / num + "px";
            div.style.left = i % num * div.offsetWidth + "px";
            div.style.top = Math.floor(i / num) * div.offsetHeight + "px";
            div.style.backgroundPositionX = -i % num * div.offsetWidth + "px";
            div.style.backgroundPositionY = -Math.floor(i / num) * div.offsetHeight + "px";
        }
        example.src = `${imgSrc}`;
        // 所有的小盒子
        child = bigBox.children;

        // 每次创建完之后都要获取一个空白盒子，并且设置他 
        blankDiv = child[child.length - 1]
        blankDiv.classList.add("atLast");
        //空白盒子的位置
        blankPositionX = blankDiv.offsetLeft;
        blankPositionY = blankDiv.offsetTop;
        //小盒子的宽高
        chWidth = blankDiv.offsetWidth;
        chHigh = blankDiv.offsetHeight

    }
    // 打乱顺序
    function upset() {
        arr = [];
        while (arr.length < difficulty * difficulty - 1) {
            var randomNum = Math.floor(Math.random() * (difficulty * difficulty - 1))
            if (arr.indexOf(randomNum) == -1) {
                arr.push(randomNum)
            }
        }
        for (var i = 0; i < child.length - 1; i++) {
            child[arr[i]].style.top = Math.floor(i / difficulty) * chWidth + "px";
            child[arr[i]].style.left = i % difficulty * chHigh + "px";
        }
    }
    //点击事件
    function click() {
        for (var i = 0; i < child.length - 1; i++) {
            child[i].onclick = function () {
                //空白盒子的位置
                blankPositionX = blankDiv.offsetLeft;
                blankPositionY = blankDiv.offsetTop;
                // 当前点击盒子的位置
                var thisPositionX = this.offsetLeft;
                var thisPositionY = this.offsetTop;
                if (Math.abs(thisPositionY - blankPositionY) < 2 && Math.abs(Math.abs(blankPositionX - thisPositionX) - chWidth) < 2) {
                    var replace = blankPositionX;
                    blankDiv.style.left = thisPositionX + "px";
                    this.style.left = replace + "px";
                    //步数
                    stepNum++
                    stepCount.innerText = stepNum;

                } else if (Math.abs(thisPositionX - blankPositionX) < 2 && Math.abs(Math.abs(blankPositionY - thisPositionY) - chHigh) < 2) {
                    var replace = blankPositionY;
                    blankDiv.style.top = thisPositionY + "px";
                    this.style.top = replace + "px";
                    //步数
                    stepNum++
                    stepCount.innerText = stepNum;
                }
                //判断是否过关
                var flag = 1;
                for (var j = 0; j < child.length - 1; j++) {
                    if (child[j].offsetTop == Math.floor(j / difficulty) * chWidth && child[j].offsetLeft == j % difficulty * chHigh) {
                    } else {
                        flag = 0
                    }
                }
                if (flag == 1) {
                    stepCount.innerText = `游戏完成一共用了${stepNum}步,请重新开始游戏`;
                }
            }
        }
    }
    // 总
    function total() {
        // 创建
        createElement(difficulty)
        // 打乱
        upset();
        //点击
        click()
    }
    total()
    // // 选择难度
    var select = document.querySelector("select");
    var option = select.children;
    select.onchange = function (e) {
        bigBox.innerHTML = ""
        difficulty = +option[e.target.selectedIndex].innerHTML;
        total()
        stepNum = 0;
        stepCount.innerText = stepNum;
    };
    // 重新开始
    but[0].onclick = function () {
        bigBox.innerHTML = ""
        arr = [];
        stepNum = 0;
        stepCount.innerText = stepNum;
        total()
    }
    // 一键通关
    but[1].onclick = function () {
        for (var i = 0; i < child.length; i++) {
            child[i].style.top = Math.floor(i / difficulty) * chHigh + "px"
            child[i].style.left = i % difficulty * chWidth + "px"
        }
        arr = [];
        stepNum = 0;
        stepCount.innerText = stepNum;
    }
    //更换图片
    var switchPictureImg = document.querySelectorAll(".switchPicture img");
    for (var i = 0; i < switchPictureImg.length; i++) {
        switchPictureImg[i].onclick = function () {
            imgSrc = this.src;
            bigBox.innerHTML = ""
            arr = []
            total()
            stepNum = 0;
            stepCount.innerText = stepNum;
            example.src = imgSrc;
            for (var j = 0; j < child.length - 1; j++) {
                child[j].style.backgroundImage = `url(${imgSrc})`
            }
        }
    }
}