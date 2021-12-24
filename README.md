# AniScroll
 Play an animation when whell scrolls.

在滚动滚轮时让元素滑动

## 使用方法

```js
let ani = new AniScroll();
ani.init(500);//动画的间隔是500ms
ani.addElementController('testElement1', 0, 0.7);
//   参数：
//1  选择的元素id，
//2  开始播放动画时已经移动的滚轮距离（0意为一移动滚轮就开始），
//3  移速
```

