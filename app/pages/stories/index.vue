<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

// 物語アプリのリスト定義（各物語アプリの情報をここに集約）
interface StoryInfo {
  id: string
  title: { en: string; ja: string }
  description: { en: string; ja: string }
  duration: string
  path: string
}

const storyList: StoryInfo[] = [
  {
    id: 'neon-story',
    title: {
      en: 'Neon Story',
      ja: 'Neon Story'
    },
    description: {
      en: 'Neon, a shy boy who entered the world of a book. An adventure begins to find trustworthy companions to save the captive princess.',
      ja: '本の世界に入り込んだ内気な少年、ネオン。囚われの姫を救うため、信頼できる仲間を見つける冒険が始まる。'
    },
    duration: '3',
    path: '/stories/neon-story'
  }
  // 新しい物語を追加する際は、ここに追加するだけ
]

// 現在の言語に応じた物語データを取得
const currentLang = computed(() => (locale.value === 'ja' ? 'ja' : 'en'))
const stories = computed(() => 
  storyList.map(story => ({
    id: story.id,
    title: story.title[currentLang.value],
    description: story.description[currentLang.value],
    duration: `${story.duration}${t('storiesList.duration')}`,
    path: story.path
  }))
)

// 言語切り替え
const availableLocales = computed(() => 
  locales.value.filter((l: any) => l.code !== locale.value)
)

const switchLanguage = (code: string) => {
  setLocale(code)
}

useHead({
  title: t('meta.storiesListTitle'),
  meta: [
    {
      name: 'description',
      content: t('meta.siteDescription')
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DotGothic16&display=swap'
    }
  ]
})
</script>

<template>
  <div class="stories-container">
    <div class="scanlines" />
    <div class="crt-effect" />
    
    <!-- 言語切り替えボタン -->
    <div class="language-switcher">
      <button
        v-for="loc in availableLocales"
        :key="loc.code"
        @click="switchLanguage(loc.code)"
        class="lang-button"
      >
        <Icon name="mdi:translate" class="lang-icon" />
        <span>{{ loc.name }}</span>
      </button>
    </div>
    
    <header class="header">
      <div class="pixel-border">
        <h1 class="title">{{ t('storiesList.header.title') }}</h1>
      </div>
      <p class="subtitle">{{ t('storiesList.header.subtitle') }}</p>
    </header>

    <section class="concept-section">
      <div class="concept-box">
        <p class="concept-text">
          {{ t('storiesList.concept.line1') }}<br>
          {{ t('storiesList.concept.line2') }}
        </p>
      </div>
    </section>

    <main class="main-content">
      <div v-if="stories.length === 0" class="empty-state">
        <div class="pixel-box">
          <div class="icon-pixel">
            <Icon name="mdi:book-open-page-variant" />
          </div>
          <h2 class="empty-title">{{ t('storiesList.empty.title') }}</h2>
          <p class="empty-description">
            {{ t('storiesList.empty.description') }}
          </p>
          <div class="loading-dots">
            <span class="dot">.</span>
            <span class="dot">.</span>
            <span class="dot">.</span>
          </div>
        </div>
      </div>

      <div v-else class="stories-grid">
        <NuxtLink
          v-for="story in stories"
          :key="story.id"
          :to="story.path"
          class="story-card"
        >
          <div class="card-border">
            <div class="story-card-content">
              <div class="story-header">
                <span class="story-number">▶</span>
                <h3 class="story-title">{{ story.title }}</h3>
              </div>
              <p class="story-description">{{ story.description }}</p>
              <div class="story-meta">
                <Icon name="mdi:clock-outline" class="meta-icon" />
                <span>{{ story.duration }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </main>

    <footer class="footer">
      <p>{{ t('storiesList.footer') }}</p>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.stories-container {
  min-height: 100vh;
  background: #0f0f1a;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.02) 2px,
      rgba(0, 0, 0, 0.02) 4px
    );
  color: #d0d8e8;
  padding: 2rem;
  font-family: 'DotGothic16', 'Press Start 2P', 'Courier New', monospace;
  position: relative;
  overflow: hidden;
}

/* 言語切り替えボタン */
.language-switcher {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1f1f2f;
  border: 2px solid #5a6a7a;
  color: #d0d8e8;
  font-family: 'DotGothic16', 'Press Start 2P', 'Courier New', monospace;
  font-size: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4);
}

.lang-button:hover {
  background: #2a2a3a;
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
}

.lang-button:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
}

.lang-icon {
  font-size: 1rem;
}

/* 紙のテクスチャエフェクト */
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0.02) 1px,
      transparent 1px,
      transparent 2px
    );
  pointer-events: none;
  z-index: 1000;
  opacity: 0.5;
}

.crt-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(15, 15, 26, 0.4) 100%);
  pointer-events: none;
  z-index: 999;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
  position: relative;
  z-index: 1;
}

.pixel-border {
  display: inline-block;
  padding: 1.5rem 2rem;
  border: 4px solid #5a6a7a;
  background: #1f1f2f;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(90, 106, 122, 0.03) 2px,
      rgba(90, 106, 122, 0.03) 4px
    );
  position: relative;
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.6),
    inset 2px 2px 0 rgba(90, 106, 122, 0.1);
}

.pixel-border::before,
.pixel-border::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #5a6a7a;
}

.pixel-border::before {
  top: -4px;
  left: -4px;
}

.pixel-border::after {
  bottom: -4px;
  right: -4px;
}

.title {
  font-size: 2.5rem;
  font-weight: normal;
  margin: 0;
  text-shadow: 
    3px 3px 0 rgba(0, 0, 0, 0.5),
    4px 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.1em;
  color: #e0e8f0;
}

.subtitle {
  font-size: 0.875rem;
  margin-top: 1.5rem;
  color: #a0a8b8;
  letter-spacing: 0.15em;
  animation: blink 1.5s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

/* コンセプトセクション */
.concept-section {
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
  z-index: 1;
}

.concept-box {
  background: rgba(31, 31, 47, 0.4);
  border: 2px solid #5a6a7a;
  padding: 1rem 1.5rem;
  text-align: center;
  box-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.3),
    inset 1px 1px 0 rgba(90, 106, 122, 0.1);
}

.concept-text {
  font-size: 0.875rem;
  line-height: 1.8;
  color: #a0a8b8;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  font-style: italic;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 空の状態 */
.empty-state {
  padding: 2rem;
}

.pixel-box {
  background: #1f1f2f;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(90, 106, 122, 0.03) 2px,
      rgba(90, 106, 122, 0.03) 4px
    );
  border: 4px solid #5a6a7a;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.5),
    inset 2px 2px 0 rgba(90, 106, 122, 0.1);
  position: relative;
}

.pixel-box::before,
.pixel-box::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #0f0f1a;
  border: 2px solid #5a6a7a;
}

.pixel-box::before {
  top: -2px;
  left: -2px;
}

.pixel-box::after {
  bottom: -2px;
  right: -2px;
}

.icon-pixel {
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #d0d8e8;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  color: #e0e8f0;
}

.empty-description {
  font-size: 0.75rem;
  line-height: 1.8;
  color: #a0a8b8;
  margin-bottom: 1rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 2rem;
  color: #d0d8e8;
}

.dot {
  animation: loading 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}

/* 物語グリッド */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.story-card {
  text-decoration: none;
  color: #d0d8e8;
  display: block;
  transition: transform 0.1s ease;
}

.story-card:hover {
  transform: scale(1.02);
}

.story-card:active {
  transform: scale(0.98);
}

.card-border {
  background: #1f1f2f;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(90, 106, 122, 0.03) 2px,
      rgba(90, 106, 122, 0.03) 4px
    );
  border: 3px solid #5a6a7a;
  padding: 1.5rem;
  position: relative;
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.5),
    inset 2px 2px 0 rgba(90, 106, 122, 0.05);
  transition: all 0.2s ease;
}

.story-card:hover .card-border {
  background: #2a2a3a;
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.6),
    inset 2px 2px 0 rgba(90, 106, 122, 0.1);
}

.card-border::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  width: 10px;
  height: 10px;
  background: #0f0f1a;
  border: 2px solid #5a6a7a;
}

.story-card-content {
  position: relative;
}

.story-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.story-number {
  font-size: 0.875rem;
  animation: blink 1s step-start infinite;
  color: #e0e8f0;
}

.story-title {
  font-size: 1.125rem;
  font-weight: normal;
  margin: 0;
  letter-spacing: 0.05em;
  line-height: 1.6;
  color: #e0e8f0;
}

.story-description {
  font-family: 'DotGothic16', 'Press Start 2P', 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: #a0a8b8;
  letter-spacing: 0.05em;
}

.story-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  color: #7a8a9a;
  padding-top: 0.75rem;
  border-top: 1px solid #3a4a5a;
}

.meta-icon {
  font-size: 1rem;
}

.footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem 0;
  font-size: 0.625rem;
  color: #6a7a8a;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 1;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .stories-container {
    padding: 1rem;
  }

  .title {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 0.625rem;
  }

  .pixel-border {
    padding: 1rem 1.5rem;
  }

  .concept-section {
    margin-bottom: 2rem;
  }

  .concept-box {
    padding: 0.875rem 1rem;
  }

  .concept-text {
    font-size: 0.75rem;
    line-height: 1.8;
  }

  .stories-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .empty-title {
    font-size: 1rem;
  }

  .empty-description {
    font-size: 0.625rem;
  }

  .pixel-box {
    padding: 2rem 1rem;
  }
}
</style>

