# cookie：
## 1.cookie的特点：
- cookie  不可跨域
- cookie  存储在浏览器中
- cookie  有数量与大小的限制
  - 数量在50个左右
  - 大小在4kb左右
- cookie的存储时间非常灵活，可以通过前端设置
- cookie不关可以在服务器设置，客户端（前端）也可以
## 2.cookie的属性
- name : cookie的名字，具有唯一性
- value ：    cookie的值
- domain :  设置cookie在哪个域下是有效的
- path :     cookie的路径
- expires :   cookie的过期时间 /GMT
- max-age :   cookie的有效期（时间段）
  - -1
  - 0
  - 正数
- HttpOnly :  有这个标记的cookie，前端是无法获取的
- Secure :    设置cookie只能有过https协议传输
- SameSite :  设置cookie在跨域请求的时候不能被发送
---
# localStorage和sessionStorage：
## 1.Web Storage 的大小有5Mb 包括：
- localStorage
- sessionStorage
##  2.localStorage和sessionStorage身上的一些方法：
- length   本地存储数据的数量
- key()    通过索引找到存储的数据
- getItem()    通过键名取到本地存储的数据
- setItem()    设置一个本地存储数据
- removeItem() 删除一个本地存储数据
- clear()      清空本地存储数据
## 3.localStorage存储对象的方法：
- 存对象时要用localStorage.setItem('color',JSON.stringfy(对象名))
- 取对象时要用JSON.parse((localStorage.getItem('对象名))
```
var color = ["red", "green"];   //"red", "green"
var color = { "c1": "red", "c2": "green" }  //[Object Object]
localStorage.setItem('color', JSON.stringify(color));
console.log(JSON.parse(localStorage.getItem('color'))); 
```
---
# Restful API 
- 是一种互联网软件架构的设计规范、设计指南、设计风格、设计原则
## 1.Restful API由下面几个部分组成：
1.  Resource 资源
  - URI：统一资源标识符，是一个字符串，用来表示互联网资源的名称
  - URL： 统一资源定位符，它是一种具体的URI
2. Representational 表现层
  -文本  text\html\xml\json\二进制
3. SateTransfer 状态转化
## 2.Restful API具体设计规范：
1. 协议：
- HTTPS
2. 域名：
- https://api.kaivon.com
- https://wwww.kaivon.com/api/
3. 版本
- https://api.kaivon.com/v1
4. 路径:
- https://api.kaivon.com/v1/blogs
5. 方法:
- GET 获取资源：
  - GET：https://api.kaivon.com/v1/blogs 获取所有的文章
  - GET https://api.kaivon.com/v1/blogs/**id**  获取到某一篇文章 ，要写上id
- POST  添加资源
  - POST https://api.kaivon.com/v1/blogs    增加一篇文章
- PUT 修改资源（客户端需要提供改变后的完整资源）
  - POST  https://api.kaivon.com/v1/blogs/id 修改某一篇文章
- PATCH 更新资源（客户端需要提供改变的属性）
  - PATCH https://api.kaivon.com/v1/blogs/id    更新某一篇文章
- DELETE 删除资源
  - DELETE https://api.kaivon.com/v1/blogs/id   删除某一篇文章
6. 数据过滤
- ?limit=10 指定返回数据的数量
 `GET https://api.kaivon.com/v1/blogs?limit=10`
- ?offset=10    指定一个偏移量
 `GET https://api.kaivon.com/v1/blogs?offset=10`
- ?page=2&per_page=10   指定第几页，以及每页的数量
` GET https://api.kaivon.com/v1/blogs?offset=10`
- ?sortby=time&order=arc    指定返回结果按照哪个属性排序，以及排序的方式
`GET https://api.kaivon.com/v1/blogs?sortby=time&order=arc`
7. 状态码
8. 返回结果：
  - GET： 资源对象列表（数组），如果取的是一条数据，那返回一个对象
  - POST ：  返回添加后的资源对象，以及有可能会加上是否成功
  - PUT ：  返回修改后的资源对象，以及有可能会加上是否成功
  - PATCH ： 返回更新后的资源对象，以及有可能会加上是否成功
  - DELETE  ： 返回空，以及有可能会加上是否成功
9. 返回的数据格式：尽量使用JSON，避免使用XML
## 3.cookie和本地存储的总结：
- 看URL就知道要什么  //因为URL包含了URI ，URI时表示互联网资源的名字，URL包含了所要的资源名称 
**URI：统一资源标识符，是一个字符串，用来表示互联网资源的名称 URL： 统一资源定位符，它是一种具体的URI**
- 看HTTP method就知道要干什么
- 看HTTP　status code就知道结果是什么