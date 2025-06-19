# uni-app 项目错误排查指南

## 🔧 已解决的常见错误

### 1. Pinia 模块找不到错误
```
Error: Cannot find module 'pinia/dist/pinia.mjs'
```

**解决方案：**
```bash
# 卸载有冲突的版本
npm uninstall pinia

# 安装兼容版本
npm install pinia@^2.1.7 --legacy-peer-deps
```

### 2. SCSS 预处理器缺失
```
Error: Preprocessor dependency "sass" not found
```

**解决方案：**
```bash
npm install sass --save-dev
```

### 3. 页面路径错误
```
Error: pages/index/pageA not found
```

**解决方案：**
- 确保 `pages.json` 中的路径正确
- 确保页面文件在正确的目录下
- 清除缓存：`rm -rf dist node_modules/.cache`

## 🚀 当前项目配置

### 依赖版本：
- Vue: ^3.4.21
- Pinia: ^2.3.1 (兼容版本)
- Sass: ^1.89.2
- TypeScript: ^4.9.4

### 页面结构：
```
src/pages/
├── index/index.vue     # 首页
├── pageA/index.vue     # 页面A
├── login/index.vue     # 登录页
└── profile/index.vue   # 个人中心
```

### pages.json 配置：
```json
{
  "pages": [
    { "path": "pages/index/index" },
    { "path": "pages/pageA/index" },
    { "path": "pages/login/index" },
    { "path": "pages/profile/index" }
  ]
}
```

## 🔄 重启项目步骤

如果遇到缓存问题，按以下步骤重启：

1. **停止开发服务器** (Ctrl+C)

2. **清除缓存**
   ```bash
   rm -rf dist
   rm -rf node_modules/.cache
   ```

3. **重新启动**
   ```bash
   npm run dev:h5        # H5开发
   npm run dev:mp-weixin # 微信小程序
   ```

## 📱 支持的运行方式

```bash
# H5网页版
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin

# 支付宝小程序
npm run dev:mp-alipay

# QQ小程序
npm run dev:mp-qq

# 构建生产版本
npm run build:h5
npm run build:mp-weixin
```

## ⚠️ 注意事项

1. **路径别名配置**
   - `@` 指向 `src` 目录
   - 确保 `vite.config.ts` 中配置正确

2. **Pinia 状态管理**
   - 使用兼容版本 2.x
   - 在 `main.ts` 中正确引入

3. **SCSS 样式**
   - 确保安装了 `sass` 依赖
   - 在 `.vue` 文件中使用 `<style lang="scss">`

4. **TypeScript 支持**
   - 配置了类型声明
   - 支持组件、API、工具函数的类型检查

现在项目应该可以正常运行了！🎉 