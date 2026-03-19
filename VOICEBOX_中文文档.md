# Voicebox 文档

Voicebox是一个本地优先的声音克隆工作室——一个免费且开源的 ElevenLabs 替代方案。只需几秒钟的音频即可克隆声音，支持 5 种 TTS 引擎和 23 种语言，可应用后处理效果，并通过时间线编辑器创作多声音项目。

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

---

## 简介

Voicebox是一个本地优先的声音克隆工作室，是 ElevenLabs 的免费开源替代方案。它支持从几秒钟的音频中克隆声音，使用 5 种 TTS 引擎生成 23 种语言的语音，应用后处理效果，并通过时间线编辑器创作多声音项目。

### 核心优势

- **完全隐私** - 模型和声音数据保留在您的机器上
- **5 种 TTS 引擎** - Qwen3-TTS、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo 和 HumeAI TADA
- **23 种语言** - 从英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **后处理效果** - 变调、混响、延迟、合唱、压缩和滤波器
- **富有表现力的语音** - 通过 Chatterbox Turbo 支持 [laugh]、[sigh]、[gasp] 等副语言标签
- **无限长度** - 自动分块并交叉淡入淡出，适用于脚本、文章和章节
- **故事编辑器** - 用于对话、播客和叙述的多轨时间线
- **API 优先** - REST API 用于将语音合成集成到您自己的项目中
- **原生性能** - 使用 Tauri (Rust) 构建，而非 Electron
- **跨平台运行** - macOS (MLX/Metal)、Windows (CUDA)、Linux、AMD ROCm、Intel Arc、Docker

---

## 核心特性

### 多引擎声音克隆

五种 TTS 引擎，各具特色，可按需切换：

| 引擎                        | 支持语言 | 优势                                                                                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Qwen3-TTS** (0.6B / 1.7B) | 10 种    | 高质量多语言克隆，支持表达指令（"慢慢说"、"耳语"）                                                                            |
| **LuxTTS**                  | 英语     | 轻量级（约 1GB VRAM），48kHz 输出，CPU 上 150 倍实时速度                                                                      |
| **Chatterbox Multilingual** | 23 种    | 最广泛的语言覆盖 - 阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| **Chatterbox Turbo**        | 英语     | 快速 350M 模型，支持副语言情感/声音标签                                                                                       |
| **TADA** (1B / 3B)          | 10 种    | HumeAI语音 - 语言模型，700 秒 + 连贯音频，文本 - 声学双重对齐                                                                 |

### 情感与副语言标签

在文本输入中输入 `/` 插入 expressive 标签，模型会在语音中合成这些标签（Chatterbox Turbo）：

```
[laugh] [chuckle] [gasp] [cough] [sigh] [groan] [sniff] [shush] [clear throat]
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

### 录制与转录

- 应用内录制，带波形可视化
- 系统音频捕获（macOS 和 Windows）
- 由 Whisper（包括 Whisper Turbo）驱动的自动转录
- 导出多种格式的录音

### 模型管理

- 每个模型卸载以释放 GPU 内存，而无需删除下载
- 通过 VOICEBOX_MODELS_DIR 自定义模型目录
- 模型文件夹迁移，带进度追踪
- 下载取消/清除 UI

### GPU 支持

| 平台                     | 后端           | 说明                              |
| ------------------------ | -------------- | --------------------------------- |
| macOS (Apple Silicon)    | MLX (Metal)    | 通过神经引擎提速 4-5 倍           |
| Windows / Linux (NVIDIA) | PyTorch (CUDA) | 应用内自动下载 CUDA 二进制文件    |
| Linux (AMD)              | PyTorch (ROCm) | 自动配置 HSA_OVERRIDE_GFX_VERSION |
| Windows (任意 GPU)       | DirectML       | 通用 Windows GPU 支持             |
| Intel Arc                | IPEX/XPU       | Intel 独立 GPU 加速               |
| 任意平台                 | CPU            | 随处可用，只是较慢                |

---

## 下载与安装

### 系统要求

- **操作系统**: macOS、Windows、Linux
- **Python**: 3.11+
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

### 第二步：启动Voicebox

安装完成后，启动Voicebox 应用程序。

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

### 提示与技巧

- 使用 `/` 插入情感标签（如 `[laugh]`）
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

---

## API 参考

Voicebox 提供完整的 REST API，用于将语音合成功能集成到您自己的应用中。

### 基础信息

**默认端口**: `17493`

**基础 URL**: `http://localhost:17493`

**API 文档**: `http://localhost:17493/docs`

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

### 使用示例

#### Python 示例

```python
import requests
import json

# 生成语音
response = requests.post(
    'http://localhost:17493/generate',
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
    f"http://localhost:17493{result['audio_url']}"
)

with open('output.wav', 'wb') as f:
    f.write(audio_response.content)
```

#### JavaScript 示例

```javascript
// 生成语音
const response = await fetch('http://localhost:17493/generate', {
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
const audio = new Audio(`http://localhost:17493${result.audio_url}`);
audio.play();
```

#### cURL 示例

```bash
# 生成语音
curl -X POST http://localhost:17493/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "你好世界",
    "profile_id": "abc123",
    "language": "zh"
  }'

# 列出配置文件
curl http://localhost:17493/profiles

# 创建配置文件
curl -X POST http://localhost:17493/profiles \
  -F "name=我的声音" \
  -F "language=zh" \
  -F "audio_files=@sample.wav"
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

| 层级           | 技术                                                  |
| -------------- | ----------------------------------------------------- |
| **桌面应用**   | Tauri (Rust)                                          |
| **前端**       | React, TypeScript, Tailwind CSS                       |
| **状态管理**   | Zustand, React Query                                  |
| **后端**       | FastAPI (Python)                                      |
| **TTS 引擎**   | Qwen3-TTS, LuxTTS, Chatterbox, Chatterbox Turbo, TADA |
| **效果处理**   | Pedalboard (Spotify)                                  |
| **转录**       | Whisper / Whisper Turbo (PyTorch 或 MLX)              |
| **推理**       | MLX (Apple Silicon) / PyTorch (CUDA/ROCm/XPU/CPU)     |
| **数据库**     | SQLite                                                |
| **音频可视化** | WaveSurfer.js, librosa                                |

---

## 开发指南

### 环境准备

#### 必需软件

- **Node.js** 和 **Bun**
- **Rust** (最新稳定版)
- **Python** 3.11+
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
├── landing/          # 营销网站
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

| 功能             | 描述                           | 状态     |
| ---------------- | ------------------------------ | -------- |
| **实时流式传输** | 边生成边流式传输音频，逐词输出 | 计划中   |
| **声音设计**     | 从文本描述创建新声音           | 计划中   |
| **更多模型**     | XTTS、Bark 和其他开源声音模型  | 社区贡献 |
| **插件架构**     | 扩展自定义模型和效果           | 设计中   |
| **移动伴侣应用** | 从手机控制 Voicebox            | 概念阶段 |
| **实时语音转换** | 实时改变输入语音的音色         | 研究中   |
| **批量处理**     | 批量生成多个音频文件           | 计划中   |
| **云端同步**     | 在设备间同步项目和配置文件     | 考虑中   |

---

## 常见问题

### Q: Voicebox 是完全免费的吗？

A: 是的，Voicebox 是完全免费且开源的，采用 MIT 许可证。

### Q: 需要联网才能使用吗？

A: 不需要。Voicebox是本地优先的，所有处理都在您的机器上完成。首次下载模型时需要网络，之后可以离线使用。

### Q: 支持哪些语言？

A: 支持 23 种语言，包括英语、中文、日语、韩语、阿拉伯语、法语、德语、西班牙语、葡萄牙语、意大利语、俄语、印地语、土耳其语等。具体取决于所选的 TTS 引擎。

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
- **API 文档**: [http://localhost:17493/docs](http://localhost:17493/docs)

---

## 致谢

感谢所有为 Voicebox 做出贡献的开发者和社区成员！

Voicebox 建立在许多优秀的开源项目之上，包括但不限于：

- Qwen3-TTS (阿里巴巴)
- Chatterbox TTS (Resemble AI)
- LuxTTS
- TADA (HumeAI)
- Whisper (OpenAI)
- Pedalboard (Spotify)
- Tauri
- FastAPI

---

*本文档最后更新：2026 年 3 月 19 日*
