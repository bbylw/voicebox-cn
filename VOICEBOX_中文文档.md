# Voicebox 文档

Voicebox 是一个本地优先的 AI 语音工作室——在一个应用里同时替代 ElevenLabs 和 WisprFlow 的免费开源方案。只需几秒钟的音频即可克隆声音，用 8 种 TTS 引擎生成 23 种语言的语音，用全局快捷键听写进任何文本框，并为任何支持 MCP 的 AI 智能体赋予你选择的声音。

## 目录

- [简介](#简介)
- [核心特性](#核心特性)
- [下载与安装](#下载与安装)
- [快速开始](#快速开始)
- [功能详解](#功能详解)
- [API 参考](#api-参考)
- [技术栈](#技术栈)
- [开发指南](#开发指南)
- [路线图](#路线图)
- [常见问题](#常见问题)
- [贡献](#贡献)
- [安全](#安全)
- [许可证](#许可证)

---

## 简介

Voicebox 是一个本地优先的 AI 语音工作室，在一个应用里同时作为 ElevenLabs（输出侧）和 WisprFlow（输入侧）的免费开源替代方案。它支持从几秒钟的音频中克隆声音，使用 8 种 TTS 引擎生成 23 种语言的语音，用全局快捷键把语音听写进任何应用，并让任何支持 MCP 的智能体用你克隆的声音说话。全部处理都在你自己的机器上完成。

### 核心优势

- **完全隐私** - 模型、声音数据和捕获内容保留在您的机器上
- **8 种 TTS 引擎** - Qwen3-TTS、Qwen CustomVoice、Qwen VoiceDesign、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA 和 Kokoro
- **声音克隆与预设音色** - 从参考样本零样本克隆，或通过 Kokoro 和 Qwen CustomVoice 使用 50+ 精选预设音色
- **23 种语言** - 从英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **后处理效果** - 变调、混响、延迟、合唱、压缩和滤波器
- **富有表现力的语音** - 通过 Chatterbox Turbo 支持 [laugh]、[sigh]、[gasp] 等副语言标签；通过 Qwen CustomVoice 用自然语言控制语气；通过 Qwen VoiceDesign 用一段描述创造声音
- **无限长度** - 自动分块并交叉淡入淡出，适用于脚本、文章和章节
- **故事编辑器** - 用于对话、播客和叙述的多轨时间线
- **语音输入** - 全局听写快捷键（按住说话 / 点击切换）、macOS 上经过辅助功能验证的自动粘贴、每个文本框都有应用内麦克风、基于 Whisper 的语音转文本
- **智能体语音输出** - 一次工具调用（voicebox_speak），任何支持 MCP 的智能体就能用你克隆的声音对您说话
- **声音人格** - 为任何声音配置文件附加自由书写的人格，通过内置本地 LLM 进行撰写、改写或回应，智能体也能通过 MCP 调用
- **API 优先** - REST API 加内置 MCP 服务器，用于将语音 I/O 集成到您自己的应用和智能体中
- **原生性能** - 使用 Tauri (Rust) 构建，而非 Electron
- **跨平台运行** - macOS (MLX/Metal)、Windows (CUDA)、Linux、AMD ROCm、Intel Arc、Docker

---

## 核心特性

### 多引擎声音克隆

八种 TTS 引擎，各具特色，可按需切换：

| 引擎                        | 支持语言 | 优势                                                                                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Qwen3-TTS** (0.6B / 1.7B) | 10 种    | 高质量多语言克隆，支持表达指令（"慢慢说"、"耳语"）                                                                            |
| **Qwen CustomVoice**        | 10 种    | 9 种精选预设音色，可用自然语言控制语气——无需参考音频                                                                          |
| **Qwen VoiceDesign**        | 10 种    | 根据一段文字描述构建声音——无需参考音频，也无需预设                                                                            |
| **LuxTTS**                  | 英语     | 轻量级（约 1GB VRAM），48kHz 输出，CPU 上 150 倍实时速度                                                                      |
| **Chatterbox Multilingual** | 23 种    | 最广泛的语言覆盖 - 阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| **Chatterbox Turbo**        | 英语     | 快速 350M 模型，支持副语言情感/声音标签                                                                                       |
| **TADA** (1B / 3B)          | 10 种    | HumeAI语音 - 语言模型，700 秒 + 连贯音频，文本 - 声学双重对齐                                                                 |
| **Kokoro**                  | 8 种     | 50 种精选预设音色，仅 82M 的微型模型，CPU 推理快速                                                                            |

### 情感与副语言标签

只有 **Chatterbox Turbo** 会解析 `[laugh]`、`[sigh]` 这类副语言标签。Qwen3-TTS、LuxTTS、Chatterbox Multilingual 和 HumeAI TADA 会把它们当作普通文本读出来。

选中 Chatterbox Turbo 后，在文本输入框中输入 `/` 即可打开标签插入器，把表达性标签内联到语音里：

**声音：**
```
[laugh] [chuckle] [gasp] [cough] [sigh] [groan] [sniff] [shush] [clear throat]
```

**语气：**
```
[angry] [crying] [dramatic] [fear] [happy] [narration] [sarcastic] [surprised] [whispering] [advertisement]
```

### 后处理效果

8 种音频效果，由 Spotify 的 pedalboard 库提供支持。生成后应用，实时预览，构建可重复使用的预设。

| 效果                           | 描述                           |
| ------------------------------ | ------------------------------ |
| **变调 (Pitch Shift)**         | 上下调整最多 12 个半音         |
| **混响 (Reverb)**              | 可配置的房间大小、阻尼、干湿比 |
| **延迟 (Delay)**               | 带有可调时间、反馈和混合的回声 |
| **合唱/镶边 (Chorus/Flanger)** | 调制延迟，产生金属或丰富质感   |
| **压缩器 (Compressor)**        | 动态范围压缩                   |
| **增益 (Gain)**                | 音量调整（-40 到 +40 dB）      |
| **高通滤波器**                 | 移除低频                       |
| **低通滤波器**                 | 移除高频                       |

内置 4 种预设（机器人、广播、回声室、低沉声音），支持自定义预设。效果可以分配给每个配置文件作为默认值。

### 无限生成长度

文本在句子边界处自动分割，每个块独立生成，然后交叉淡入淡出。适用于所有引擎。

- 可配置的自动分块限制（100-5,000 字符）
- 交叉淡入淡出滑块（0-200ms），实现平滑过渡
- 最大文本长度：50,000 字符
- 智能分割尊重缩写、中文标点符号和 [tags]

### 生成版本管理

每个生成支持多个版本并追踪来源：

- **Original（原始）** - 干净的 TTS 输出，始终保留
- **Effects versions（效果版本）** - 从任何源版本应用不同的效果链
- **Takes（录制版本）** - 使用新种子重新生成以获得变化
- **Source tracking（来源追踪）** - 每个版本记录其谱系
- **Favorites（收藏）** - 标记生成的内容以便快速访问

### 异步生成队列

生成是非阻塞的。提交后立即开始输入下一个。

- 串行执行队列防止 GPU 争用
- 实时 SSE 状态流
- 失败的生成可以重试
- 崩溃产生的过时生成在启动时自动恢复

### 声音配置文件管理

- 从音频文件创建配置文件或直接录制
- 导入/导出配置文件以分享或备份
- 多采样支持更高质量的克隆
- 每个配置文件默认效果链
- 通过描述和语言标签组织

### 故事编辑器

用于对话、播客和叙述的多轨时间线编辑器。

- 多轨创作，支持拖放
- 内联音频修剪和分割
- 自动播放与同步播放头
- 每个轨道剪辑的版本固定

### 全局听写与语音输入

语音 I/O 链路的另一半。在系统的任何位置按住快捷键、说话、松开——在 macOS 上，转录结果会直接粘贴进当前聚焦的文本框。也可以点击任意 Voicebox 文本框上的麦克风，直接在应用内听写。

- **可配置的组合键** —— 按住说话和点击切换两种组合，都可在应用内的组合键选择器里重新绑定。按住"按住说话"键的过程中点按空格，会在音频不断的情况下升级为切换模式
- **目标感知粘贴（macOS）** —— 经过辅助功能验证，文本会注入到聚焦的文本框，并以原子方式保存/恢复剪贴板，不会覆盖原有内容
- **首次运行权限引导** —— 应用内引导会带您完成 macOS 辅助功能与输入监控授权，并可深链跳转到系统设置
- **应用内麦克风按钮** —— 每个 Voicebox 文本框（生成表单、配置文件描述、故事标题，凡是需要输入的地方）都有麦克风
- **LLM 润色** —— 可选地在粘贴前清除"嗯"、结巴和口误
- **屏幕悬浮胶囊** —— 浮层展示 recording、transcribing、refining 和 speaking 状态。智能体对您说话时用的是同一个胶囊，两个方向共享一套心智模型

### 语音转文本

Voicebox 使用 OpenAI Whisper 进行转录——听写、Captures 标签页和 /transcribe API 都由同一个模型驱动，并根据平台运行在 MLX（Apple Silicon）或 PyTorch（CUDA / ROCm / DirectML / CPU）上。

| 规格                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| Base / Small / Medium / Large | 标准 Whisper 质量梯度                    |
| Turbo                         | 比 Whisper Large 快约 8 倍，质量损失极小 |

更多引擎（Parakeet v3、Qwen3-ASR）已在计划中，详见[路线图](#路线图)。

### Captures（音频与转录归档）

每一次听写、应用内录音和上传的音频文件都会进入 Captures 标签页——原始音频与转录文本配对保存，永不丢失。

- **回放、重新转录、润色** —— 用任意 Whisper 规格重新运行 STT，或用不同参数（清除填充词、移除自我更正、保留专业术语）让本地 LLM 重新处理原始转录
- **内联编辑** —— 直接修改转录文本，失焦即保存
- **以声音配置文件播放** —— 一键把任意捕获内容用克隆声音朗读出来
- **提升为声音样本** —— 把捕获内容的音频 + 转录用作任意声音配置文件的参考样本
- **本地保存** —— 原始音频和转录保存在您的 Voicebox 数据目录中，设置里有文件夹快捷入口

### 智能体语音输出

每个智能体都能拥有一个声音。一次工具调用，任何支持 MCP 的智能体就能用你克隆的声音对您说话——任务完成、提问、通知。听写时出现的同一个胶囊也会在智能体说话时出现，您始终能看到机器正在发出什么。

```ts
// 在任何支持 MCP 的智能体中：
await voicebox_speak({
  text: "部署完成。",
  profile: "Morgan",
});
```

同时也以 POST /speak 暴露给不使用 MCP 的场景——ACP、A2A、Shell 脚本、自定义 harness。

- **双向胶囊** —— recording、transcribing、refining 和 speaking 都是同一个系统级浮层的状态，听写和智能体语音输出共用同一个界面
- **按智能体绑定声音** —— 在 设置 → MCP 里把 Claude Code 固定到 Morgan、把 Cursor 固定到 Scarlett，不看屏幕也能分辨是谁在说话。每个客户端的 last_seen_at 时间戳可确认安装确实生效
- **始终可见** —— 没有静默的后台 TTS；每次智能体发起的朗读都会在整个时长内显示带声音配置文件名称的胶囊
- **HTTP + stdio 两种传输** —— 在 Claude Code / Cursor / Windsurf / VS Code MCP 中作为 URL 安装，或让只支持 stdio 的客户端指向内置的 voicebox-mcp 二进制文件

### 声音人格

为任何声音配置文件附加自由书写的人格——这个声音是谁、如何说话、在意什么。设置人格后，生成框上会出现两个动作，由完全本地运行的内置 Qwen3 LLM 驱动。

- **撰写（Compose）** —— 一个随机按钮，往文本框里投放一句全新的角色台词；修改后朗读，或再点一次换个版本
- **以角色身份说话** —— 一个开关，把您输入的文本先交给人格 LLM 改写成该角色的口吻，再送进 TTS

智能体可以通过 MCP 向 voicebox_speak 传入 personality: true 走上同一条改写路径，把该工具变成"文本输入 → 人格 LLM → TTS"的流水线。听写的润色步骤也由同一个 LLM 驱动——应用内只有一个 LLM、一份模型缓存、一份显存占用。

**本地 LLM 选项：** Qwen3 0.6B / 1.7B / 4B，与 TTS 共用运行时（Apple Silicon 上为 MLX，其他平台为 PyTorch）。

适用场景：智能体开发循环（口述问题，用克隆声音听答案）、游戏与叙事工具中的交互角色、为无法用原本声音说话的人提供语音辅助。

### 模型管理

- 每个模型卸载以释放 GPU 内存，而无需删除下载
- 通过 VOICEBOX_MODELS_DIR 自定义模型目录
- 模型文件夹迁移，带进度追踪
- 下载取消/清除 UI

### GPU 支持

| 平台                     | 后端           | 说明                              |
| ------------------------ | -------------- | --------------------------------- |
| macOS (Apple Silicon)    | MLX (Metal)    | 通过神经引擎提速 4-5 倍           |
| Windows (NVIDIA)         | PyTorch (CUDA) | 应用内自动下载 CUDA 二进制文件    |
| Linux (NVIDIA)           | PyTorch (CUDA) | 需要本地/远程 Python 后端配合 CUDA 版 PyTorch |
| Linux (AMD)              | PyTorch (ROCm) | 自动配置 HSA_OVERRIDE_GFX_VERSION |
| Windows (任意 GPU)       | DirectML       | 通用 Windows GPU 支持             |
| Intel Arc                | IPEX/XPU       | Intel 独立 GPU 加速               |
| 任意平台                 | CPU            | 随处可用，只是较慢                |

---

## 下载与安装

### 系统要求

- **操作系统**: macOS、Windows、Linux
- **Python**: 3.12
- **GPU**: 可选（推荐 NVIDIA CUDA、AMD ROCm、Intel Arc）
- **内存**: 至少 8GB RAM（推荐 16GB+）
- **存储空间**: 根据安装的模型，建议至少 10GB 可用空间

### 下载安装

| 平台                  | 下载                |
| --------------------- | ------------------- |
| macOS (Apple Silicon) | 下载 DMG            |
| macOS (Intel)         | 下载 DMG            |
| Windows               | 下载 MSI            |
| Docker                | `docker compose up` |

> **注意**: Linux 预构建二进制文件暂不可用。查看源码编译安装说明。

> **遇到问题？** 请查看[故障排查指南](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/troubleshooting.mdx)，覆盖常见的安装、生成、模型下载和 GPU 问题。

### Docker 安装

```bash
docker compose up
```

### 从源码构建（Linux）

```bash
git clone https://github.com/jamiepine/voicebox.git
cd voicebox

# 安装依赖
just setup   # 创建 Python 虚拟环境，安装所有依赖
just dev     # 启动后端 + 桌面应用
```

安装 just 工具：
```bash
# macOS
brew install just

# 或使用 Cargo
cargo install just
```

查看所有命令：
```bash
just --list
```

---

## 快速开始

### 第一步：下载并安装

根据您的平台下载相应的安装包：

- **macOS**: 下载 DMG 文件并拖拽到应用程序文件夹
- **Windows**: 下载 MSI 安装程序并运行
- **Linux**: 按照上述源码构建说明操作

### 第二步：启动 Voicebox

安装完成后，启动 Voicebox 应用程序。

### 第三步：创建第一个声音配置文件

1. 点击"新建配置文件"
2. 上传几秒钟的音频样本（或使用内置麦克风录制）
3. 为配置文件命名并添加描述
4. 选择默认语言

### 第四步：生成语音

1. 在文本输入框中输入文本
2. 选择您创建的声音配置文件
3. 选择 TTS 引擎和语言
4. 点击"生成"按钮
5. 等待生成完成并播放结果

### 第五步：应用效果（可选）

1. 在效果面板中选择要应用的效果
2. 调整参数直到满意
3. 保存为预设以便将来使用

### 第六步：开启全局听写（可选）

1. 打开设置中的听写选项，授予 macOS 辅助功能与输入监控权限（首次运行会有引导）
2. 在任意应用中按住"按住说话"组合键说话，松开即可把转录粘贴到当前文本框
3. 按住过程中点按空格，可切换为持续录音的切换模式
4. 所有听写都会进入 Captures 标签页，可回放、重新转录或润色

### 第七步：接入 AI 智能体（可选）

1. 确保桌面应用正在运行（后端默认监听 127.0.0.1:17493）
2. 在 Claude Code 中执行：`claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header "X-Voicebox-Client-Id: claude-code"`
3. 在 设置 → MCP 中为每个客户端绑定默认声音
4. 之后智能体调用 voicebox_speak 就会用该声音对您说话

### 提示与技巧

- 使用 `/` 插入情感标签（如 `[laugh]`），仅 Chatterbox Turbo 会解析
- 想要自然语言控制语气，试试 Qwen CustomVoice；想用文字描述造声音，试试 Qwen VoiceDesign
- 对于长文本，启用自动分块功能
- 尝试不同的 TTS 引擎以获得最佳效果
- 保存常用的效果组合为预设

---

## 功能详解

### 声音克隆工作流程

#### 从零开始创建声音

1. **准备音频样本**
   - 至少 3-10 秒的清晰语音
   - 背景噪音越小越好
   - 建议使用高质量的麦克风录制

2. **创建配置文件**
   ```
   主页 → 新建配置文件 → 上传音频 → 命名 → 保存
   ```

3. **优化克隆质量**
   - 使用多个音频样本（最多 5 个）
   - 确保样本涵盖不同的音调和情感
   - 选择与目标语音匹配的 TTS 引擎

#### 导入/导出配置文件

**导出:**
```
配置文件列表 → 右键点击 → 导出 → 选择保存位置
```

**导入:**
```
配置文件列表 → 导入 → 选择 .voicebox 文件 → 确认
```

### 高级文本处理

#### 情感标签语法

Chatterbox Turbo 支持以下标签：

```text
你好 [laugh] 这是一个测试 [gasp] 真的很酷！
[sigh] 有时候就是这样 [chuckle]
[cough] 抱歉 [clear throat] 让我重新开始
```

#### 长文本处理

对于超过 1000 字符的文本：

1. 启用"自动分块"选项
2. 设置分块大小（建议 300-500 字符）
3. 调整交叉淡入淡出时间（50-100ms）
4. 生成将分段处理并无缝连接

#### 多语言混合

在某些引擎中，可以混合语言：

```text
Hello 你好 Bonjour こんにちは
```

系统会自动检测并适当处理每种语言。

### 效果链构建

#### 创建效果预设

1. 按顺序添加效果
2. 调整每个效果的参数
3. 点击"保存预设"
4. 命名并分类

#### 常用效果链示例

**机器人声音:**
```
变调 (-12 半音) → 合唱 → 混响 (小房间)
```

**广播质量:**
```
高通滤波器 (80Hz) → 压缩器 → 低通滤波器 (8kHz)
```

**空灵效果:**
```
混响 (大房间) → 延迟 → 合唱
```

### 故事编辑器使用指南

#### 创建多轨项目

1. 新建故事项目
2. 为每个说话者添加轨道
3. 拖放音频片段到轨道
4. 调整片段位置和长度
5. 使用时间线播放头预览

#### 精确编辑技巧

- **修剪**: 拖动片段边缘
- **分割**: 在播放头位置按 S 键
- **移动**: 拖动片段到新位置
- **淡入/淡出**: 拖动片段角落

### 听写使用指南

#### 组合键与两种模式

| 模式           | macOS 默认              | Windows 默认             | 行为                                   |
| -------------- | ----------------------- | ------------------------ | -------------------------------------- |
| **按住说话**   | 右 ⌘ + 右 ⌥             | 右 Ctrl + 右 Shift       | 松开组合键即停止录音                   |
| **点击切换**   | 按住说话组合键 + 空格   | 按住说话组合键 + 空格    | 再点一次组合键才停止录音               |

按住"按住说话"键的过程中点按空格，会无缝升级为切换模式，音频不会中断——短句更快，长篇口述更省手。

#### 权限与粘贴（macOS）

1. 首次听写时，应用内引导会让您授予"辅助功能"和"输入监控"权限
2. 授权后，转录文本会自动粘贴到**开始说话时**聚焦的文本框（而不是说话过程中焦点漂移到的位置）
3. 粘贴时以原子方式保存并恢复剪贴板，不会覆盖您原本复制的内容

Windows / Linux 的自动粘贴仍在路线图中，目前可先使用 Captures 标签页复制转录文本。

### Captures 工作流

1. 在 Captures 标签页查看所有听写、录音和上传的音频（每行带来源标记）
2. 点击任意条目进入详情：波形播放器 + 转录文本
3. 用不同的 Whisper 规格重新转录，或用不同参数让本地 LLM 重新润色
4. 直接编辑转录文本，失焦即保存
5. 一键"以声音配置文件播放"，或"提升为声音样本"用于克隆

### 声音人格设置

1. 打开某个声音配置文件，填写人格描述（这个声音是谁、说话风格、在意什么）
2. 生成框上会出现"撰写"按钮和"以角色身份说话"开关
3. "撰写"会随机生成一句符合角色的台词；"以角色身份说话"会先改写您输入的文本再合成
4. 需要时可切换本地 LLM 规格：Qwen3 0.6B / 1.7B / 4B

### MCP 服务器配置

| 客户端                                 | 接入方式                                                          |
| -------------------------------------- | ----------------------------------------------------------------- |
| Claude Code                            | `claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header "X-Voicebox-Client-Id: claude-code"` |
| Cursor / Windsurf / VS Code 等 HTTP MCP 客户端 | 在 MCP 配置中填写 url 与 X-Voicebox-Client-Id 请求头        |
| 仅支持 stdio 的客户端                  | 指向应用内置的 voicebox-mcp 二进制文件，并设置 VOICEBOX_CLIENT_ID |

内置工具：`voicebox_speak`（说话）、`voicebox_transcribe`（转录）、`voicebox_list_captures`（列出捕获）、`voicebox_list_profiles`（列出配置文件）。

声音解析优先级：显式传入的 profile 参数 → 按客户端绑定 → 默认播放声音（capture_settings.default_playback_voice_id）。

---

## API 参考

Voicebox 提供完整的 REST API，用于将语音合成功能集成到您自己的应用中。

### 基础信息

**默认端口**: `17493`

**基础 URL**: `http://127.0.0.1:17493`

**API 文档**: `http://127.0.0.1:17493/docs`

### 认证

当前版本不需要认证（本地运行）。

### 端点

#### 1. 生成语音

```bash
POST /generate
```

**请求体:**
```json
{
  "text": "你好世界",
  "profile_id": "abc123",
  "language": "zh",
  "engine": "chatterbox_multilingual",
  "effects_preset": null,
  "chunk_size": 300,
  "crossfade_ms": 50
}
```

**响应:**
```json
{
  "generation_id": "gen_456",
  "status": "queued",
  "audio_url": "/audio/gen_456.wav"
}
```

#### 2. 列出声音配置文件

```bash
GET /profiles
```

**响应:**
```json
[
  {
    "id": "abc123",
    "name": "我的声音",
    "language": "zh",
    "created_at": "2024-01-01T00:00:00Z",
    "sample_count": 3
  }
]
```

#### 3. 创建配置文件

```bash
POST /profiles
Content-Type: multipart/form-data
```

**表单数据:**
```
name: "我的声音"
language: "zh"
description: "这是我的中文声音"
audio_files: [file1.wav, file2.wav]
```

#### 4. 删除配置文件

```bash
DELETE /profiles/{profile_id}
```

#### 5. 获取生成状态

```bash
GET /generations/{generation_id}
```

**响应:**
```json
{
  "id": "gen_456",
  "status": "completed",
  "progress": 100,
  "audio_url": "/audio/gen_456.wav",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### 6. 列出生成历史

```bash
GET /generations?limit=20&offset=0
```

#### 7. 应用效果

```bash
POST /effects/apply
```

**请求体:**
```json
{
  "source_generation_id": "gen_456",
  "effects_chain": [
    {
      "type": "pitch_shift",
      "params": {
        "semitones": -5
      }
    },
    {
      "type": "reverb",
      "params": {
        "room_size": 0.8,
        "damping": 0.5,
        "wet_level": 0.3
      }
    }
  ]
}
```

#### 8. 获取可用模型

```bash
GET /models
```

**响应:**
```json
[
  {
    "id": "qwen3_tts",
    "name": "Qwen3-TTS",
    "languages": ["zh", "en", "ja", "ko"],
    "loaded": true
  }
]
```

#### 9. 加载/卸载模型

```bash
POST /models/{model_id}/load
DELETE /models/{model_id}/unload
```

#### 10. 智能体语音输出

```bash
POST /speak
```

供 ACP、A2A、Shell 脚本等不使用 MCP 的场景调用，在扬声器上用指定声音朗读文本，并显示屏幕悬浮胶囊。

**请求头:**
```
X-Voicebox-Client-Id: my-script
```

**请求体:**
```json
{
  "text": "部署完成。",
  "profile": "Morgan",
  "personality": false
}
```

`profile` 可以是名称（不区分大小写）或 id。解析优先级为：显式参数 → 按客户端绑定 → 默认播放声音。

#### 11. 转录音频

```bash
POST /transcribe
Content-Type: multipart/form-data
```

**表单数据:**
```
audio: @recording.wav
model: whisper-turbo
```

**响应:**
```json
{
  "text": "转录出来的文本",
  "language": "zh"
}
```

### MCP 端点

Voicebox 内置 Model Context Protocol 服务器，挂载在 `http://127.0.0.1:17493/mcp`（Streamable HTTP），并内置 stdio 垫片二进制 `voicebox-mcp`。

```bash
# Claude Code
claude mcp add voicebox \
  --transport http \
  --url http://127.0.0.1:17493/mcp \
  --header "X-Voicebox-Client-Id: claude-code"
```

```json
// 其他 HTTP MCP 客户端
{
  "mcpServers": {
    "voicebox": {
      "url": "http://127.0.0.1:17493/mcp",
      "headers": { "X-Voicebox-Client-Id": "cursor" }
    }
  }
}
```

内置四个工具：voicebox_speak、voicebox_transcribe、voicebox_list_captures、voicebox_list_profiles。按客户端的声音绑定在 设置 → MCP 中管理。

### 使用示例

#### Python 示例

```python
import requests
import json

# 生成语音
response = requests.post(
    'http://127.0.0.1:17493/generate',
    json={
        'text': '你好，欢迎使用 Voicebox',
        'profile_id': 'abc123',
        'language': 'zh'
    }
)

result = response.json()
print(f"生成 ID: {result['generation_id']}")

# 下载生成的音频
audio_response = requests.get(
    f"http://127.0.0.1:17493{result['audio_url']}"
)

with open('output.wav', 'wb') as f:
    f.write(audio_response.content)
```

#### JavaScript 示例

```javascript
// 生成语音
const response = await fetch('http://127.0.0.1:17493/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: '你好，欢迎使用 Voicebox',
    profile_id: 'abc123',
    language: 'zh'
  })
});

const result = await response.json();
console.log(`生成 ID: ${result.generation_id}`);

// 播放音频
const audio = new Audio(`http://127.0.0.1:17493${result.audio_url}`);
audio.play();
```

#### cURL 示例

```bash
# 生成语音
curl -X POST http://127.0.0.1:17493/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "你好世界",
    "profile_id": "abc123",
    "language": "zh"
  }'

# 列出配置文件
curl http://127.0.0.1:17493/profiles

# 创建配置文件
curl -X POST http://127.0.0.1:17493/profiles \
  -F "name=我的声音" \
  -F "language=zh" \
  -F "audio_files=@sample.wav"

# 智能体语音输出（用克隆声音朗读）
curl -X POST http://127.0.0.1:17493/speak \
  -H "Content-Type: application/json" \
  -H "X-Voicebox-Client-Id: my-script" \
  -d '{"text": "部署完成。", "profile": "Morgan"}'

# 转录音频文件
curl -X POST http://127.0.0.1:17493/transcribe \
  -F "audio=@recording.wav" \
  -F "model=whisper-turbo"
```

### 错误处理

API 使用标准 HTTP 状态码：

- `200 OK` - 请求成功
- `202 Accepted` - 生成已排队
- `400 Bad Request` - 请求参数错误
- `404 Not Found` - 资源不存在
- `500 Internal Server Error` - 服务器错误

**错误响应格式:**
```json
{
  "error": {
    "code": "INVALID_PROFILE",
    "message": "配置文件 ID 不存在",
    "details": {}
  }
}
```

---

## 技术栈

| 层级           | 技术                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| **桌面应用**   | Tauri (Rust)                                                                          |
| **前端**       | React, TypeScript, Tailwind CSS                                                       |
| **状态管理**   | Zustand, React Query                                                                  |
| **后端**       | FastAPI (Python)                                                                      |
| **TTS 引擎**   | Qwen3-TTS, Qwen CustomVoice, Qwen VoiceDesign, LuxTTS, Chatterbox, Chatterbox Turbo, TADA, Kokoro |
| **效果处理**   | Pedalboard (Spotify)                                                                  |
| **语音转文本** | Whisper / Whisper Turbo (PyTorch 或 MLX)                                              |
| **本地 LLM**   | Qwen3 (0.6B / 1.7B / 4B)，与 TTS / STT 共用运行时                                      |
| **MCP 服务器** | FastMCP 挂载在 /mcp（Streamable HTTP）+ 内置 stdio 垫片二进制                          |
| **原生层**     | Rust（Tauri 内部）：全局快捷键、粘贴注入、焦点探测                                    |
| **推理**       | MLX (Apple Silicon) / PyTorch (CUDA/ROCm/XPU/CPU)                                     |
| **数据库**     | SQLite                                                                                |
| **音频可视化** | WaveSurfer.js, librosa                                                                |

---

## 开发指南

### 环境准备

#### 必需软件

- **Node.js** 和 **Bun**
- **Rust** (最新稳定版)
- **Python** 3.12
- **Tauri 依赖** (参见 Tauri 文档)
- **Xcode** (仅限 macOS)

#### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/jamiepine/voicebox.git
cd voicebox

# 使用 just（推荐）
just setup

# 或手动安装
bun install
cd backend && pip install -r requirements.txt && cd ..
```

仓库根部预置了 `.mcp.json`：在这个检出目录里运行 Claude Code，开发版应用启动后即可自动获得 Voicebox 的 MCP 工具。

### 开发模式

```bash
# 启动开发服务器（后端 + 桌面应用）
just dev

# 或分别启动
# 终端 1: 启动后端
cd backend && python main.py

# 终端 2: 启动桌面应用
bun run tauri dev
```

### 构建生产版本

```bash
# 构建 CPU 版本
just build

# Windows: 构建 CPU + CUDA 版本
just build-local
```

### 添加新的声音模型

Voicebox 的多引擎架构使添加新 TTS 引擎变得简单。完整流程包括：

1. **依赖研究** - 确定模型的 Python 包和系统依赖
2. **后端协议实现** - 创建新的引擎适配器
3. **前端集成** - 添加 UI 控件和配置选项
4. **PyInstaller 打包** - 确保模型依赖正确捆绑

详细指南请参考官方贡献文档。

### 项目结构

```
voicebox/
├── app/              # 共享 React 前端
├── tauri/            # 桌面应用 (Tauri + Rust)
├── web/              # Web 部署版本
├── backend/          # Python FastAPI 服务器
└── scripts/          # 构建和发布脚本
```

### 测试

```bash
# 运行测试套件
just test

# 运行特定测试
pytest backend/tests/test_engine.py
```

### 代码风格

项目使用标准的代码风格工具：

- **Python**: Black + Flake8
- **TypeScript**: ESLint + Prettier
- **Rust**: rustfmt + Clippy

---

## 路线图

Voicebox 正在积极开发中。计划中的功能包括：

| 功能                         | 描述                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| **Windows / Linux 自动粘贴** | 听写粘贴对齐——Windows 上使用 SendInput，Linux 上使用 uinput / AT-SPI      |
| **STT 引擎扩展**             | Parakeet v3 和 Qwen3-ASR 加入 Whisper，覆盖 50+ 语言，提升非英语质量      |
| **流水线路由**               | 可配置的 来源 → 变换 → 输出 链路，带 Webhook 与 MCP 输出以及预设编辑器    |
| **流式转录**                 | WebSocket /transcribe/stream，边说话边返回部分转录                        |
| **端到端语音 LLM**           | Moshi、GLM-4-Voice、Qwen2.5 Omni——真正的语音到语音，中间没有文本          |
| **语音设计**                 | 从文本描述创建新声音                                                      |
| **长篇捕获**                 | 双流录音（麦克风 + 系统音频），带摘要 LLM 变换                            |
| **平台输出**                 | Apple Notes、Obsidian 及其他可选集成                                      |
| **插件架构**                 | 用自定义模型、变换和输出扩展                                              |
| **移动伴侣应用**             | 从手机控制 Voicebox                                                       |

完整的工程状态、开放 issue 分诊和优先级工作队列请见 [docs/PROJECT_STATUS.md](https://github.com/jamiepine/voicebox/blob/main/docs/PROJECT_STATUS.md)——一份持续更新的文档，记录已交付内容、正在进行的工作、正在评估的候选 TTS 引擎，以及接受或推迟某些集成的理由。

---

## 常见问题

### Q: Voicebox 是完全免费的吗？

A: 是的，Voicebox 是完全免费且开源的，采用 MIT 许可证。

### Q: 需要联网才能使用吗？

A: 不需要。Voicebox是本地优先的，所有处理都在您的机器上完成。首次下载模型时需要网络，之后可以离线使用。

### Q: 支持哪些语言？

A: 最多支持 23 种语言，包括英语、中文、日语、韩语、阿拉伯语、法语、德语、西班牙语、葡萄牙语、意大利语、俄语、印地语、土耳其语等。具体种类取决于所选的 TTS 引擎：Chatterbox Multilingual 覆盖 23 种，Qwen 系列和 TADA 为 10 种，Kokoro 为 8 种，LuxTTS 和 Chatterbox Turbo 仅支持英语。

### Q: 全局听写怎么用？

A: 在任意应用里按住听写组合键（macOS 默认 右 ⌘ + 右 ⌥，Windows 默认 右 Ctrl + 右 Shift）说话，松开即可。macOS 上需要先在应用内引导中授予"辅助功能"和"输入监控"权限，转录文本才会自动粘贴进当前文本框。按住过程中点按空格可切换为持续录音模式。

### Q: 听写内容会保存到哪？

A: 每次听写、应用内录音和上传的音频都会进入 Captures 标签页，原始音频和转录文本成对保存在 Voicebox 数据目录中，可随时回放、重新转录或润色。设置里有该目录的快捷入口。

### Q: 如何让 AI 智能体用我的声音说话？

A: 在 Claude Code 中执行 `claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header "X-Voicebox-Client-Id: claude-code"`，然后在 设置 → MCP 里为该客户端绑定声音配置文件。之后智能体调用 voicebox_speak 就会用该声音朗读，屏幕上会显示悬浮胶囊。不支持 MCP 的场景可以直接调用 POST /speak。

### Q: 8 种引擎该怎么选？

A: 需要多语言克隆选 Qwen3-TTS 或 Chatterbox Multilingual；想立刻开声、不要参考音频，选 Qwen CustomVoice（9 种预设）或 Kokoro（50 种预设，82M 极小模型）；想把一段文字描述变成声音，选 Qwen VoiceDesign；追求速度选 LuxTTS 或 Chatterbox Turbo；需要长音频和强表现力选 TADA。

### Q: 克隆的声音可以用于商业用途吗？

A: 可以。但请确保您拥有用于克隆的原始声音的合法使用权，并遵守当地法律法规。

### Q: 为什么生成速度很慢？

A: 生成速度取决于：
- GPU 性能（推荐使用 NVIDIA CUDA 或 Apple Silicon）
- 选择的 TTS 引擎
- 文本长度和质量
- 系统资源可用性

在 CPU 上运行时，生成速度会明显变慢。

### Q: 如何提高克隆质量？

A: 提高克隆质量的技巧：
1. 使用高质量的音频样本（无背景噪音）
2. 提供多个样本（3-5 个，涵盖不同音调）
3. 样本总时长建议在 30 秒以上
4. 选择适合语言和声音特征的引擎

### Q: 可以在服务器上使用吗？

A: 可以。Voicebox 提供 Docker 支持和 REST API，适合服务器部署。请注意 GPU 资源的分配和管理。

### Q: 如何报告问题或请求功能？

A: 请在 GitHub 仓库提交 Issue 或 Pull Request。

---

## 贡献

我们欢迎各种形式的贡献！

### 如何参与

1. **Fork 仓库**
2. **创建功能分支** (`git checkout -b feature/amazing-feature`)
3. **进行更改**
4. **提交 PR**

### 贡献类型

- 🐛 Bug 修复
- ✨ 新功能
- 📝 文档改进
- 🎨 UI/UX 优化
- 🌍 翻译和本地化
- 🔧 性能优化

### 开发资源

- [贡献指南](https://github.com/jamiepine/voicebox/blob/main/CONTRIBUTING.md)
- [行为准则](https://github.com/jamiepine/voicebox/blob/main/CODE_OF_CONDUCT.md)
- [安全政策](https://github.com/jamiepine/voicebox/blob/main/SECURITY.md)

---

## 安全

如果您发现安全漏洞，请负责任地报告。详见 [SECURITY.md](https://github.com/jamiepine/voicebox/blob/main/SECURITY.md)。

---

## 许可证

MIT License - 详见 [LICENSE](https://github.com/jamiepine/voicebox/blob/main/LICENSE) 文件。

---

## 链接

- **官方网站**: [voicebox.sh](https://voicebox.sh)
- **GitHub 仓库**: [github.com/jamiepine/voicebox](https://github.com/jamiepine/voicebox)
- **完整文档**: [docs.voicebox.sh](https://docs.voicebox.sh)
- **下载页面**: [voicebox.sh/download](https://voicebox.sh/download)
- **功能介绍**: [voicebox.sh/features](https://voicebox.sh/features)
- **API 文档**: [http://127.0.0.1:17493/docs](http://127.0.0.1:17493/docs)
- **故障排查**: [docs/content/docs/overview/troubleshooting.mdx](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/troubleshooting.mdx)
- **工程状态**: [docs/PROJECT_STATUS.md](https://github.com/jamiepine/voicebox/blob/main/docs/PROJECT_STATUS.md)
- **Voicebox 是如何构建的**: [voicebox.sh/built-with-capy](https://voicebox.sh/built-with-capy)

---

## 致谢

感谢所有为 Voicebox 做出贡献的开发者和社区成员！

Voicebox 建立在许多优秀的开源项目之上，包括但不限于：

- Qwen3-TTS / Qwen CustomVoice / Qwen VoiceDesign (阿里巴巴)
- Chatterbox TTS (Resemble AI)
- LuxTTS
- TADA (HumeAI)
- Kokoro
- Qwen3 (本地 LLM，阿里巴巴)
- Whisper (OpenAI)
- Pedalboard (Spotify)
- Tauri
- FastAPI

---

*本文档最后更新：2026 年 11 月 24 日（同步上游 v0.6.0 / 上游提交 8dc2a5b）*
