<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/icon-dark.webp" alt="Voicebox" width="120" height="120" />
</p>

<h1 align="center">Voicebox</h1>

<p align="center">
  <strong>开源 AI 语音工作室。</strong><br/>
  克隆任意声音。生成语音。听写进任何应用。用你克隆的声音与智能体对话。<br/>
  完整的语音 I/O 链路，全部在本地机器上运行。
</p>

> **本仓库是 Voicebox 的简体中文站**（落地页 + 中文文档），不是应用源码。应用源码见 [jamiepine/voicebox](https://github.com/jamiepine/voicebox)。
> 在线访问：[voicebox.ndjp.net](https://voicebox.ndjp.net) · 文档：[voicebox.ndjp.net/docs](https://voicebox.ndjp.net/docs/)

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
  <a href="https://capy.ai?utm_source=voicebox&utm_medium=readme&utm_campaign=built-with-capy">
    <img src="https://img.shields.io/badge/built%20with-Capy-63C8C1?style=flat" alt="Built with Capy" />
  </a>
  <a href="https://deepwiki.com/jamiepine/voicebox">
    <img src="https://img.shields.io/static/v1?label=Ask&message=DeepWiki&color=5B6EF7" alt="Ask DeepWiki" />
  </a>
</p>

<p align="center">
    <a href="https://trendshift.io/repositories/21213" target="_blank"><img src="https://trendshift.io/api/badge/repositories/21213" alt="jamiepine%2Fvoicebox | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</p>

<p align="center">
  <a href="https://voicebox.sh">voicebox.sh</a> •
  <a href="https://docs.voicebox.sh">文档</a> •
  <a href="#下载">下载</a> •
  <a href="#功能">功能</a> •
  <a href="#api">API</a> •
  <a href="https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/troubleshooting.mdx">故障排查</a>
</p>

<br/>

<p align="center">
  <a href="https://voicebox.sh">
    <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/app-screenshot-1.webp" alt="Voicebox App Screenshot" width="800" />
  </a>
</p>

<p align="center">
  <em>点击上方图片访问 <a href="https://voicebox.sh">voicebox.sh</a> 观看演示视频</em>
</p>

<br/>

<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/app-screenshot-2.webp" alt="Voicebox Screenshot 2" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/app-screenshot-3.webp" alt="Voicebox Screenshot 3" width="800" />
</p>

<br/>

## 由 Capy 构建

<p align="center">
  <a href="https://capy.ai?utm_source=voicebox&utm_medium=readme&utm_campaign=built-with-capy">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/capy-wordmark-dark.svg" />
      <img src="https://raw.githubusercontent.com/jamiepine/voicebox/main/.github/assets/capy-wordmark-light.svg" alt="Capy" width="160" />
    </picture>
  </a>
</p>

Voicebox 使用 [Capy](https://capy.ai?utm_source=voicebox&utm_medium=readme&utm_campaign=built-with-capy) 构建与维护。一条 Capy Captain 线程负责项目的日常推进，其 crew 线程会在 Jamie 合并每个贡献者的 PR 之前，在 Linux 和一台 Mac Studio 上对它们进行测试、rebase 和评审。Voicebox 始终以 MIT 许可证保持免费开源，应用内没有启动画面、横幅或任何打断。

**[试用 Capy →](https://capy.ai?utm_source=voicebox&utm_medium=readme&utm_campaign=built-with-capy)** · [Voicebox 是如何构建的](https://voicebox.sh/built-with-capy)

---

## Voicebox 是什么？

Voicebox 是一个**本地优先的 AI 语音工作室**——在一个应用里同时作为 **ElevenLabs** 和 **WisprFlow** 的免费开源替代方案。只需几秒音频即可克隆声音，使用 8 种 TTS 引擎生成 23 种语言的语音，用全局快捷键把语音听写进任何文本输入框，并为任何支持 MCP 的 AI 智能体赋予你选择的声音。

两家云端巨头恰好各占语音 I/O 链路的一半——ElevenLabs 在输出侧，WisprFlow 在输入侧。Voicebox 两者兼顾，并用一个内置本地 LLM 把它们连接起来（用于文本润色和每个配置文件的语音人格），整个链路都运行在你自己的机器上。

- **完整隐私保护** —— 模型、声音数据和捕获内容永远不离开您的机器
- **8 种 TTS 引擎** —— Qwen3-TTS、Qwen CustomVoice、Qwen VoiceDesign、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA 和 Kokoro
- **声音克隆与预设音色** —— 从参考样本进行零样本克隆，或通过 Kokoro 和 Qwen CustomVoice 使用 50+ 精心挑选的预设音色
- **23 种语言** —— 从英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **后期处理效果** —— 变调、混响、延迟、合唱、压缩和滤波器
- **富有表现力的语音** —— 通过 Chatterbox Turbo 使用 `[laugh]`、`[sigh]`、`[gasp]` 等副语言标签；通过 Qwen CustomVoice 使用自然语言控制语气；通过 Qwen VoiceDesign 用一段描述创造声音
- **无限长度** —— 自动分块与交叉淡入淡出，适用于脚本、文章和章节
- **故事编辑器** —— 多轨时间线，用于对话、播客和叙述
- **语音输入** —— 全局听写快捷键，支持按住说话和点击切换两种模式；macOS 上经过辅助功能验证的自动粘贴；每个文本框都有应用内麦克风；基于 Whisper 的语音转文本
- **智能体语音输出** —— 一次工具调用（`voicebox_speak`），任何支持 MCP 的智能体（Claude Code、Cursor、Cline）就能用您克隆的声音对您说话
- **声音人格** —— 为任何声音配置文件附加自由书写的人格，然后通过内置本地 LLM 进行撰写（Compose）、改写（Rewrite）或回应（Respond）——智能体也可以通过 MCP 调用相同的模式
- **API 优先** —— REST API 加上内置 MCP 服务器，将语音 I/O 集成到您自己的应用和智能体中
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

> **遇到问题？** 查看[故障排查指南](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/troubleshooting.mdx)，覆盖常见的安装、生成、模型下载和 GPU 问题。

---

## 功能

### 多引擎语音克隆

八种 TTS 引擎各有优势，可在每次生成时切换：

| 引擎                        | 语言 | 优势                                                                                                                           |
| --------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Qwen3-TTS** (0.6B / 1.7B) | 10   | 高质量多语言克隆，支持传递指令（"说慢点"、"耳语"）                                                                             |
| **Qwen CustomVoice**        | 10   | 9 种精选预设音色，支持自然语言控制语气——无需参考音频                                                                           |
| **Qwen VoiceDesign**        | 10   | 根据一段文字描述构建声音——无需参考音频或预设                                                                                   |
| **LuxTTS**                  | 英语 | 轻量级（~1GB VRAM），48kHz 输出，CPU 上 150 倍实时速度                                                                         |
| **Chatterbox Multilingual** | 23   | 最广泛的语言覆盖 —— 阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| **Chatterbox Turbo**        | 英语 | 快速 350M 模型，带有旁语言情感/声音标签                                                                                        |
| **TADA** (1B / 3B)          | 10   | HumeAI 语音语言模型 —— 700 秒 + 连贯音频，文本 - 声学双重对齐                                                                  |
| **Kokoro**                  | 8    | 50 种精选预设音色，仅 82M 的微型模型，CPU 推理快速                                                                             |

### 情感与旁语言标签

只有 **Chatterbox Turbo** 会解析 `[laugh]`、`[sigh]` 这类副语言标签。Qwen3-TTS、LuxTTS、Chatterbox Multilingual 和 HumeAI TADA 会把它们当作普通文本读出来。

选中 **Chatterbox Turbo** 后，在文本输入框中输入 `/` 即可打开标签插入器，把表达性标签内联到语音里：

声音：`[laugh]` `[chuckle]` `[gasp]` `[cough]` `[sigh]` `[groan]` `[sniff]` `[shush]` `[clear throat]`

语气：`[angry]` `[crying]` `[dramatic]` `[fear]` `[happy]` `[narration]` `[sarcastic]` `[surprised]` `[whispering]` `[advertisement]`

### 后期处理效果

8 种音频效果，由 Spotify 的 `pedalboard` 库提供支持。生成后应用，实时预览，构建可重用的预设。

| 效果            | 描述                             |
| --------------- | -------------------------------- |
| 变调            | 上下调整最多 12 个半音           |
| 混响            | 可配置的房间大小、阻尼、干湿混合 |
| 延迟            | 带有可调时间、反馈和混合的回声   |
| 合唱 / 弗兰德   | 调制延迟，带来金属感或丰富的质感 |
| 压缩器          | 动态范围压缩                     |
| 增益            | 音量调整（-40 到 +40 dB）        |
| 高通滤波器      | 移除低频                         |
| 低通滤波器      | 移除高频                         |

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

### 全局听写与语音输入

语音 I/O 链路的另一半。在系统的任何位置按住快捷键、说话、松开——在 macOS 上，转录结果会直接粘贴进当前聚焦的文本框中。或者点击任意 Voicebox 文本框上的麦克风，直接在应用内听写。

- **可配置的组合键** —— 按住说话和点击切换两种组合，均可通过应用内组合键选择器重新绑定。按住按住说话键时点按 `Space`，会在音频不断的情况下升级为切换模式
- **目标感知粘贴（macOS）** —— 经过辅助功能验证的注入到聚焦文本框，并以原子方式保存/恢复剪贴板，不会覆盖您原本的剪贴板内容
- **首次运行的权限引导** —— 应用内引导会带您完成 macOS 辅助功能和输入监控授权，并可深链跳转到系统设置
- **应用内麦克风按钮** —— 每个 Voicebox 文本框（生成表单、配置文件描述、故事标题，凡是需要输入的地方）都带麦克风
- **LLM 润色** —— 可选地在粘贴前清除"嗯"、结巴和口误
- **屏幕悬浮胶囊** —— 浮层展示 `recording`、`transcribing`、`refining` 和 `speaking` 状态。智能体对您说话时用的是同一个胶囊，两个方向共享同一套心智模型

### 语音转文本

Voicebox 使用 OpenAI Whisper 进行转录——听写、Captures 标签页和 `/transcribe` API 都由同一个模型驱动，并根据平台运行在 MLX（Apple Silicon）或 PyTorch（CUDA / ROCm / DirectML / CPU）上。

| 规格                          | 说明                                          |
| ----------------------------- | --------------------------------------------- |
| Base / Small / Medium / Large | 标准 Whisper 质量梯度                         |
| Turbo                         | 比 Whisper Large 快约 8 倍，质量损失极小      |

更多引擎（Parakeet v3、Qwen3-ASR）已在计划中 —— 见[路线图](#路线图)。

### Captures（音频与转录归档）

每一次听写、应用内录音和上传的音频文件都会进入 Captures 标签页——原始音频与转录文本配对保存，永不丢失。

- **回放、重新转录、润色** —— 用任意 Whisper 规格重新运行 STT，或用不同参数（清除填充词、移除自我更正、保留专业术语）让本地 LLM 重新处理原始转录
- **内联编辑** —— 直接修改转录文本，失焦即保存
- **以声音配置文件播放** —— 一键把任意捕获内容用克隆声音朗读出来
- **提升为声音样本** —— 把捕获内容的音频 + 转录作为任意声音配置文件的参考样本
- **本地保存** —— 原始音频和转录保存在您的 Voicebox 数据目录中，设置里有文件夹快捷入口

### 智能体语音输出

每个智能体都能拥有一个声音。一次工具调用，任何支持 MCP 的智能体就能用您克隆的声音对您说话——任务完成、提问、通知。听写时出现的同一个胶囊也会在智能体说话时出现，您始终能看到机器正在发出什么。

```ts
// 在任何支持 MCP 的智能体中：
await voicebox_speak({
  text: "部署完成。",
  profile: "Morgan",
});
```

同时也以 `POST /speak` 暴露给不使用 MCP 的场景——ACP、A2A、Shell 脚本、自定义 harness。

- **双向胶囊** —— `recording`、`transcribing`、`refining` 和 `speaking` 都是同一个系统级浮层的状态，听写和智能体语音输出共用同一个界面
- **按智能体绑定声音** —— 在 **设置 → MCP** 中把 Claude Code 固定到 Morgan、把 Cursor 固定到 Scarlett，不看屏幕也能分辨是哪个智能体在说话。每个客户端的 `last_seen_at` 时间戳可确认安装确实生效
- **始终可见** —— 没有静默的后台 TTS；每次智能体发起的说话都会在整个时长内显示带声音配置文件名称的胶囊
- **HTTP + stdio 两种传输** —— 在 Claude Code / Cursor / Windsurf / VS Code MCP 中作为 URL 安装，或让只支持 stdio 的客户端指向内置的 `voicebox-mcp` 二进制文件

### 声音人格

为任何声音配置文件附加自由书写的人格——这个声音是谁、如何说话、在意什么。设置人格后，生成框上会出现两个动作，由完全本地运行的内置 Qwen3 LLM 驱动。

- **撰写（Compose）** —— 一个随机按钮，往文本框里投放一句全新的角色台词；修改后朗读，或再点一次换个版本
- **以角色身份说话** —— 一个开关，把您输入的文本先交给人格 LLM 改写成该角色的口吻，再送进 TTS

智能体可以通过 MCP 向 `voicebox_speak` 传入 `personality: true` 走上同一条改写路径，把该工具变成"文本输入 → 人格 LLM → TTS"的流水线。听写的润色步骤也由同一个 LLM 驱动——应用内只有一个 LLM、一份模型缓存、一份显存占用。

**本地 LLM 选项：** Qwen3 0.6B / 1.7B / 4B，与 TTS 共用运行时（Apple Silicon 上为 MLX，其他平台为 PyTorch）。

适用场景：智能体开发循环（口述问题，用克隆声音听答案）、游戏与叙事工具中的交互角色、为无法用原本声音说话的人提供语音辅助。

### 模型管理

- 每个模型卸载以释放 GPU 内存而不删除下载
- 通过 `VOICEBOX_MODELS_DIR` 自定义模型目录
- 带有进度追踪的模型文件夹迁移
- 下载取消/清除 UI

### GPU 支持

| 平台                  | 后端           | 说明                                                |
| --------------------- | -------------- | --------------------------------------------------- |
| macOS (Apple Silicon) | MLX (Metal)    | 通过神经引擎提升 4-5 倍速度                         |
| Windows (NVIDIA)      | PyTorch (CUDA) | 自动从应用内下载 CUDA 二进制文件                    |
| Linux (NVIDIA)        | PyTorch (CUDA) | 需要本地/远程 Python 后端配合 CUDA 版 PyTorch       |
| Linux (AMD)           | PyTorch (ROCm) | 自动配置 HSA_OVERRIDE_GFX_VERSION                   |
| Windows (任何 GPU)    | DirectML       | 通用 Windows GPU 支持                               |
| Intel Arc             | IPEX/XPU       | Intel 独立 GPU 加速                                 |
| 任意                  | CPU            | 处处可用，只是较慢                                  |

---

## API

Voicebox 提供 REST API，用于把语音 I/O 集成到您自己的应用和智能体中。

```bash
# 生成语音
curl -X POST http://127.0.0.1:17493/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "profile_id": "abc123", "language": "en"}'

# 智能体语音输出 —— 任何应用或脚本都能用克隆声音说话
curl -X POST http://127.0.0.1:17493/speak \
  -H "Content-Type: application/json" \
  -H "X-Voicebox-Client-Id: my-script" \
  -d '{"text": "部署完成。", "profile": "Morgan"}'

# 转录音频文件
curl -X POST http://127.0.0.1:17493/transcribe \
  -F "audio=@recording.wav" \
  -F "model=whisper-turbo"

# 列出声音配置文件
curl http://127.0.0.1:17493/profiles
```

`POST /speak` 的 `profile` 可以是名称（不区分大小写）或 id，其解析优先级与 MCP 工具一致：显式参数 → 按客户端绑定 → `capture_settings.default_playback_voice_id`。

### MCP 服务器

Voicebox 内置 **Model Context Protocol** 服务器，因此任何支持 MCP 的智能体（Claude Code、Cursor、Windsurf、Cline、VS Code MCP 扩展）都能说话、转录，并浏览 Captures 和配置文件。

**Claude Code 一行命令：**

```
claude mcp add voicebox \
  --transport http \
  --url http://127.0.0.1:17493/mcp \
  --header "X-Voicebox-Client-Id: claude-code"
```

**任何 HTTP MCP 客户端**（Cursor、Windsurf、VS Code 等）：

```json
{
  "mcpServers": {
    "voicebox": {
      "url": "http://127.0.0.1:17493/mcp",
      "headers": { "X-Voicebox-Client-Id": "cursor" }
    }
  }
}
```

**stdio 兜底方案**，适用于不支持 HTTP MCP 的客户端——指向应用内置的 `voicebox-mcp` 二进制文件：

```json
{
  "mcpServers": {
    "voicebox": {
      "command": "/Applications/Voicebox.app/Contents/MacOS/voicebox-mcp",
      "env": { "VOICEBOX_CLIENT_ID": "claude-desktop" }
    }
  }
}
```

内置四个工具：`voicebox_speak`、`voicebox_transcribe`、`voicebox_list_captures`、`voicebox_list_profiles`。按客户端的声音绑定在 **Voicebox → 设置 → MCP** 中管理。工具签名、解析优先级、说话胶囊约定和安全说明请参阅[完整 MCP 指南](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/mcp-server.mdx)。

```ts
// 在任何支持 MCP 的智能体中：
await voicebox_speak({
  text: "测试通过，可以合并了。",
  profile: "Morgan",      // 可选 —— 缺省时使用按客户端绑定
  personality: true,      // 可选 —— 先用该配置文件的人格 LLM 改写文本
});
```

**用例：** 智能体开发循环（语音进、语音出）、游戏对话、播客制作、辅助工具、语音助手、内容自动化。

完整 API 文档请访问 `http://127.0.0.1:17493/docs`。

---

## 技术栈

| 层级       | 技术                                                                                  |
| ---------- | ------------------------------------------------------------------------------------- |
| 桌面应用   | Tauri (Rust)                                                                          |
| 前端       | React、TypeScript、Tailwind CSS                                                       |
| 状态管理   | Zustand、React Query                                                                  |
| 后端       | FastAPI (Python)                                                                      |
| TTS 引擎   | Qwen3-TTS、Qwen CustomVoice、Qwen VoiceDesign、LuxTTS、Chatterbox、Chatterbox Turbo、TADA、Kokoro |
| 语音转文本 | Whisper / Whisper Turbo (PyTorch 或 MLX)                                              |
| 本地 LLM   | Qwen3（0.6B / 1.7B / 4B），与 TTS / STT 共用运行时                                     |
| MCP 服务器 | FastMCP 挂载在 `/mcp`（Streamable HTTP）+ 内置 stdio 垫片二进制                        |
| 原生层     | Rust（Tauri 内部），负责全局快捷键、粘贴注入和焦点探测                                |
| 效果       | Pedalboard (Spotify)                                                                  |
| 推理       | MLX (Apple Silicon) / PyTorch (CUDA/ROCm/XPU/CPU)                                     |
| 数据库     | SQLite                                                                                |
| 音频       | WaveSurfer.js、librosa                                                                |

---

## 路线图

| 功能                     | 描述                                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| **Windows / Linux 自动粘贴** | 听写粘贴对齐 —— Windows 上使用 `SendInput`，Linux 上使用 `uinput` / AT-SPI |
| **STT 引擎扩展**         | Parakeet v3 和 Qwen3-ASR 加入 Whisper —— 50+ 语言，更好的非英语质量   |
| **流水线路由**           | 可配置的 来源 → 变换 → 输出 链路，带 Webhook 和 MCP 输出，以及预设编辑器 |
| **流式转录**             | WebSocket `/transcribe/stream`，边说话边返回部分转录                  |
| **端到端语音 LLM**       | Moshi、GLM-4-Voice、Qwen2.5 Omni —— 真正的语音到语音，中间没有文本    |
| **语音设计**             | 从文本描述创建新声音                                                  |
| **长篇捕获**             | 双流录音（麦克风 + 系统音频），带摘要 LLM 变换                        |
| **平台输出**             | Apple Notes、Obsidian 及其他可选集成                                  |
| **插件架构**             | 用自定义模型、变换和输出扩展                                          |
| **移动伴侣**             | 从手机控制 Voicebox                                                   |

完整的工程状态、开放 issue 分诊和优先级工作队列请见 [`docs/PROJECT_STATUS.md`](https://github.com/jamiepine/voicebox/blob/main/docs/PROJECT_STATUS.md) —— 一份持续更新的文档，记录已经交付的内容、正在进行的工作、正在评估的候选 TTS 引擎，以及我们接受或推迟某些集成的理由。

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

**先决条件：** [Bun](https://bun.sh)、[Rust](https://rustup.rs)、[Python 3.12](https://python.org)、[Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)，以及 macOS 上的 [Xcode](https://developer.apple.com/xcode/)。

仓库根部预置了 `.mcp.json` —— 在这个检出目录中运行 Claude Code，开发版应用启动后即可自动获得 Voicebox 的 MCP 工具。

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
└── scripts/          # 构建和发布脚本
```

---

## 中文站开发

本站是纯静态站点：[Astro](https://astro.build/) + [Nimbus](https://nimbus-docs.com/) 负责文档站，[Bun](https://bun.com) 负责依赖安装与构建。

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # 输出 dist/
```

- 落地页：`src/pages/index.astro`
- 文档内容：`src/content/docs/docs/**/*.mdx`
- 站点与侧边栏配置：`astro.config.ts`
- 文档校对：`bun run lint:docs`；类型检查：`bun run typecheck`
- 推送 `main` 后由 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages（自定义域名 `voicebox.ndjp.net`，CNAME 在 `public/CNAME`）

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
