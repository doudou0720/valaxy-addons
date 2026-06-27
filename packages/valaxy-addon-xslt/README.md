# valaxy-addon-xslt

为 Valaxy 生成的 RSS/Atom Feed 自动添加 XSLT 样式表关联。

## 安装

```bash
# npm
npm install valaxy-addon-xslt

# pnpm
pnpm add valaxy-addon-xslt
```

## 使用

在你的 `valaxy.config.ts` 中加载插件：

```typescript
import { defineConfig } from 'valaxy'
import { addonXslt } from 'valaxy-addon-xslt'

export default defineConfig({
  addons: [
    addonXslt({
      // 可选：指定 XSLT 文件路径（相对于 public 目录）
      // 默认值为 '/xslt/feed.xsl'
      xsltPath: '/rss/feed.xsl'
    })
  ]
})
```

### 前置条件

1.  **开启 RSS**：确保你在 `site.config.ts` 中配置了 `url`，且 RSS 功能已开启（Valaxy 默认开启）。
2.  **放置 XSLT 文件**：将你的 XSLT 样式表文件（如 `feed.xsl`）放置在项目的 `public` 目录下（例如 `public/rss/feed.xsl`）。

## 工作原理

该插件利用 Valaxy 的 `build:after` 生命周期钩子。在 RSS 模块生成 `feed.xml` 和 `atom.xml` 后，插件会自动读取这些文件并在 XML 声明后插入 `<?xml-stylesheet ... ?>` 指令。

## Reference

Inspired by [LiuShen's Blog](https://blog.liushen.fun/atom.xml)

## LICENCE

Copyright [2026] [doudou0720]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
