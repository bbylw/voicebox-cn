<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/icon-dark.webp" alt="Voicebox" width="120" height="120" />
</p>

<h1 align="center">Voicebox</h1>

<p align="center">
  <strong>开源语音合成工作室。</strong><br/>
  克隆声音。生成语音。应用效果。构建语音驱动的应用。<br/>
  全部在您的本地机器上运行。
</p>

<p align="center">
  <a href="https://github.com/jamiepine/voicebox/releases">
    <img src="https://img.shields.io/github/downloads/jamiepine/voicebox/total?style=flat&color=blue" alt="Downloads" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/releases/latest">
    <img src="https://img.shields.io/github/v/release/jamiepine/voicebox?style=flat" alt="Release" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/stargazers">
    <img src="https://img.shields.io/github/stars/jamiepine/voicebox?style=flat" alt="Stars" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/jamiepine/voicebox?style=flat" alt="License" />
  </a>
</p>

<p align="center">
  <a href="https://voicebox.sh">voicebox.sh</a> •
  <a href="https://docs.voicebox.sh">文档</a> •
  <a href="#下载">下载</a> •
  <a href="#功能">功能</a> •
  <a href="#api">API</a>
</p>

<br/>

<p align="center">
  <a href="https://voicebox.sh">
    <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/landing/public/assets/app-screenshot-1.webp" alt="Voicebox App Screenshot" width="800" />
  </a>
</p>

<p align="center">
  <em>点击上方图片访问 <a href="https://voicebox.sh">voicebox.sh</a> 观看演示视频</em>
</p>

<br/>

<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/landing/public/assets/app-screenshot-2.webp" alt="Voicebox Screenshot 2" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/landing/public/assets/app-screenshot-3.webp" alt="Voicebox Screenshot 3" width="800" />
</p>

<br/>

## Voicebox 是什么？

Voicebox 是一个**本地优先的语音克隆工作室**——一个免费且开源的 ElevenLabs 替代品。只需几秒的音频即可克隆声音，支持 5 种 TTS 引擎和 23 种语言生成语音，应用后期处理效果，并通过时间线编辑器创作多声音项目。

- **完整隐私保护** —— 模型和声音数据保留在您的机器上
- **5 种 TTS 引擎** —— Qwen3-TTS、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo 和 HumeAI TADA
- **23 种语言** —— 从英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **后期处理效果** —— 变调、混响、延迟、合唱、压缩和滤波器
- **富有表现力的语音** —— 通过 Chatterbox Turbo 实现旁语言标签如 `[laugh]`、`[sigh]`、`[gasp]`
- **无限长度** —— 自动分块与交叉淡入淡出，适用于脚本、文章和章节
- **故事编辑器** —— 多轨道时间线，用于对话、播客和叙述
- **API 优先** —— REST API 用于将语音合成集成到您自己的项目中
- **原生性能** —— 使用 Tauri (Rust) 构建，而非 Electron
- **处处运行** —— macOS (MLX/Metal)、Windows (CUDA)、Linux、AMD ROCm、Intel Arc、Docker

---

## 下载

| 平台                  | 下载                                               |
| --------------------- | -------------------------------------------------- |
| macOS (Apple Silicon) | [下载 DMG](https://voicebox.sh/download/mac-arm)   |
| macOS (Intel)         | [下载 DMG](https://voicebox.sh/download/mac-intel) |
| Windows               | [下载 MSI](https://voicebox.sh/download/windows)   |
| Docker                | `docker compose up`                                |

> **[查看所有二进制文件 →](https://github.com/jamiepine/voicebox/releases/latest)**

> **Linux** —— 预构建二进制文件暂未提供。查看 [voicebox.sh/linux-install](https://voicebox.sh/linux-install) 获取从源码构建说明。

---

## 功能

### 多引擎语音克隆

五种 TTS 引擎各有优势，可在每次生成时切换：

| 引擎                        | 语言 | 优势                                                                                                                           |
| --------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Qwen3-TTS** (0.6B / 1.7B) | 10   | 高质量多语言克隆，传递指令（"说慢点"、"耳语"）                                                                                 |
| **LuxTTS**                  | 英语 | 轻量级（~1GB VRAM），48kHz 输出，CPU 上 150 倍实时速度                                                                         |
| **Chatterbox Multilingual** | 23   | 最广泛的语言覆盖 —— 阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| **Chatterbox Turbo**        | 英语 | 快速 350M 模型，带有旁语言情感/声音标签                                                                                        |
| **TADA** (1B / 3B)          | 10   | HumeAI 语音语言模型 —— 700 秒 + 连贯音频，文本 - 声学双重对齐                                                                  |

### 情感与旁语言标签

在文本输入中键入 `/` 插入富有表现力的标签，模型会在语音中合成为这些标签（Chatterbox Turbo）：

`[laugh]` `[chuckle]` `[gasp]` `[cough]` `[sigh]` `[groan]` `[sniff]` `[shush]` `[clear throat]`

### 后期处理效果

8 种音频效果，由 Spotify 的 `pedalboard` 库提供支持。生成后应用，实时预览，构建可重用的预设。

| 效果          | 描述                             |
| ------------- | -------------------------------- |
| 变调          | 上下调整最多 12 个半音           |
| 混响          | 可配置的房间大小、阻尼、干湿混合 |
| 延迟          | 带有可调时间、反馈和混合的回声   |
| 合唱 / 弗兰德 | 调制延迟，带来金属感或丰富的质感 |
| 压缩器        | 动态范围压缩                     |
| 增益          | 音量调整（-40 到 +40 dB）        |
| 高通滤波器    | 移除低频                         |
| 低通滤波器    | 移除高频                         |

附带 4 个内置预设（机器人、广播、回声室、低沉声音），并支持自定义预设。效果可以分配给每个配置文件作为默认值。

### 无限生成长度

文本在句子边界处自动分割，每个块独立生成，然后交叉淡入淡出在一起。适用于所有引擎。

- 可配置的自动分块限制（100-5,000 字符）
- 交叉淡入淡出滑块（0-200ms），用于平滑过渡
- 最大文本长度：50,000 字符
- 智能分割尊重缩写、CJK 标点和 `[tags]`

### 生成版本

每个生成支持多个版本并带有来源追踪：

- **原创** —— 干净的 TTS 输出，始终保留
- **效果版本** —— 应用来自任何源版本的不同效果链
- **片段** —— 用新种子重新生成以获得变化
- **来源追踪** —— 每个版本记录其谱系
- **收藏** —— 标记生成的内容以便快速访问

### 异步生成队列

生成是非阻塞的。提交后立即开始输入下一个。

- 串行执行队列防止 GPU 争用
- 实时 SSE 状态流式传输
- 失败的生成可以重试
- 崩溃产生的过时生成在启动时自动恢复

### 声音配置文件管理

- 从音频文件创建配置文件或直接录制
- 导入/导出配置文件以分享或备份
- 多样本支持，提高克隆质量
- 每个配置文件的默认效果链
- 使用描述和语言标签组织

### 故事编辑器

用于对话、播客和叙述的多声音时间线编辑器。

- 多轨道创作，支持拖放
- 内联音频修剪和分割
- 自动播放与同步播放头
- 每个轨道剪辑的版本固定

### 录音与转录

- 应用内录音，带波形可视化
- 系统音频捕获（macOS 和 Windows）
- Whisper（包括 Whisper Turbo）驱动的自动转录
- 多种格式导出录音

### 模型管理

- 每个模型卸载以释放 GPU 内存而不删除下载
- 通过 `VOICEBOX_MODELS_DIR` 自定义模型目录
- 带有进度追踪的模型文件夹迁移
- 下载取消/清除 UI

### GPU 支持

| 平台                     | 后端           | 说明                              |
| ------------------------ | -------------- | --------------------------------- |
| macOS (Apple Silicon)    | MLX (Metal)    | 通过神经引擎提升 4-5 倍速度       |
| Windows / Linux (NVIDIA) | PyTorch (CUDA) | 自动从应用内下载 CUDA 二进制文件  |
| Linux (AMD)              | PyTorch (ROCm) | 自动配置 HSA_OVERRIDE_GFX_VERSION |
| Windows (任何 GPU)       | DirectML       | 通用 Windows GPU 支持             |
| Intel Arc                | IPEX/XPU       | Intel 独立 GPU 加速               |
| 任意                     | CPU            | 处处可用，只是较慢                |

---

## API

Voicebox 提供了完整的 REST API，用于将语音合成集成到您自己的应用中。

```bash
# Generate speech
curl -X POST http://localhost:17493/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "profile_id": "abc123", "language": "en"}'

# List voice profiles
curl http://localhost:17493/profiles

# Create a profile
curl -X POST http://localhost:17493/profiles \
  -H "Content-Type: application/json" \
  -d '{"name": "My Voice", "language": "en"}'
```

**用例：** 游戏对话、播客制作、辅助工具、语音助手、内容自动化。

完整 API 文档请访问 `http://localhost:17493/docs`。

---

## 技术栈

| 层级     | 技术                                                  |
| -------- | ----------------------------------------------------- |
| 桌面应用 | Tauri (Rust)                                          |
| 前端     | React、TypeScript、Tailwind CSS                       |
| 状态管理 | Zustand、React Query                                  |
| 后端     | FastAPI (Python)                                      |
| TTS 引擎 | Qwen3-TTS、LuxTTS、Chatterbox、Chatterbox Turbo、TADA |
| 效果     | Pedalboard (Spotify)                                  |
| 转录     | Whisper / Whisper Turbo (PyTorch 或 MLX)              |
| 推理     | MLX (Apple Silicon) / PyTorch (CUDA/ROCm/XPU/CPU)     |
| 数据库   | SQLite                                                |
| 音频     | WaveSurfer.js、librosa                                |

---

## 路线图

| 功能             | 描述                           |
| ---------------- | ------------------------------ |
| **实时流式传输** | 边生成边流式传输音频，逐词播放 |
| **声音设计**     | 从文本描述创建新声音           |
| **更多模型**     | XTTS、Bark 和其他开源声音模型  |
| **插件架构**     | 扩展自定义模型和效果           |
| **移动伴侣**     | 从手机控制 Voicebox            |

---

## 开发

查看 [CONTRIBUTING.md](https://github.com/jamiepine/voicebox/blob/main/CONTRIBUTING.md) 获取详细的设置和贡献指南。

### 快速开始

```bash
git clone https://github.com/jamiepine/voicebox.git
cd voicebox

just setup   # creates Python venv, installs all deps
just dev     # starts backend + desktop app
```

安装 [just](https://github.com/casey/just): `brew install just` 或 `cargo install just`。运行 `just --list` 查看所有命令。

**先决条件：** [Bun](https://bun.sh)、[Rust](https://rustup.rs)、[Python 3.11+](https://python.org)、[Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)，以及 macOS 上的 [Xcode](https://developer.apple.com/xcode/)。

### 本地构建

```bash
just build          # Build CPU server binary + Tauri app
just build-local    # (Windows) Build CPU + CUDA server binaries + Tauri app
```

### 添加新的声音模型

多引擎架构使添加新的 TTS 引擎变得简单。[分步指南](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/developer/tts-engines.mdx) 涵盖了完整流程：依赖研究、后端协议实现、前端连接和 PyInstaller 打包。

该指南针对 AI 编码助手进行了优化。[代理技能](https://github.com/jamiepine/voicebox/blob/main/.agents/skills/add-tts-engine/SKILL.md) 可以接收一个模型名称并自主处理整个集成 —— 您只需在本地测试构建。

### 项目结构

```
voicebox/
├── app/              # 共享 React 前端
├── tauri/            # 桌面应用 (Tauri + Rust)
├── web/              # Web 部署
├── backend/          # Python FastAPI 服务器
├── landing/          # 营销网站
└── scripts/          # 构建和发布脚本
```

---

## 贡献

欢迎贡献！查看 [CONTRIBUTING.md](https://github.com/jamiepine/voicebox/blob/main/CONTRIBUTING.md) 获取指南。

1. Fork 仓库
2. 创建功能分支
3. 进行您的更改
4. 提交 PR

## 安全

发现安全漏洞？请负责任地报告。查看 [SECURITY.md](https://github.com/jamiepine/voicebox/blob/main/SECURITY.md) 获取详情。

---

## 许可证

MIT 许可证 —— 查看 [LICENSE](https://github.com/jamiepine/voicebox/blob/main/LICENSE) 获取详情。

---

<p align="center">
  <a href="https://voicebox.sh">voicebox.sh</a>
</p>

---

<p align="center">
  <sub>本项目源自 <a href="https://github.com/jamiepine/voicebox">github.com/jamiepine/voicebox</a></sub>
</p>
