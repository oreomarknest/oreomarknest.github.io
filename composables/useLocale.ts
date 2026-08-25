export type Locale = 'zh' | 'ja' | 'en'

type Dictionary = Record<string, string>

const messages: Record<Locale, Dictionary> = {
  zh: {
    home: '首页', install: '安装', language: '切换语言', theme: '切换主题',
    eyebrow: '为本地 Markdown 而生', heroTitleA: 'MarkNest', heroTitleB: '让内容始终如你所想',
    heroText: '在浏览器中阅读、编辑和保存 Markdown，一键收录 AI 对话。内容始终留在你的设备里。',
    pageTitle: 'MarkNest · 把想法留在本地', pageDescription: 'MarkNest 是一款在浏览器中离线阅读、编辑和保存本地 Markdown，并一键收录 AI 对话的扩展。', pageOgDescription: '阅读、编辑与收录 AI 对话，全都留在你的设备里。',
    installNow: '立即安装', explore: '向下探索', private: '本地优先', offline: '离线可用', openSource: '开源透明',
    realtimeTitle: '实时渲染', realtimeText: '输入或修改内容，渲染结果即刻同步。拖动分隔线，自由调整编辑区与预览区的宽度。',
    outlineTitle: '文件标题树，清晰直达', outlineText: '自动生成文件目录树与多级标题大纲。点击即可直达章节或切换文件，长文档浏览更高效。',
    galleryTitle: '从阅读、编辑到内容收录，在这里快速浏览 MarkNest 的完整体验。',
    immersiveReading: '沉浸阅读', immersiveReadingAlt: 'MarkNest 本地 Markdown 阅读界面', freeEditing: '自由编辑', freeEditingAlt: 'MarkNest Markdown 分屏编辑界面', contentCapture: '内容收录', contentCaptureAlt: 'MarkNest 在 ChatGPT 中收录对话的界面',
    previousScreenshot: '上一张截图', nextScreenshot: '下一张截图', screenshotPreview: '产品截图预览', closePreview: '关闭大图', previousImage: '上一张', nextImage: '下一张',
    basicsKicker: '01 · 基础', basicsTitle: '打开文件，立刻进入阅读。', basicsText: '直接接管本地 .md 与 .markdown 文件。目录、搜索、任务列表、表格、代码高亮和公式渲染，都在一个安静的阅读空间里。',
    displayKicker: '02 · 展示', displayTitle: '复杂内容，也能优雅呈现。', displayText: '从 Mermaid 图表到 KaTeX 公式，从代码块到图片灯箱，MarkNest 让 Markdown 保持它应有的秩序和美感。',
    editKicker: '03 · 编辑', editTitle: '所见即所得之外，还有完全掌控。', editText: '预览与源码并排，滚动同步，宽度自由调整。快捷键保存到原文件，编辑过程不离开浏览器。',
    captureKicker: '04 · 收录对话', captureTitle: '把 AI 对话，变成长期知识。', captureText: '从 ChatGPT、Gemini、DeepSeek、Kimi 等常用平台一键收录对话，转换成干净的 Markdown 并保存在本地。',
    privacyTitle: '你的内容，只属于你。', privacyText: 'Markdown 内容在浏览器本地处理，不上传到 MarkNest 的服务器。',
    installTitle: '选择你的浏览器', installText: '几步完成安装，然后开始整理属于你的知识。',
    chromeDesc: '适用于 Google Chrome 及 Chromium 浏览器', edgeDesc: '为 Microsoft Edge 优化', firefoxDesc: '适用于 Mozilla Firefox',
    getChrome: '安装 Chrome 版', getEdge: '安装 Edge 版', getFirefox: '安装 Firefox 版',
    installGuide: '安装说明', primaryNavigation: '主导航', browsers: '浏览器', browserDownloads: '浏览器下载',
    permissionEyebrow: '需要完成一项设置', permissionTitle: '开启“允许访问文件网址”', permissionSummary: '未开启时，浏览器不会让 MarkNest 读取本地 Markdown 文件，直接打开 `.md` 或 `.markdown` 文件也无法进入阅读界面。',
    step1: '选择你使用的浏览器，前往对应的插件商店。', step2: '在插件商店中安装 MarkNest，然后打开扩展。', step3: '点击“打开扩展设置”，找到并开启“允许访问文件网址”；返回后 MarkNest 会自动重新检测。',
    mockTitleBasics: '在 MarkNest 中阅读', mockProjectNotes: '项目笔记', mockProductFile: '产品方向.md', mockDesignFile: '设计记录.md', mockAiChats: 'AI 对话', mockKnowledgeBack: '让知识回到你的手中', mockLocalIntro: 'MarkNest 是一个本地优先的 Markdown 阅读与编辑空间。', mockOfflineCallout: '内容保存在本地，离线时依然可以完整使用。', mockTodayTasks: '今天的任务', mockTaskLine: '☑ 整理产品结构　　☐ 完善安装指南',
    mockTitleDisplay: '清晰呈现每一种内容', mockDataFlow: '数据流与知识节点', mockConversation: '对话', mockLocalKnowledge: '本地知识', mockFormula: '公式', mockCode: '代码',
    mockTitleEdit: '专注编辑', mockProductNotes: '产品笔记', mockEditLine1: '每一次编辑都实时预览，', mockEditLine2: '每一次保存都回到原文件。', mockStayFocused: '保持专注', mockStayLocal: '保持本地', mockLivePreview: '实时预览',
    mockTitleCapture: '收录 AI 对话', mockUserChat: '帮我梳理这次关于本地知识管理的讨论。', mockAiChat: '当然。可以归纳为隐私、可移植性和长期保存三个方向……', mockConversationOrganized: '对话已整理', mockPreserve: '保留标题、层级、代码和引用', mockCaptureFile: 'AI-知识管理讨论.md',
    footerText: '把知识保存在你自己的设备里。'
  },
  ja: {
    home: 'ホーム', install: 'インストール', language: '言語を変更', theme: 'テーマを変更',
    eyebrow: 'ローカル Markdown のために', heroTitleA: 'MarkNest', heroTitleB: 'コンテンツを思いどおりに',
    heroText: 'ブラウザで Markdown を読み、編集し、保存。AI の会話もワンクリックで収集。データは常にあなたのデバイスに。',
    pageTitle: 'MarkNest · 想いをローカルに', pageDescription: 'MarkNest は、ローカルの Markdown をブラウザでオフラインで読み、編集・保存し、AI の会話も収集できる拡張機能です。', pageOgDescription: '読む、編集する、AI の会話を収集する。すべてをあなたのデバイスに。',
    installNow: '今すぐインストール', explore: 'スクロールして見る', private: 'ローカル優先', offline: 'オフライン対応', openSource: 'オープンソース',
    realtimeTitle: 'リアルタイムレンダリング', realtimeText: '入力や編集の内容をすぐにプレビューへ反映。仕切りをドラッグして、エディターとプレビューの幅も自由に調整できます。',
    outlineTitle: 'ファイルも見出しも、一目で把握', outlineText: 'ファイルツリーと多階層の見出しアウトラインを自動生成。クリックするだけで、章や別のファイルへすぐ移動できます。',
    galleryTitle: '読む、編集する、コンテンツを収集する。MarkNest のすべてをここですばやく確認できます。',
    immersiveReading: '没入型リーディング', immersiveReadingAlt: 'MarkNest のローカル Markdown 閲覧画面', freeEditing: '自由な編集', freeEditingAlt: 'MarkNest Markdown の分割編集画面', contentCapture: 'コンテンツ収集', contentCaptureAlt: 'MarkNest が ChatGPT の会話を収集する画面',
    previousScreenshot: '前のスクリーンショット', nextScreenshot: '次のスクリーンショット', screenshotPreview: '製品スクリーンショットのプレビュー', closePreview: '拡大表示を閉じる', previousImage: '前の画像', nextImage: '次の画像',
    basicsKicker: '01 · 基本', basicsTitle: 'ファイルを開けば、すぐ読める。', basicsText: 'ローカルの .md ファイルをそのまま開けます。目次、検索、タスク、表、コードハイライト、数式まで、静かな読書空間に。',
    displayKicker: '02 · 表示', displayTitle: '複雑な内容も、美しく。', displayText: 'Mermaid、KaTeX、コードブロック、画像ライトボックス。Markdown の秩序と美しさを保ちます。',
    editKicker: '03 · 編集', editTitle: '表示しながら、自由に編集。', editText: 'プレビューとソースを並べ、スクロールを同期。幅も自由に調整し、そのまま元のファイルへ保存できます。',
    captureKicker: '04 · AI 会話', captureTitle: 'AI の会話を、長く使える知識へ。', captureText: 'ChatGPT、Gemini、DeepSeek、Kimi などから会話を収集し、整った Markdown としてローカルに保存します。',
    privacyTitle: 'あなたのコンテンツは、あなただけのもの。', privacyText: 'Markdown はブラウザ内で処理され、MarkNest のサーバーへ送信されません。',
    installTitle: 'ブラウザを選択', installText: '数ステップでインストールして、自分の知識を整理しましょう。',
    chromeDesc: 'Google Chrome と Chromium 向け', edgeDesc: 'Microsoft Edge に最適化', firefoxDesc: 'Mozilla Firefox 向け',
    getChrome: 'Chrome 版を入手', getEdge: 'Edge 版を入手', getFirefox: 'Firefox 版を入手',
    installGuide: 'インストール方法', primaryNavigation: 'メインナビゲーション', browsers: 'ブラウザ', browserDownloads: 'ブラウザのダウンロード',
    permissionEyebrow: '設定が1つ必要です', permissionTitle: '「ファイルの URL へのアクセスを許可する」を有効化', permissionSummary: '無効の場合、MarkNest はローカル Markdown ファイルを読み取れず、`.md` や `.markdown` ファイルをリーダーで開けません。',
    step1: '使用するブラウザを選び、対応する拡張機能ストアを開きます。', step2: 'ストアから MarkNest をインストールし、拡張機能を開きます。', step3: '「拡張機能の設定を開く」をクリックし、「ファイルの URL へのアクセスを許可する」を有効にします。戻ると自動的に再確認します。',
    mockTitleBasics: 'MarkNest で読む', mockProjectNotes: 'プロジェクトノート', mockProductFile: '製品方針.md', mockDesignFile: 'デザイン記録.md', mockAiChats: 'AI の会話', mockKnowledgeBack: '知識を自分の手に取り戻す', mockLocalIntro: 'MarkNest はローカルファーストの Markdown 閲覧・編集空間です。', mockOfflineCallout: 'コンテンツはローカルに保存され、オフラインでもすべての機能を使えます。', mockTodayTasks: '今日のタスク', mockTaskLine: '☑ 製品構成を整理　　☐ インストールガイドを改善',
    mockTitleDisplay: 'あらゆるコンテンツを明快に表示', mockDataFlow: 'データフローと知識ノード', mockConversation: '会話', mockLocalKnowledge: 'ローカル知識', mockFormula: '数式', mockCode: 'コード',
    mockTitleEdit: '編集に集中', mockProductNotes: '製品ノート', mockEditLine1: '編集するたびにリアルタイムでプレビューし、', mockEditLine2: '保存するたびに元のファイルへ戻します。', mockStayFocused: '集中を保つ', mockStayLocal: 'ローカルを保つ', mockLivePreview: 'リアルタイムプレビュー',
    mockTitleCapture: 'AI の会話を収集', mockUserChat: 'ローカルな知識管理についての今回の議論を整理してください。', mockAiChat: 'もちろんです。プライバシー、ポータビリティ、長期保存の 3 つに整理できます……', mockConversationOrganized: '会話を整理しました', mockPreserve: '見出し、階層、コード、引用を保持', mockCaptureFile: 'AI-知識管理の議論.md',
    footerText: '知識を、あなた自身のデバイスに。'
  },
  en: {
    home: 'Home', install: 'Install', language: 'Change language', theme: 'Toggle theme',
    eyebrow: 'Made for local Markdown', heroTitleA: 'MarkNest', heroTitleB: 'Keep content exactly as you intend',
    heroText: 'Read, edit and save Markdown in your browser. Capture AI conversations in one click. Everything stays on your device.',
    pageTitle: 'MarkNest · Keep your ideas local', pageDescription: 'MarkNest is a browser extension for reading, editing, and saving local Markdown offline, with one-click capture for AI conversations.', pageOgDescription: 'Read, edit, and capture AI conversations—all on your own device.',
    installNow: 'Install now', explore: 'Scroll to explore', private: 'Local first', offline: 'Works offline', openSource: 'Open source',
    realtimeTitle: 'Render as you write', realtimeText: 'Every change appears in the preview instantly. Drag the divider to give the editor or preview exactly the space you need.',
    outlineTitle: 'Files and headings, at a glance', outlineText: 'File trees and multi-level outlines are generated automatically. Jump to any section or switch files with a single click.',
    galleryTitle: 'From reading and editing to content capture, explore the complete MarkNest experience at a glance.',
    immersiveReading: 'Immersive reading', immersiveReadingAlt: 'MarkNest local Markdown reading interface', freeEditing: 'Flexible editing', freeEditingAlt: 'MarkNest split-view Markdown editor', contentCapture: 'Content capture', contentCaptureAlt: 'MarkNest capturing a conversation in ChatGPT',
    previousScreenshot: 'Previous screenshot', nextScreenshot: 'Next screenshot', screenshotPreview: 'Product screenshot preview', closePreview: 'Close enlarged image', previousImage: 'Previous image', nextImage: 'Next image',
    basicsKicker: '01 · Essentials', basicsTitle: 'Open a file. Start reading.', basicsText: 'Take over local .md and .markdown files with a calm space for outlines, search, tasks, tables, code highlighting and equations.',
    displayKicker: '02 · Presentation', displayTitle: 'Complex ideas, beautifully rendered.', displayText: 'From Mermaid diagrams to KaTeX equations, code blocks to image lightboxes, MarkNest keeps Markdown structured and elegant.',
    editKicker: '03 · Editing', editTitle: 'A clear preview. Complete control.', editText: 'Place source and preview side by side with synced scrolling and adjustable widths. Save back to the original file without leaving the browser.',
    captureKicker: '04 · AI Capture', captureTitle: 'Turn AI conversations into lasting knowledge.', captureText: 'Capture from ChatGPT, Gemini, DeepSeek, Kimi and more, convert the conversation to clean Markdown, and save it locally.',
    privacyTitle: 'Your content belongs to you.', privacyText: 'Markdown is processed locally in your browser and never uploaded to MarkNest servers.',
    installTitle: 'Choose your browser', installText: 'Install in a few steps, then begin shaping your own knowledge base.',
    chromeDesc: 'For Google Chrome and Chromium browsers', edgeDesc: 'Optimized for Microsoft Edge', firefoxDesc: 'For Mozilla Firefox',
    getChrome: 'Get for Chrome', getEdge: 'Get for Edge', getFirefox: 'Get for Firefox',
    installGuide: 'Installation guide', primaryNavigation: 'Primary navigation', browsers: 'Browsers', browserDownloads: 'Browser downloads',
    permissionEyebrow: 'One setting is required', permissionTitle: 'Enable “Allow access to file URLs”', permissionSummary: 'Without it, MarkNest cannot read local Markdown files or open `.md` and `.markdown` files in the reader.',
    step1: 'Choose your browser and open its extension store.', step2: 'Install MarkNest from the store, then open the extension.', step3: 'Click “Open extension settings” and enable “Allow access to file URLs”. MarkNest will check again automatically when you return.',
    mockTitleBasics: 'Read in MarkNest', mockProjectNotes: 'Project notes', mockProductFile: 'product-direction.md', mockDesignFile: 'design-records.md', mockAiChats: 'AI conversations', mockKnowledgeBack: 'Put knowledge back in your hands', mockLocalIntro: 'MarkNest is a local-first space for reading and editing Markdown.', mockOfflineCallout: 'Content stays local, with every feature available offline.', mockTodayTasks: "Today's tasks", mockTaskLine: '☑ Organize product structure　　☐ Improve the installation guide',
    mockTitleDisplay: 'Present every kind of content clearly', mockDataFlow: 'Data flows and knowledge nodes', mockConversation: 'Conversation', mockLocalKnowledge: 'Local knowledge', mockFormula: 'Formula', mockCode: 'Code',
    mockTitleEdit: 'Focused editing', mockProductNotes: 'Product notes', mockEditLine1: 'Every edit appears in the preview,', mockEditLine2: 'and every save returns to the original file.', mockStayFocused: 'Stay focused', mockStayLocal: 'Stay local', mockLivePreview: 'Live preview',
    mockTitleCapture: 'Capture AI conversations', mockUserChat: 'Help me organize this discussion about local knowledge management.', mockAiChat: 'Of course. It can be summarized around privacy, portability, and long-term preservation…', mockConversationOrganized: 'Conversation organized', mockPreserve: 'Preserve headings, hierarchy, code, and quotes', mockCaptureFile: 'AI-knowledge-management.md',
    footerText: 'Keep your knowledge on your own device.'
  }
}

export function useLocale() {
  const locale = useState<Locale>('locale', () => 'zh')

  onMounted(() => {
    const stored = localStorage.getItem('marknest-locale') as Locale | null
    if (stored && ['zh', 'ja', 'en'].includes(stored)) locale.value = stored
  })

  watch(locale, (value) => {
    if (import.meta.client) localStorage.setItem('marknest-locale', value)
  })

  const t = (key: string) => messages[locale.value][key] || key
  return { locale, t }
}
