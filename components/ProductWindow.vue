<template>
  <div class="product-window" :class="`product-window--${variant}`">
    <div class="window-topbar">
      <div class="traffic-lights"><i /><i /><i /></div>
      <span>{{ t(titles[variant]) }}</span>
      <div class="toolbar-dots"><i /><i /><i /></div>
    </div>

    <div v-if="variant === 'basics'" class="mock-workspace mock-basics">
      <aside>
        <b>MarkNest</b>
        <span class="active">⌄　{{ t('mockProjectNotes') }}</span>
        <span>　　{{ t('mockProductFile') }}</span>
        <span>　　{{ t('mockDesignFile') }}</span>
        <span>›　{{ t('mockAiChats') }}</span>
      </aside>
      <article>
        <small>{{ t('mockProductFile') }}</small>
        <h3>{{ t('mockKnowledgeBack') }}</h3>
        <p>{{ t('mockLocalIntro') }}</p>
        <div class="mock-callout">{{ t('mockOfflineCallout') }}</div>
        <h4>{{ t('mockTodayTasks') }}</h4>
        <p>{{ t('mockTaskLine') }}</p>
      </article>
    </div>

    <div v-else-if="variant === 'display'" class="mock-workspace mock-display">
      <article>
        <span class="mock-tag">MARKDOWN PREVIEW</span>
        <h3>{{ t('mockDataFlow') }}</h3>
        <div class="diagram">
          <span>{{ t('mockConversation') }}</span><i>→</i><span>Markdown</span><i>→</i><span>{{ t('mockLocalKnowledge') }}</span>
        </div>
        <div class="mock-grid">
          <div><small>{{ t('mockFormula') }}</small><strong>E = mc²</strong></div>
          <div><small>{{ t('mockCode') }}</small><code>const idea = await capture()</code></div>
        </div>
      </article>
    </div>

    <div v-else-if="variant === 'edit'" class="mock-workspace mock-edit">
      <article>
        <div class="editor-toolbar"><b>B</b><i>I</i><span>H1</span><span>↗</span><span>{ }</span></div>
        <pre><em># {{ t('mockProductNotes') }}</em>

{{ t('mockEditLine1') }}
{{ t('mockEditLine2') }}

<b>- [x]</b> {{ t('mockStayFocused') }}
<b>- [x]</b> {{ t('mockStayLocal') }}</pre>
      </article>
      <article class="edit-preview">
        <small>{{ t('mockLivePreview') }}</small>
        <h3>{{ t('mockProductNotes') }}</h3>
        <p>{{ t('mockEditLine1') }}<br>{{ t('mockEditLine2') }}</p>
        <p class="check">✓ {{ t('mockStayFocused') }}<br>✓ {{ t('mockStayLocal') }}</p>
      </article>
    </div>

    <div v-else class="mock-workspace mock-capture">
      <div class="chat-panel">
        <span class="chat-bubble">{{ t('mockUserChat') }}</span>
        <span class="chat-bubble ai">{{ t('mockAiChat') }}</span>
      </div>
      <div class="capture-flow">
        <span class="capture-icon i-lucide-sparkles" />
        <b>{{ t('mockConversationOrganized') }}</b>
        <p>{{ t('mockPreserve') }}</p>
        <div class="capture-file"><span class="i-lucide-file-check-2" /> {{ t('mockCaptureFile') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ variant: 'basics' | 'display' | 'edit' | 'capture' }>()
const { t } = useLocale()
const titles = {
  basics: 'mockTitleBasics',
  display: 'mockTitleDisplay',
  edit: 'mockTitleEdit',
  capture: 'mockTitleCapture'
}
const variant = computed(() => props.variant)
</script>
