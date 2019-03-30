var oPrev=document.getElementById("prev");
    oNext=document.getElementById("next");
    oMain=document.getElementsByClassName("main")[0];
    var timer ,timer2;
    oList=document.getElementsByClassName("list")[0];
    oLi=document.getElementsByTagName("li");
    index=0;
    flag=true;
    ocontainer=document.getElementsByClassName("container")[0];
    function moveImg(dis) {//因为有时候需要跳跃索引，所以不能固定520的值，需要用一个形参来代表
        flag=false;
        var time =400;//每次轮播需要的时间
        var eachTime=20;//每一小次移动的时间
        var eachDis=dis/(time/eachTime);//每一小次移动的距离
        var newLeft=oMain.offsetLeft + dis;//获取移动下一步的目标点也就是距离
        function eachMove(){
            if (dis>0 && oMain.offsetLeft < newLeft || dis<0 && oMain.offsetLeft > newLeft ){
                oMain.style.left=oMain.offsetLeft + eachDis +"px";//移动的距离等于当前的位置加上每一小次移动的距离
            }
            else {
                clearInterval(timer);
                oMain.style.left=newLeft + "px";//清除计时器之后把图片返回目标点上
                if(newLeft == -3120){
                    oMain.style.left=-520 + "px";//如果移动距离到达-3120时，跳转到第一张图片
                }
                if(newLeft == 0){
                    oMain.style.left=-2600 + "px";//如果移动距离到达0时，跳转到第五张图片
                }
                flag=true;
            }
        }

        timer=setInterval(eachMove,eachTime);
    }

    oPrev.onclick=function () {
        if(flag==false) return;
        moveImg(520); if(index==0){
            index=4;
        }else {
            index--;
        }

        oListyle();
    };
    oNext.onclick=function () {
        if(flag==false) return;
    moveImg(-520);
        if(index==4){
            index=0;
        }else {
            index++;
        }

        oListyle();
};
    function oListyle() {
        oList.getElementsByClassName("active")[0].className="";
        oLi[index].className="active";
    }
    for (var i=0;i<oLi.length;i++){
        (function (j) {
            oLi[j].onclick=function () {
                var offet=(j-index) * -520;
                index=j;
                moveImg(offet);
                oListyle();
            }
        }(i))
    }
    timer2=setInterval(oNext.onclick,2000);
    ocontainer.onmouseover = function () {
    clearInterval(timer2);
};
    ocontainer.onmouseout = function () {
    timer2=setInterval(oNext.onclick,2000);
}