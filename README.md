# 项目说明
该网页应用提供电影评分与电影推荐功能，应用将根据用户的评分结果为用户推荐电影

## 运行步骤
+ 从https://datasets.imdbws.com 下载title.basics.tsv.gz并解压到项目目录
+ `node loadDatabase.js`将title.basics.tsv的前10万条数据导入mongodb数据库中，数据量可在程序中调整
+ `npm run build`构建react app
+ `node server.js`在localhost:3000中启动网页
