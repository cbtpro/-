# -

hyphen 连字符 英[ˈhaɪfn] 美[ˈhaɪfn].
hyphen是一个基于单向数据流实现的简单mvvm框架实现.

项目名称是开的一个小玩笑,因为`-`字符在shell中表示上一次使用的目录,如果直接clone项目到本地,会导致无法使用shell在上级目录切换到`-`目录中.
解决办法是切换目录时不要单独使用`cd -`来进行目录切换,可以使用`/Users/用户名/Developer/github/-`或`~/Developer/github/-`来进行切换.
当然也可以使用`hyphen`目录来命名项目.

```shell
git clone git@github.com:cbtpro/-.git hyphen
```

或在本地初始化仓库后,重新制定origin后再拉取代码.

```shell
mkdir hyphen
cd hyphen
git remote add origin git@github.com:cbtpro/-.git
git pull
```
