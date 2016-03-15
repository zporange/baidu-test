* 写代码之前先细心分析页面大体结构，记得标注

## 第一部分

* a 链接的target的属性值 "_blank" ,表示打开页面在新窗口中
* a 链接href的属性给 "javascript:;" ,点击窗口不会跳动，写一些案例的时候可以用
* b 和 strong 都是用于加粗，strong 能得到SEO的重视
* br 换行，尽量少用
* div 和 span 是 html 中最没有语义化的标签

## 第二部分

* dl 标签用于结合 dt (定义列表中的项目)和 dd (描述列表中的项目)
* 关于 ul、 dl 、ol
 
1 . ul 是无序列表，也就是说没有排列限制可以随意加 li ； 
```
<ul> 
<li>可以随意放置</li> 
<li>可以随意放置</li> 
<li>可以随意放置</li> 
</ul> 
.可以随意放置 
.可以随意放置 
.可以随意放置 
```
2 . ol 就序列表，会按照你写的 li 前后依次排列；
 
``` 
<ol> 
<li>我是第一</li> 
<li>我是第二</li> 
<li>我是第三</li> 
</ol> 
1.我是第一 
2.我是第二 
3.我是第三 
```
3 . dl 是定义列表，会默认前后层级关系； 

```
<dl> 
<dt>我是头</dt> 
<dd>我是内容</dd> 
<dd>我是内容</dd> 
</dl> 
我是头 
--我是内容 
--我是内容
```

## 第三部分

* table 加上caption对SEO更友好
* table 只能有一个thead和tfoot但可以有多个tbody
* table align排列：可设置内容左、右、居中对齐，以父元素为参照
* table colspan合并：多个单元格合并

## 表单部分

* Label 中有两个属性是非常有用的,一个是FOR、另外一个就是ACCESSKEY了。
``` 
FOR属性 
   功能：表示Label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。 
   用法：<Label FOR="InputBox">姓名</Label><input ID="InputBox" type="text"> 
ACCESSKEY属性： 
   功能：表示访问Label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。 
   用法：<Label FOR="InputBox" ACCESSKEY＝"N">姓名</Label><input ID="InputBox" type="text"> 
```
* textarea 多行文本框 cols(文本内的可见宽度) rows(文本内的可见行数)