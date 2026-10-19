# CNS 2026 Talk — Outline（Slidev，30 分钟）

> 工作文档：每讨论定一段就更新这里。旧的 `../SLIDES.md` 计划不再使用（文件保留）。
> 屏幕上的文字用英文；本文件的说明用中文。

## 项目

- Slidev 项目就在本目录：`slides.md` 是全部内容；`components/` 是页面里的小组件；`public/shots/` 是网站截图。
- 动画片段 `public/anim/*.mp4` 由构建生成（不入库）：Remotion 渲染后按 `../remotion/src/clips.ts` 切片，再复制过来。
- 构建：在仓库根目录运行 `mise run //:build`；预览：`mise run //:dev`，只监听 Tailnet：http://100.83.234.55:3030/ （讲者模式 `/presenter/`，总览 `/overview/`）。
- 发布：推送到 `public` 分支才会触发 GitHub Pages 构建（https://microwave-wyb.github.io/cns-2026/ ）。
- 主题：默认主题加深色模式；视频背景统一为同样的中性灰 `#121212`。

## TODO

- [x] "Our scans vs WiGLE" 的位置已解决：改成 "Why not just use WiGLE?"，放在 "Let defenders see first" 之后、Listen 之前（讲 WiGLE 的局限 → 自建扫描器）。

## 初稿 v2（2026-10-15，最新）

共 49 页；`overview.png` 是旧版缩略图总览，尚未随本次页面调整重新生成。
- 开场 10 页：UCSD 纪录片 → KARR → "That became BLE Theft Auto"（论文背景）→ 第一次投稿只有一个产品，被拒（"lacks scientific novelty"，转述）→ 做了 6 遍，3 个严重漏洞，USENIX 接收 → "If 6 is science… imagine 6,000" → 两格 meme（假论文封面 vs 印满 agent 论文标题的厕纸卷）"not yet another LLM security paper"。
- 第 11 页直接展示互联网已有测量基础：Censys（主机/服务地图）、Shodan（设备/服务搜索）、Shadowserver（扫描与暴露报告），备注含官方来源。删去学生流动转折页，并替换泛化的互联网扫描动画页；衔接由讲者口述，不再增加转折页。
- 核心假设 2 页（原生页，放在"广播结构"之后）："How do we classify all these advertisements?"（名字 / MAC OUI / manufacturer ID / UUID 单独都有歧义）→ "Similar devices → similar advertisements"（车、手表、标签三种形状；形状就是指纹，局限写在备注里）。（"广播高度结构化、不需要 embedding" 和相关工作写在这页备注里。）组件 `components/AdStrip.vue`。
- 管线 12 段视频："Why not just use WiGLE?"（原生页，逐条点出 WiGLE 的局限：只有名字和 MAC、名字只能通配符、随机 MAC 无从匹配、API 不适合复杂查询 → "So we built our own scanner."）放在 "Let defenders see first" 之后、01 Listen 之前；WiGLE 之后只用于验证。每段短视频播完停在最后一帧，方便讲解。片段定义在 `../remotion/src/clips.ts`：
  01 Listen · 02 广播结构 · 03 各不相同 · 04 名字通配符 · 05 同模板成簇 · 06 Company ID → 厂商 · 07 名字 → App · 08 反编译代码 · 09 回到观测数据验证 · 10 全部簇并行 · 11 知识库 · 12 扩大规模。
- More ways in 5 页：13 从 App（AndroZoo 元数据按蓝牙权限预筛）· 14 WiGLE 验证 · 15 从地点（OSM 有急诊的医院，合成数据，XXTag 等占位名）· 16 医院附近明显偏多 → 新线索（候选）· 17 三个来源汇入同一知识库（WiGLE 只做验证）。
- 验证 1 页："Found something suspicious?"（hypothesis → validate → buy the real device → 在买来的设备上读 GATT，作为最终证据）。GATT 已并入第 19 页 "How do we classify all these advertisements?" 的最后一行（not broadcast, may not be legal 🙃），原来单独的 GATT 页已删除。
- 指纹澄清（talk/lookup-fingerprint 分支）：按广播结构聚类只是快速分流（决定先查哪一堆），不是最终指纹；查完后提取具体指纹（厂商 ID + 固定字节、私有 UUID、名字模式）存入知识库。新增原生页 "Look it up"（"Remember it" 之后，新广播 → 知识库 → 产品；名字缺失仍可识别；早期原型，数字只在被问时说）。新增原生页 "What an entry looks like"（"Remember it" 与 "Look it up" 之间，真实的 KARR 知识库条目，只用已公开信息：Markdown + YAML frontmatter，用代码行高亮逐步讲解；company ID/UUID/厂商数据字节仓库里没有公开材料，屏幕上以 … 省略；该页是"屏幕上不放数字/ID"原则的有意例外）；"Look it up" 第二行改为用户改名 "My Car"。总页数 39 → 41。
- 最终版（用真实图片，只留两个例子）：4 "Step 2: find out what's out there" = Furbo 官网真实图（会扔零食的摄像头，来自我们的扫描/wiki）；5 "And sometimes it's this" = Please Pay Inside 论文里的两张真实 skimmer 照片（Figure 1 裹灰色胶管的内置 skimmer、Figure 2 回收的 skimmer 电路板）+ 引用 + grad/undergrads 两句。吊扇页已删；总页数 44。
- 再改：去掉 grad/undergrads 两句（太尴尬），新增 "Step 3: research" 页（pick one → buy it → take it apart → what can it really do?），接在 skimmer 页之后、"One of them, a grad student dug into…" 之前。页数 44 → 45。
- 再改：删掉 "One of them, a grad student dug into…"，换成 3 页真实发现过程："We kept seeing QT"（手机扫描 App 效果图 PhoneScan.vue，列表里满是 QT XXXXXXXX → what is QT?）→ "So we checked WiGLE…"（真实数据：caralarm-paper 里的 WiGLE QT 下载，圣地亚哥县约 14.8 万条记录画在 OSM 深色底图上，右边是打码的 "QT XXXXXXXX" 列表；QtMap.vue 已不再使用）→ "So we googled it"（Google 搜 "QT FCC ID" 的桌面结果页截图，第一条结果就是 fccid.io 的 2ASRL-1069）→ "An FCC filing"（fccid.io 备案页截图）→ "Its user manual"（ManualZoom.vue：像 PDF 阅读器一样从封面开始，点击滚动到第 6 页，再平滑放大到 App 截图里的 "QT 5958868"；之后出现"与街上看到的名字一致 → 逆向、写论文"）。页数 45 → 47。
- （被取代）修订：第 4 页不再是假扫描记录猜谜，改成 Aaron/Nishant 引出的 "people use Bluetooth for very unexpected things"，点击出现一张有趣的卡（智能贞操锁，Pen Test Partners 2020，屏幕上委婉写 "a smart lock for a very private purpose"，备注有真名和来源，太敏感可替换）；后接 "And a ceiling fan."（我们自己的发现）→ skimmer 压轴。页数 45 不变。
- （旧版）"Step 2" 改成猜谜 3 页（取代原来的 emoji 卡片网格/设备堆）：4 "Step 2: so many interesting devices"（一条假的、脱敏的扫描记录：name Haiku ····、地址隐藏、只写城市、UUID、厂商数据 5C04 …，问 "What is this?"，这是少数有意展示十六进制的页）→ 5 "A ceiling fan."（Big Ass Fans 官网截图 + Haiku 产品图，点击出 "…by a company literally called Big Ass Fans."）→ 6 "And sometimes it's this"（红框 gas pump skimmer，Please Pay Inside, USENIX Security '19，Nishant 的论文；再接 grad students / undergrads 两句）。页数 41 → 43。
- 重排（演示期间不插页）："What an entry looks like" 和 "Look it up" 移到 "One knowledge base"（演示最后一段视频）之后；"More data, more clusters" 备注不再指向 Look it up 页（"we'll see how lookup works in a moment"）。之后是发现部分："What turned up"（逐条点出日常用途，品牌名只在备注）→ "This one talks to your gas pedal"（Pedal Commander，纯文字：tune it from your phone / …or switch the pedal off / what if it's not your phone?，只作为线索提问，未分析其安全性；官网会把无头浏览器重定向走，所以没有产品图）→ "Found something suspicious?"。新顺序：37 One knowledge base → 38 What an entry looks like → 39 Look it up → 40 What turned up → 41 This one talks to your gas pedal → 42 Found something suspicious?。页数 43 → 45。
- 测量 1 页、收尾 2 页。
- 每页讲者备注里有讲稿要点和措辞提醒。
- 构建：`mise run //:build`；预览：`mise run //:dev` → http://100.83.234.55:3030/ （讲者模式 `/presenter/`）。

## 初稿 v1（2026-10-14）

`slides.md` 已有完整初稿，共 21 页，覆盖全部 6 段：
- 开场 6 页：标题 → UCSD documentary → 扫描 → 设备堆 → KARR → 那堆里还有多少（本科生旋转门）。
- 论点 5 页：互联网被扫描 → "you will be found" → BLE "nobody will notice" → Obscurity is dead → Let defenders see first。
- 知识库 6 页：动画切成 6 段（`public/anim/01–06`），每页进入时自动播放。
- 验证 1 页、测量 1 页、收尾 2 页（初稿）。
- 小动画组件在 `components/`：Pile（已不再使用，文件保留）、RevolvingDoor、ScannedGrid、StreetDevices。
- 头像仍是 emoji 占位；互联网测量的引用还没加（备注里已标出）。
- 检查方式：`npx slidev export --format png --output <dir>` 可导出每页 PNG。

## 基本原则

- **重心是未来项目的规划**，不是复述已完成的研究。
- 风格：轻松、不端正，有玩笑和动画（Slidev：`v-click`、`v-motion`、`v-mark` 手绘标注、自定义 Vue 组件）。
- 屏幕上字少而大：不放数字、ID、细节行，不放解释性小字；细节留给口头讲。
- 区分「已做过的工作」和「提议中的系统」；合成数据要标注；引用只用真实文献。
- 已有的 Remotion 动画（Scan → Collect → Cluster → Attribute → Knowledge → Scale）以 MP4 嵌入，必要时按段切分。

## 核心论点

1. 互联网一直在被扫描、被打指纹（Censys / Shodan 这一类），所以默认假设是 **"you will be found"**，没人敢让服务裸奔。
2. BLE / IoT 设备散落在现实世界里，除了厂商和用户，**没人知道它是什么**，默认假设是 "nobody will notice"。
3. AI 时代逆向工程又便宜又快：**只要技术上能发现，就得假设坏人已经发现了**。obscurity 保护不了任何人。
4. 所以要让 BLE 世界变得可见，让防御方先看见。第一步、也是最重要的一步：**建立 BLE 知识库**。

（第 3 点同时回答了"这是不是在帮攻击者"的问题，不需要单独做一页防守。）

说法上的注意：讲成"假设和压力的差别"，不要说成"互联网在数量上比 IoT 安全多少"这种定量结论。

## 结构与时间

| # | 时间 | 段落 | 状态 |
|---|------|------|------|
| 1 | 0–4 分钟 | 开场故事：How BLE security research used to be done at UCSD | 方向已定，画面待细化 |
| 2 | 4–10 分钟 | 核心论点：Internet 被看见 vs BLE 没人看见 → AI 让 obscurity 失效 | 方向已定 |
| 3 | 10–21 分钟 | 规划：建立知识库（嵌入现有动画） | 动画已有，切分方式待定 |
| 4 | 21–24 分钟 | 发现之后：验证，最终买真实设备确认（不讲 Lua 模拟） | 待讨论 |
| 5 | 24–27 分钟 | 可见之后的测量：部署规模、修复追踪（各一页，点到为止） | 待讨论 |
| 6 | 27–30 分钟 | 收尾：把 "you will be found" 带进 BLE 世界 | 待讨论 |

## 1. 开场故事（已讨论）

1. **"How BLE security research used to be done at UCSD"**：导师和前 PhD 拿着 WiGLE 到处扫，有意思的设备越堆越多。
2. **分工**：少数交给 grad 学生深挖，大部分丢给来来去去的本科生。
3. **KARR，一页带过**：其中一个被 grad 学生（当时读 PhD 的我）深挖，结果是能开锁、点火的汽车模块。只为说明这类研究的分量，不展开 BLE Theft Auto 的细节。
   - 可以顺手呼应 proximity：车停在街上，攻击者本来就在旁边。
4. **问题**：KARR 是碰巧被挑中的。**那堆没人深挖的设备里还有多少个？** 人员流动、知识留不住，没法 scale。
   - 措辞注意：这是一个问题，不暗示那堆里已经发现了什么。
5. → 引出核心论点。

待定：
- 头像用真实照片还是卡通，以及对导师和前 PhD 的称呼。
- 笑点的分寸：自嘲本科生被淹没可以，但不能让人觉得在抱怨导师。

## 2. 核心论点（方向已定）

- 对比画面：互联网上每个服务都被扫描、打标签；BLE 设备在街上发着信号，旁边都是问号。
- AI 逆向很便宜 → "If it's discoverable, assume it's already discovered."
- 落点：我们需要 BLE 的知识库。

待定：具体画面、需要引用的互联网测量文献（之后查真实论文）。

## 3. 规划：建立知识库

- 嵌入现有动画（MP4）。可能按 Scan / Collect / Cluster / Attribute / Knowledge / Scale 切成几段分别放在不同页，中间穿插讲解。

待定：切分方式，以及哪些段需要停下来讲解。

## 4. 验证（简短）

- 发现可疑问题 → 先做验证 → 最终都要买真实设备确认。不讲 Lua 模拟的技术细节。

## 5. 可见之后的测量（简短）

- 部署规模估计。
- 修复追踪：同一设备的广播从旧版本变成新版本。

## 6. 收尾

待讨论。
