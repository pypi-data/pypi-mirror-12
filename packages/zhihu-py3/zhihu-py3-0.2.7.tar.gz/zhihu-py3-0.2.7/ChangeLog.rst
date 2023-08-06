更新日志
========

0.2.7
-----

- [fix] 修复由于把用户 tag 从 h3 改成了 div 造成的一系列 bug (Thanks \ `@lishubing <https://github.com/lishubing>`__\ 的PR)

0.2.6
-----

- [fix] 获取匿名用户的ID出错的问题，暂定为返回空字符串
- [add] 增加获取用户关注专栏数的功能 (Thanks\ `@cssmlulu <https://github.com/cssmlulu>`__\ 的PR)
- [add] 增加获取用户关注专栏的功能 (Thanks\ `@cssmlulu <https://github.com/cssmlulu>`__\ 的PR)

0.2.5
-----

- [fix] 修复了某些问题无法获取答案的bug
- [fix] 知乎又把头像链接改回去了。。。

0.2.4
-----

- [fix] 知乎修改了图片链接的格式，影响了答案图片，头像。

0.2.3
-----

- [fix] Topic.hot_question 的顺序 Bug
- [fix] 知乎登录逻辑修改（？）
- [add] Topic 所有答案接口
- [add] Topic 热门答案接口

0.2.2
-----

代码美化，尽量满足 PEP8.

0.2.1
-----

增加 Topic 类的最近动态（热门排序）
修复 Topic.children 的bug

0.2.0
-----

增加Me类及其相关操作

-  [x] 点赞，取消点赞，反对，取消反对某回答
-  [x] 点赞，取消点赞，反对，取消反对某文章
-  [x] 感谢，取消感谢某回答
-  [x] 关注，取消关注某用户
-  [x] 关注，取消关注某问题
-  [x] 关注，取消关注某话题
-  [x] 关注，取消关注收藏夹

增加Topic类相关操作：

-  [x] 获取话题名称
-  [x] 获取话题描述
-  [x] 获取话题图标
-  [x] 获取关注者数量
-  [x] 获取关注者
-  [x] 获取父话题
-  [x] 获取子话题
-  [x] 获取优秀答主
-  [ ] 获取最近动态（暂缓）
-  [x] 获取精华回答
-  [x] 获取所有问题

0.1.5
-----

- 增加了获取收藏夹关注者的功能
- 增加了获取问题关注者的功能
- Column的一个小Bug修复

0.1.4
-----

知乎登录参数变化，从rememberme变成了remember_me，做了跟进。

2015.07.30
----------

发布到Pypi.

2015.07.29
----------

-  重构项目结构
-  增加zhihu.Client类，改善原先模块需要使用当前目录下cookies的弊端，现在的使用方法请看Readme中的示例。
-  去掉了\ ``_text2int``\ 方法，因为发现知乎以K结尾的赞同数也有办法获取到准确点赞数。

2015.07.26
----------

重构项目结构，转变为标准Python模块结构。

2015.07.26
----------

添加\ ``Author.photo_url``\ 借口，用于获取用户头像。

本属性的实现较为分散，在不同的地方使用了不同的方法：

-  ``Author.follower(e)s``\ 、\ ``Answer.upvoters``\ 等属性返回的\ ``Author``\ 自带\ ``photo_url``

-  用户自定义的\ ``Author``\ 在访问过主页的情况下通过解析主页得到

-  用户自定义的\ ``Author``\ 在未访问主页的情况下为了性能使用了知乎的CardProfile
   API

因为实现混乱所以容易有Bug，欢迎反馈。

2015.07.25
----------

增加了获取用户关注者和粉丝的功能
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``Author.followers``\ 、\ ``Author.folowees``\ ，返回Author迭代器，自带url,
name ,motto question\_num, answer\_num, upvote\_num, follower\_num属性。

html解析器优选
~~~~~~~~~~~~~~

在安装了lxml的情况下默认使用lxml作为解析器，否则使用html.parser。

增加答案获取点赞用户功能
~~~~~~~~~~~~~~~~~~~~~~~~

``Author.upvoters``\ ，返回Author迭代器，自带url, name ,motto
question\_num, answer\_num, upvote\_num, thank\_num属性

增加简易判断是否为「三零用户」功能
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``Author.is_zero_user()``\ ，判断标准为，赞同，感谢，提问数，回答数均为0。

2015.07.23
----------

各个类url属性更改为公开
~~~~~~~~~~~~~~~~~~~~~~~

暂时这样吧，有点懒了，因为这样会让使用者有机会非法修改url，可能导致Bug，以后勤快的话会改成read-only。

类名变更
~~~~~~~~

专栏类从\ ``Book``\ 更名为\ ``Cloumn``

文章类从\ ``Article``\ 更名为\ ``Post``

以上两个更名同时影响了其他类的属性名，如\ ``Author.books``\ 变更为\ ``Author.columns``\ ，其他类同理。

接口名变更
~~~~~~~~~~

1. 统一了一下复数的使用。比如\ ``Author.answers_num``\ 变为\ ``Author.answer_num``,
   ``Author.collections_num``\ 变为\ ``Author.collection_num``\ 。也就是说某某数量的接口名为\ ``Class.foo_num``\ ，foo使用单数形式。

2. 知乎的赞同使用单词upvote，以前叫\ ``agree``\ 的地方现在都叫\ ``upvote``\ 。比如\ ``Author.agree_num``\ 变为\ ``Author.upvote_num``,
   ``Post.agree_num``\ 变为\ ``Post.upvote_num``\ 。

3. ``Answer``\ 类的\ ``upvote``\ 属性更名为\ ``upvote_num``\ 。

提供\ ``Topic``\ 类
~~~~~~~~~~~~~~~~~~~

目前只有获取话题名的功能。

提供\ ``Author.activities``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

属性获取用户动态，返回\ ``Activity``\ 类生成器。

``Activity``\ 类提供\ ``type``\ 属性用于判断动态类型，\ ``type``\ 为\ ``ActType``\ 类定义的常量，根据\ ``type``\ 的不同提供不同的属性，如下表：

+----------------+--------------------+--------------+
| 类型           | 常量               | 提供的成员   |
+================+====================+==============+
| 关注了问题     | FOLLOW\_QUESTION   | question     |
+----------------+--------------------+--------------+
| 赞同了回答     | UPVOTE\_ANSWER     | answer       |
+----------------+--------------------+--------------+
| 关注了专栏     | FOLLOW\_COLUMN     | column       |
+----------------+--------------------+--------------+
| 回答了问题     | ANSWER\_QUESTION   | answer       |
+----------------+--------------------+--------------+
| 赞同了文章     | UPVOTE\_POST       | post         |
+----------------+--------------------+--------------+
| 发布了文章     | PUBLISH\_POST      | post         |
+----------------+--------------------+--------------+
| 关注了话题     | FOLLOW\_TOPIC      | topic        |
+----------------+--------------------+--------------+
| 提了一个问题   | ASK\_QUESTION      | question     |
+----------------+--------------------+--------------+

由于每种类型都只提供了一种属性，所以所有Activity对象都有\ ``content``\ 属性，用于直接获取唯一的属性。

示例代码见[zhihu-test.py][zhihu-test-py-url]的\ ``test_author``\ 函数最后。

``activities``\ 属性可以在未登录（未生成cookies）的情况下使用，但是根据知乎的隐私保护政策，开启了隐私保护的用户的回答和文章，此时作者信息会是匿名用户，所以还是建议登录后使用。

2015.07.22
----------

尝试修复了最新版bs4导致的问题，虽然我没明白问题在哪QuQ，求测试。

-   Windows 已测试 (`@7sDream <https://github.com/7sDream>`__\ )
-   Linux

    -   Ubuntu 已测试(\ `@7sDream <https://github.com/7sDream>`__\ )

-   Mac 已测试(\ `@SimplyY <https://github.com/SimplyY>`__\ )

2015.07.16
----------

重构 Answer 和 Article 的 url 属性为 public.

2015.07.11:
-----------

Hotfix， 知乎更换了登录网址，做了简单的跟进，过了Test，等待Bug汇报中。

2015.06.04：
------------

由\ `Gracker <https://github.com/Gracker>`__\ 补充了在 Ubuntu 14.04
下的测试结果，并添加了补充说明。

2015.05.29：
------------

修复了当问题关注人数为0时、问题答案数为0时的崩溃问题。（感谢：\ `段晓晨 <http://www.zhihu.com/people/loveQt>`__\ ）
