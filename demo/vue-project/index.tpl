<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>vue-project-demo</title>
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