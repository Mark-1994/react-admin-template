# React Admin Template

基于 React 的后台管理系统模板，内置常见的后台布局、路由、状态管理、图表与 Mock 数据，开箱即用。

## 演示地址

[https://mark-1994.github.io/react-admin-template](https://mark-1994.github.io/react-admin-template)

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 核心框架 | [React](https://react.dev/) 19 |
| 状态管理 | [Redux Toolkit](https://redux-toolkit.js.org/) |
| 路由 | [React Router](https://reactrouter.com/) 7 |
| UI 组件库 | [Ant Design](https://ant.design/index-cn) 6 |
| 图表 | [ECharts](https://echarts.apache.org/zh/index.html) 6 |
| 网络请求 | [Axios](https://axios-http.com/zh/docs/intro) |
| 数据模拟 | [Mock.js](http://mockjs.com/) |
| 工程化 | [Create React App](https://create-react-app.dev/) |

## 项目结构

```
src/
├── api/            # 接口请求封装
├── assets/         # 静态资源
├── components/     # 公共组件
│   ├── commonAside/    # 侧边栏
│   ├── commonHeader/   # 顶部导航
│   ├── commonTag/      # 标签页导航
│   └── Echarts/        # 图表组件
├── config/         # 配置
├── pages/          # 页面
│   ├── home/       # 首页（数据看板）
│   ├── login/      # 登录页
│   ├── mall/       # 商城管理
│   ├── user/       # 用户管理
│   └── other/      # 其他页面
├── router/         # 路由配置
├── store/          # Redux 状态管理
├── App.js
└── index.js
```

## 快速开始

### 环境要求

- Node.js >= 14
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务

```bash
npm start
```

启动后访问 [http://localhost:3000](http://localhost:3000)。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `build` 目录。

### 运行测试

```bash
npm test
```

## 功能特性

- 经典后台布局：侧边菜单、顶部导航、标签页导航
- 路由集中配置，支持动态菜单渲染
- Redux Toolkit 管理全局状态（菜单折叠、标签列表等）
- ECharts 数据图表展示
- Mock.js 模拟接口数据，无需后端即可运行
- 登录页、用户管理、商城管理等常见后台页面

## 部署

项目默认部署到 GitHub Pages（见 `package.json` 中的 `homepage` 字段）。如需部署到其他环境，请修改 `homepage` 并按需调整路由的 `basename`。

## License

[MIT](https://opensource.org/licenses/MIT)
