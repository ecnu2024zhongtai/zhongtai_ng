# ZhongtaiNg

中台项目前端

里面的高德KEY后面会删除，请自行前往高德申请。

## start project

前提：
node 22 (建议使用nvm管理node版本)

angular 18

1. npm install
2. npm start

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 项目结构
```
.
├── angular.json              # 配置 Angular 项目的构建和开发设置
├── LICENSE                   # 项目的开源许可证
├── package.json              # 项目依赖、脚本命令等定义
├── package-lock.json         # 锁定版本的依赖文件
├── public                    # 公共资源文件目录
│   └── favicon.ico           # 网站图标
├── README.md                 # 项目的说明文档
├── src                       # 源代码目录
│   ├── app                   # 应用核心代码（组件、服务等）
│   │   ├── app.component.css # 样式文件
│   │   ├── app.component.html # 组件模板
│   │   ├── app.component.spec.ts # 单元测试文件
│   │   ├── app.component.ts  # 组件的 TypeScript 逻辑
│   │   ├── app.config.ts     # 配置文件
│   │   ├── app.routes.ts     # 路由配置
│   │   ├── components        # 各个子组件目录
│   │   │   ├── driverline.component
│   │   │   │   ├── driverline.component.css # 组件样式
│   │   │   │   ├── driverline.component.html # 组件模板
│   │   │   │   └── driverline.component.ts  # 组件逻辑
│   │   │   ├── gaode.component
│   │   │   │   ├── gaode.component.css
│   │   │   │   ├── gaode.component.html
│   │   │   │   └── gaode.component.ts
│   │   │   ├── heatmap.component
│   │   │   │   ├── heatmap.component.css
│   │   │   │   ├── heatmap.component.html
│   │   │   │   └── heatmap.component.ts
│   │   │   ├── home.component
│   │   │   │   ├── home.component.css
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.ts
│   │   │   └── menubar.component
│   │   │       ├── menubar.component.css
│   │   │       ├── menubar.component.html
│   │   │       └── menubar.component.ts
│   │   └── services          # 应用服务，如数据处理、HTTP 请求等
│   │       ├── heatmap.service.ts # 处理热力图数据的服务
│   │       └── httpclient.service.ts # 管理 HTTP 请求的服务
│   ├── global.d.ts           # 全局类型声明
│   ├── index.html            # 主 HTML 文件
│   ├── main.ts               # Angular 启动模块
│   └── styles.css            # 全局样式文件
├── tsconfig.app.json         # TypeScript 应用相关的配置
├── tsconfig.json             # 全局 TypeScript 配置
└── tsconfig.spec.json        # 单元测试相关的 TypeScript 配置

```
