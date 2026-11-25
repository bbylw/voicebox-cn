import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  // 站点的规范域名（不带结尾斜杠）：canonical、OG 绝对地址、robots.txt、
  // sitemap 以及 /llms.txt 里的链接都由它生成。
  site: "https://voicebox.ndjp.net",
  // 站点名：用于 <title>、首页 H1 与 OG 卡片。
  title: "Voicebox 中文文档",
  // 一句话站点描述：用于 meta description 与 OG。
  description: "本地优先的开源 AI 语音工作室：声音克隆、语音生成、全局听写与智能体语音。",
  locale: "zh-CN",
  // 仓库地址：显示为页头的 GitHub 链接。
  github: "https://github.com/bbylw/voicebox-cn",
  socialImageAlt: "Voicebox 中文文档",
  editPattern: "https://github.com/bbylw/voicebox-cn/edit/main/src/content/docs/{path}",
  // 文档按内容目录自动生成侧边栏；分组标题与顺序写在各 index.mdx 的 frontmatter 里。
  sidebar: {
    items: [{ autogenerate: { collection: "docs" } }],
    overviewLabel: "概览",
    indexDisplay: "overview-leaf",
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});