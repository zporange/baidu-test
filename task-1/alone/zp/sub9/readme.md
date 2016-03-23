# HTML/CSS实现一个复杂的页面

* H5新属性 input type = date 定义日期字段（带有 calendar 控件）
* 在父元素上设置了background-color,而又需要在子元素上设置background透明背景图的时候，注意父元素的background-color一定要大于子元素的优先级，可以加重选择器的标签级别，也可以直接在父元素上设置!improtent(在用LESS的选择器的时候比较方便)
* 设置inline-block,元素之间会产生一定的缝隙
    * 产生的原因：HTML中的换行符、空格符、制表符等产生了空白符，而这些归根结底都是字符，那么它们的大小都是 受 font-size来控制的，字体大小直接导致 inline 或者 inline-block后元素之间空隙的大小
    * 可以直接父亲元素上设置font-size:0,子元素再重设字体大小,但只能特殊情况使用（父元素不需要设置字体大小的时候）
    * 相邻元素HTML标签头尾相接
    * 换行用`<!---->`
    * 设置负margin(当你不需要设置margin的时候)
    * 对于大块的布局用了inline-block,会因每个块里面的元素不一样产生错位等情况，可以使用vertical-align(top,middle,bottom)等设置所有块保持在同一水平位置（大面积上布局用浮动更好控制）
      > 布局上最好不用inline-block,因为很难控制他们之间的缝隙问题，可能导致布局的错乱。（使用float,再清除浮动,更方便）
clearfix:after{content:"";display:block;clear:both;}

*今天看了篇关于移动端布局抛弃了float,而选用inline-block*
*移动端目前还没有接触，对于inline-block的用法还有待深入了解，单就PC端来看，还是使用float更方便*

* 子元素固定到特定的位置(可以结合使用)
 *  可以用margin,padding
 * 平移X,Y：transform:translateY(50%)(接受百分比,PX)
 * 父亲元素设置position:relative,子元素设置absolute(top,right,bottom,left)
 * 垂直居中：可以设置块元素为display-inline,line-heiht=父元素高度,vertical-align:middle;
 * 水平居中：text-align: center; 
* body第二行遇到边框问题，外层容器需要设置1px的边框，当hover时要出现3px边框，元素hover前后高度不一至导致会出现动态，解决办法
 * 外层容器hover前后高度统一如hover前，元素高62，上边框1，总高63。hover后，容器变为60，上边框为3，总高63。
 * 还有个关键问题是我内部的P元素设置了10px的padding,父容器hover后也必须要减两2PX，不然还是会动
* rem 是相对于根节点来设置的单位
    * 在body第二行的橙色字体设置1.05em相对于HTML的20PX，这里的字体是21PX
* outline:none,去除input,button等获得焦点后的默认效果
* appearance: none;去除默认样式
* input做为单选框type="radio",当设置多个name相同的input,在不使用JS的情况下可模拟tab切换效果(一般情况下用不着，只是多条思路)
    * 先要设置input隐藏，把label绑定在input上
    * 对label设置样式
* input美化复选框checkbox(IE9以上支持)[更多样式](http://www.jq22.com/jquery-info271)
 复选框定义id#checkbox1，然后使用label的for属性与之关联，点击label的时候，实际上就相当于点击了#checkbox1

 > input type="checkbox" name="ckbox" id="ckbox1" checked="checked">
< label for="ckbox1">< label>
\# checkbox1 {
    display: none;
}
\# checkbox1 + label { 
    color: red;
}
 \# checkbox1:checked + label {
    color: blue;
    }
通过label和checkbox，我们可以将checkbox隐藏，而将label制作为各种漂亮超酷的复选框样式。我们可以使用:before和:after伪元素来制作各种效果，如滑动按钮的效果。这些效果都可以通过相邻兄弟选择器来选择与checkbox相邻的label来实现


* 当tab选项和下方内容的边框叠加在一起的时候，使用transform:translateY(1px)1px是内容边框宽度（位移遮挡）
* button放在form里面点击的时候会跳到页面顶部
* 做日历的时候最开始只用一个table来做，结果发现有问题，在thead上要设置border-top/bottom,表格样式必须设置为`border-collapse: collapse;`否则会有缝隙，然而在做tbody的时候，也会有个边框要设置，这时候因为设置了border-collapse: collapse;导致现在边框会塌陷。直接在tbody的tr上设置border得不到想要的效果了，要么在tr内部再给个div包裹一下，然后在div上设置margin+border，要么一开始布局的时候就别把所有东西塞一个table里面