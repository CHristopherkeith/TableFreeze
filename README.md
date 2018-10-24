# TableFreeze.js（基于JQuery的表格冻结插件）

> 声明：该插件在原插件的基础上增加了冻结尾列的功能，由于此插件为github找不到开源地址，原始版本的插件作者及其修改信息如下：
** 名称:JQeury实现表格行列冻结  
**  
** 作者:YJJ  
**  
** 时间:2014年4月16日  
**  
** 修改人：Allen  
**  
** 修改时间:2017-06-10  
**  
** 修改记录:兼容  
**  
** 描述:类似Excel中的冻结窗格功能.建议给出表头固定宽度,所有单元格的高度,指定表格宽度;  
此版本增加的修改信息如下：  
** 修改人：Christopher  
**  
** 修改时间:2018-08-05  
**  
** 修改记录:增加冻结右侧列的功能+兼容  
**  
** 描述:支持冻结函数传入第4个参数，用于冻结尾列;兼容ie下宽度和高度显示的问题  

## 项目地址

 - [在线预览地址](http://christopherkeith.me/TableFreeze/)
 -  [Github地址](https://github.com/CHristopherkeith/TableFreeze)

## 特性

- 基于jQuery

## 使用

```bash
<script type="text/javascript" src="./jquery.js"></script>
<script type="text/javascript" src="./jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="./TableFreeze.js"></script>
<script type='text/javascript'>
    $(document).ready(function(){
        // rowHead, rowFoot, colLeft, colRight 分别对应需要冻结的表格首行，尾行，首列和尾列
        var rowHead = 1, rowFoot = 1, colLeft = 2, colRight = 2;
        $("#someId").FrozenTable(rowHead, rowFoot, colLeft, colRight);
    });
</script>
```

## License

This project is available under the MIT license.
