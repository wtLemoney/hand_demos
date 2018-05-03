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