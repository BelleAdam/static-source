<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=750, user-scalable=no">
    <title>公共组件 demo</title>
    <link href="//api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css" rel="stylesheet" type="text/css" />
    <%
        var cssFiles = htmlWebpackPlugin.files.css;
        for (var i= 0, len = cssFiles.length; i < len; i++) {
    %>
        <link href="<%= cssFiles[i] %>" rel="stylesheet">
        <% } %>
</head>

<body>
    <div id="app">
        <router-view></router-view>
    </div>
    <script src="//api.map.baidu.com/api?v=2.0&ak=yvVK3d5pPnOFq9CzrqWC9r3h"></script>
    <!-- 百度地图热力图类库 -->
    <script type="text/javascript" src="//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
    <!-- 百度地图路况类库 -->
    <script type="text/javascript" src="//api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>
    <%
        var jsFiles = htmlWebpackPlugin.files.js;
        var excludeChunks = htmlWebpackPlugin.options.excludeChunks;
        for (var i= 0, len = jsFiles.length; i < len; i++) {
          if (excludeChunks && !excludeChunks.test(jsFiles[i])) {
    %>
        <script src="<%= jsFiles[i] %>"></script>
        <% }} %>
</body>

</html>