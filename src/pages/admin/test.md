* 前驱知识：模板（泛型）
* STL是泛型程序设计的代表作品

# STL主要包括容器、迭代器、算法
 
# 容器
## 顺序容器
### vector（类似可变容量数组
通常，使用vector是最好的选择，可随机访问元素
### list（双向链表
便于任意位置（中间）插入、删除元素 
### deque（双端队列
可随机访问元素、便于头尾插入删除元素
### 顺序容器中常用操作
![](https://upload-images.jianshu.io/upload_images/27415334-126cfd34ecd46f7d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 容器适配器
### stack
* stack<Type，Container>  Container可用vector、list、deque实现，缺省时为deque
### queue
* stack<Type，Container>  Container可用list、deque，不基于vector，缺省时为deque
### priority_queue
* 元素具有（自己定义）优先级，优先级高的先出
* stack<Type，Container， Funtional>  Container可用vector、deque，不基于list，缺省时为vector；Function为比较方式，默认是less<T>降序排列
## 关联容器
![](https://upload-images.jianshu.io/upload_images/27415334-aef248f709a1b6f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### set/multiset
![](https://upload-images.jianshu.io/upload_images/27415334-009085765b4105e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### pair
![ ](https://upload-images.jianshu.io/upload_images/27415334-6e869233db39c4bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### map/multimap
![ ](https://upload-images.jianshu.io/upload_images/27415334-f3c5977885c3b502.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#  迭代器
![](https://upload-images.jianshu.io/upload_images/27415334-0b76a85f59492bcd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/27415334-d5d03c517b2a10e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

程序段举例
```
vector<int> v;
for(int i = 0; i<5; i++) v.push_back(i);
vector<int>::const_iterator citer;
for(citer = v.begin(); citer!=v.end(); citer++) cout<<*citer<<" ";
cout<<endl;

vector<int>::iterator iter;
for(iter = v.begin(); iter!=v.end(); citer++) *iter += 10;
for(iter = v.begin(); iter!=v.end(); iter++) cout<<*iter<<" ";

map<int, string> m= {{1, "The"}, {2, "But"}, {3, "And"}};
map<int, string>::iterator iter;
for(iter = m.begin(); iter!=m.end(); iter++)
/*iter解引用后是pair类型，需要分别访问键值*/
  cout<< (*iter).first <<" "<<(*iter).second << endl;
```

#  算法
![通常以迭代器作为参数](https://upload-images.jianshu.io/upload_images/27415334-0964ae3cc72bff27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
程序段举例
```
vector<int> v = {1,2,3,45,56,2,3,67,89,5};
vector<int>::iterator iter, pos;
for(iter = v.begin(); iter!=v.end();iter++) cout<<*iter<<" ";
cout<<endl;

pos = max_element(v.begin(), v.end()); //找到给定区间最大值，返回（第一次出现）迭代器
cout<<"the maximum element is"<<*pos<<endl;

cout<<count(v.begin(), v.end(), 3) <<endl; //返回给定参数出现次数

sort(v.begin(), v.end()); //排序，默认升序
for(iter = v.begin(); iter!=v.end(); iter++) cout <<*iter<< " ";
```

参考文献 大连理工大学慕课《面向对象方法与C++程序设计》

- - -
#以下随用随补：
>vector erase方法
接受迭代器，删除迭代器对应元素，返回被删除位置的后一个位置的迭代器。

>迭代器相当于容器指针，“ \* ”解引用访问迭代器指向元素
如：\*iter
迭代器方法：end()
end()：返回的是一个迭代器类型，返回的迭代器指向的是**并不是末端元素**，而是末端元素的后边，我们就理解成指向的是一个不存在的元素。
