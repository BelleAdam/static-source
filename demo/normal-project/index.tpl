<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>普通项目代码组织 demo</title>
  <%
        var cssFiles = htmlWebpackPlugin.files.css;
        for (var i= 0, len = cssFiles.length; i < len; i++) {
    %>
    <link href="<%= cssFiles[i] %>" rel="stylesheet">
    <% } %>
      <script>
        var SERVER_DATA = JSON.parse('{"STATIC_HOST":"static-public.thereclub.cn","ASSETS_HOST":"static-public.thereclub.cn","version":1216}');
      </script>
</head>

<body>
  <h3>请打开 console 查看 JS 演示示例</h3>
  <p>使用 scss 引用静态资源演示：</p>
  <p class="scss-assets-demo"></p>
  <%
        var jsFiles = htmlWebpackPlugin.files.js;
        var excludeChunks = htmlWebpackPlugin.options.excludeChunks;
        for (var i= 0, len = jsFiles.length; i < len; i++) {
          if (excludeChunks && !excludeChunks.test(jsFiles[i])) {
    %>
    <script crossorigin="anonymous" src="<%= jsFiles[i] %>"></script>
    <% }} %>
</body>

</html>