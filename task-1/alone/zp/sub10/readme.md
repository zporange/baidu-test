# 项目十，flex布局

* align-items（flex container）
> align-items: flex-start | flex-end | center | baseline | stretch

    * flex-start：伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。
    * flex-end：伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。
    * center：伸缩项目的外边距盒在该行的侧轴上居中放置。
    * baseline：伸缩项目根据他们的基线对齐。
    * stretch（默认值）：伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」属性的限制下尽可能接近所在行的尺寸。

* justify-content（flex container）
这个是用来定义伸缩项目沿着主轴线的对齐方式。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。
 * flex-start(默认值)：伸缩项目向一行的起始位置靠齐。
 * flex-end：伸缩项目向一行的结束位置靠齐。
 * center：伸缩项目向一行的中间位置靠齐。
 * space-between：伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置。
 * space-around：伸缩项目会平均地分布在行里，两端保留一半的空间。

* 媒体查询：@media all and (max-width:640px)
```
 @media all and (max-width:640px){  //and后面必须要有空格

  .container{
   align-items: flex-start;
    flex-wrap: wrap;
    
  }
  .item4{order:1;} //设置排列顺序
  .item1{order:2;}
  .item2{order:3;}
  .item3{order:4;}
}
```