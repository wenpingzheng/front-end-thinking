// 如何高效遍历一个数组
const items = [1, 2, 3]
// 下面方法不推荐
for(let i = 0, len=items.length;i<len;i++) {
  console.log(items[i])
}
items.map((item,i) => {
  console.log(item)
})
// 还有foreach等方法都不推荐使用
// 推荐使用for of
for(let item of items) {
  console.log(item)
}

JavaScript中变量命名的几个规则
1. 标准变量采用驼峰命名
2. 常量使用全大写形式命名，并用下画线连接
3. 构造函数首字母大写
4. jQuery对象推荐以"$"为开头命名，便于分辨jQuery对象与普通对象。

// 先来看几个不推荐的写法
let max_number = 88;
let body = $('body');
let obj_name;
function person(name) {
  this.name = name;
}
// 接下来看一下正确的命名
const MAX_NUMBER = 88;
const $body = $('body');
let objName;
function Person(name) {
  this.name = name;
}


// 如何将一个多维数组扁平化
let originArray = [];
originArray[0] = ['1', '2'];
originArray[1] = ['3', '4'];
originArray[2] = ['5', '6'];
// 接下来扁平化上面这个数组
let newArray = originArray[0].concat(originArray[1], originArray[2]);
// 打印出来的结果是
['1', '2', '3', '4', '5', '6']

// 数组的拷贝
const items = [1, 2, 3];
let itemsCopy = [];
// 不推荐
for(let i = 0;len = items.length;i<len;i++) {
  itemsCopy[i] = items[i]
}
// 推荐
itemsCopy = [...items]























