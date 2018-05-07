# 练习前端技能的小demo

[1.纯CSS画大白](https://github.com/wtLemoney/hand_demos/tree/master/da_bai)

CSS的知识很多很零散，不经常使用的忘得更快，所以找了这么个小项目练习下CSS

[2.纯CSS按钮提示框](https://github.com/wtLemoney/hand_demos/tree/master/CSS_only_tooltips)

这个项目看似简单，有些关于动画特效的CSS属性还是值得多练手的，这个小项目主要用来了解CSS的预处理器SASS。

[3.别踩白块儿网页版游戏](https://github.com/wtLemoney/hand_demos/tree/master/white_block)

涉及js的DOM相关操作，是值得练手的好项目，在前人的基础上加了：
 - 添加开始游戏按钮
 - 使游戏结束后不能再点击黑块
 
后续：将游戏改写为 jQuery 版

[4.网页版拼图游戏](https://github.com/wtLemoney/hand_demos/tree/master/puzzle)

这个九宫格游戏的玩法是：移动空格块旁边的方块，使得他们按照方块上面标的数字顺序排好。
适合刚学完前端基础的盆友练手。


此游戏存在一个bug：由于每次开始游戏或重来时，方块的顺序是随机打乱的，这样生成的方块有50%的几率是无法拼图成功的，这个时候只能点击“重来”。

可以考虑：按照人的方式随机去移动方块，而移动方块的代码已经写好了，直接调用就可以，所以只要自己编写一个函数，让方块移动几十步就可以打乱。而这种方式是一定可以拼回去的。


后续：当前的实现是基于鼠标点击的，添加键盘监听，让游戏使用方向键也能玩

[5.基于 HTML5 实现本地图片裁剪](https://github.com/wtLemoney/hand_demos/tree/master/image_cut)

HTML5 有很多好玩的特性，本实验利用 HTML5 的 canvas 技术，结合HTML5的 File API来实现图片的本地裁剪，从一个大图片中选取裁剪区域，然后再进行保存。从中学到了 HTML5 中图片处理的一些 API 以及 JavaScript 代码封装。

后续：考虑实现改变截图区域拖动框的大小。

[6.基于 HTML5 canvas 实现一个简单的小游戏](https://github.com/wtLemoney/hand_demos/blob/master/canvas_game/index.html)

本游戏demo的目的是熟悉canvas游戏开发，可以根据这个小练习，了解小游戏开发的流程，以一小块一小块的功能实现，由游戏体验还可以慢慢改进，得到最后的产品。

后续：hero角色的小人会通过按键移出背景图片外，可以设置人物活动边界。每一次hero捕获到monster，hero会回到画布中间，可以设置捕捉到monster的时候让hero就停留在捕获的位置，不再回到画布中央。