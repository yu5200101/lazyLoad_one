var imgBox = document.getElementById('imgBox'),
    curImg = imgBox.getElementsByTagName('img')[0];

function computed() {
    if(imgBox.myIsLoad) return;//=>已经处理过了就没必要重复处理了
    var A = utils.offset(imgBox).top + imgBox.offsetHeight,
        B = utils.winBox('clientHeight') + utils.winBox('scrollTop');
    if(A <= B){
        imgBox.myIsLoad = true;//=>条件第一次符合，我们已经开始加载真实的图片了，不管条件是否加载完成，都给当前盒子记录一个自定义属性存储一个值：代表当前图片已经处理过了，以后在符合条件的时候，没不要再重复处理了
        //=>加载真实的图片
        /*var trueImg = curImg.getAttribute('data-img');
        curImg.src = trueImg;
        utils.css(curImg,'display','block');*/
        //=>以上实现真实图片加载的方法有问题：如果真实图片是不存在的地址，我们用上述方式加载原有图片展示了，但是展示的都是xx或者alt值
        //=>解决办法：真实图片加载的时候，先不要操作原始img标签（操作原始Img标签肯定会导致页面中的内容跟着变化或者渲染）我们操作临时创建的标签，当能正常的加载成功我们再操作原始的标签
        var tempImg = new Image();
        tempImg.src = curImg.getAttribute('data-img');
        tempImg.onload = function () {
            //=>证明图片可以正常加载，（onerror证明图片无法正常加载）
            curImg.src = this.src;
            curImg.style.display = 'block';
            tempImg = null;
        };

    }
}
computed();
window.onscroll = computed;