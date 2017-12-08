1. 在本地创建目录ntools，下载package.json和excel2android.js文件到ntools目录下。

2. 在shell终端进入到ntools目录，运行下面的命令，安装依赖的js模块。

   ```shell
   npm install
   ```

3. 在shell终端运行生成android的strings.xml文件。

   ```shell
   #node excel2android.js <多语言excel文件> <输出文件夹>
   node excel2android.js Lolalization.xlsx res
   ```

注意：

对Lolalization.xlsx格式的要求：
id的标题要为：Strings

App端的多言sheet名称是： AppStrings

服务器端多语言sheet名称是： ServerEvent

可以在代码中配置

```javascript
var distPaths = {
  "English": "values/strings_english.xml",
"意大利语": "values-it/strings.xml",
"法语": "values-fr/strings.xml",
"西班牙语": "values-es/strings.xml",
"德语": "values-de/strings.xml"
}
```

