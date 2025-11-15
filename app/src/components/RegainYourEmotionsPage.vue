<script setup lang="ts">
// Regain Your Emotions - 金融街の実務家と赤ん坊の物語
const { t, locale } = useI18n()

const scrollContainer = ref<HTMLElement | null>(null)
const storyContent = ref<HTMLElement | null>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const hasStarted = ref(false)
const hasEnded = ref(false)

// 物語固有のデータ定義（このコンポーネントに閉じて管理）
const storyData = {
  id: 'regain-your-emotions',
  // 物語の最後に表示する画像（後で画像を配置する場合はここにパスを設定）
  endingImage: '/images/regain-your-emotions-ending.jpg',
  meta: {
    en: {
      title: 'Regain Your Emotions - Greko Stories',
      description: 'Sean Hagreeves, a top practitioner in the financial district. A story of an encounter that changes his calculated daily life.'
    },
    ja: {
      title: 'Regain Your Emotions - Greko Stories',
      description: '金融街でも屈指の実務家、ショーン・ハグリーブス。計算された日常を変える出会いの物語。'
    }
  },
  listInfo: {
    en: {
      title: 'Regain Your Emotions',
      description: 'Sean Hagreeves, a top practitioner in the financial district. A story of an encounter that changes his calculated daily life.',
      duration: '3'
    },
    ja: {
      title: 'Regain Your Emotions',
      description: '金融街でも屈指の実務家、ショーン・ハグリーブス。計算された日常を変える出会いの物語。',
      duration: '3'
    }
  },
  ui: {
    en: {
      startButton: 'START STORY',
      play: 'PLAY',
      pause: 'PAUSE',
      restart: 'Read Again',
      theEnd: 'THE END',
      volumeWarning: '[!] Music will play. Please adjust your volume.'
    },
    ja: {
      startButton: 'START STORY',
      play: 'PLAY',
      pause: 'PAUSE',
      restart: 'もう一度読む',
      theEnd: 'THE END',
      volumeWarning: '[!] 音楽が流れます。音量にご注意ください。'
    }
  },
  paragraphs: {
    en: [
      'Sean Hagreeves was one of the top practitioners in the financial district. Vast knowledge, meticulous judgment, and unwavering composure. While those around him highly valued his abilities, they typically kept their distance in his personal life. Sean himself had no need for interaction with others. His daily life was built on calculated procedures, and unnecessary fluctuations were eliminated.',
      '',
      '',
      'That day, on his way home, he was walking the same shortest route as always. There were few people around, and only streetlights cast regular light on the pavement.',
      '',
      'Suddenly, metal glinted at the edge of his vision. A small basket placed by the roadside. Streetlight reflected off its side. It should have been an ordinary sight. Yet, Sean stopped a few steps ahead.',
      '',
      'The reason was unclear. But his gaze naturally returned to that basket.',
      '',
      'A thin cloth was draped over it. There was no one around. Sean lifted the edge of the cloth and quietly pulled it back.',
      '',
      'There, a baby lay alone. A small child who appeared to be a girl. Not crying, not showing surprise, just staring straight at Sean. Those eyes held a strange stillness, like a soft warmth placed in the cold night air.',
      '',
      'Before his thoughts could settle, Sean had already picked up the baby. Before he could calculate what other options were available, his body moved.',
      '',
      'When he returned home, he tidied a corner of the room and laid the baby down.',
      '',
      'Normally, bringing an unknown presence into his home would be a case to be handled with priority under any circumstances. But that night, Sean strangely did not pursue the details of his thoughts and simply went to sleep.',
      '',
      'The next morning, he woke to a shadow standing in his field of vision.',
      '',
      'A small girl, seven or eight years old, was peering down at him, blocking the morning sun. She wore a bright smile and was looking at Sean.',
      '',
      '"Good morning. Thank you for helping me yesterday!"',
      '',
      'The light voice transformed the room\'s atmosphere so naturally, as if her presence there was a matter of course.',
      '',
      'Sean was unable to move for several seconds. There was no explanation for the situation. It didn\'t fit anywhere in logic. But the girl stood there without hesitation, smiling.',
      '',
      'This is a story of Sean, whose quietly closed-off daily life was suddenly rewritten, gradually regaining the emotions he had forgotten while being swept along by the days spent with a wildly bright, unpredictable girl who knew nothing of the concept of restraint.'
    ],
    ja: [
      'ショーン・ハグリーブスは金融街でも屈指の実務家だった。膨大な知識量と緻密な判断力、乱れのない態度。周囲は彼の能力を高く評価する一方、私生活では距離を置くのが通例だった。ショーン自身、他者との関わりを必要としない。日常は計算された手順で構築され、不要な揺らぎは排除されていた。',
      '',
      '',
      'その日の帰り道も、彼はいつもと同じ最短ルートを歩いていた。人通りは少なく、街灯だけが舗道に規則正しい明かりを落としている。',
      '',
      'ふと、視界の端で金属が光った。歩道脇に置かれた小さなカゴ。その側面に街灯の光が反射していた。ありふれた光景のはずだった。にもかかわらず、ショーンは数歩進んだところで足を止めていた。',
      '',
      '理由ははっきりしない。ただ、視線が自然とそのカゴに戻った。',
      '',
      '薄い布がかけられている。周囲に人影はない。ショーンは布の端をつまみ、静かにめくった。',
      '',
      'そこには、赤ん坊が一人、横たわっていた。少女と思われる小さな子。泣きもせず、驚いている様子もなく、ただ真っ直ぐにショーンを見つめていた。その目は、夜の冷えた空気の中に柔らかな温度を一つ置いたような、不思議な静けさを帯びていた。',
      '',
      '思考がまとまるよりも先に、ショーンは赤ん坊を抱き上げていた。他にどのような選択肢が考えられるのか、逆算する前に身体が動いた。',
      '',
      '自宅に戻ると、部屋の一角を整え、赤ん坊を寝かせた。',
      '',
      '本来なら、未知の存在を家に持ち込むなど、どんな状況であれ優先して処理するべき案件だ。しかしこの夜、ショーンは不思議なほど思考の細部を追おうとせず、そのまま眠りについた。',
      '',
      '翌朝、彼は視界に立つ影で目を覚ました。',
      '',
      '朝日を遮るように、小柄な少女が覗き込んでいる。七歳か八歳ほどの年齢。明るい笑顔を浮かべ、ショーンを見つめていた。',
      '',
      '「おはよう。昨日は助けてくれてありがとう！」',
      '',
      '軽やかな声は、部屋の空気を一変させるほど自然で、そこにいるのが当然であるかのようだった。',
      '',
      'ショーンは数秒動けなかった。状況説明は存在しない。論理のどこにも該当しない。だが、少女は迷いなくそこに立ち、笑っていた。',
      '',
      'この話は、静かに閉ざされていた日常を突如として書き換えられたショーンが、破天荒に明るく、予測不能で、遠慮という概念を知らない少女と過ごす日々の中で、振り回されながらも少しずつ忘れていた感情を取り戻していく物語である。'
    ]
  }
}

// 現在の言語に応じたデータを取得
const currentLang = computed(() => (locale.value === 'ja' ? 'ja' : 'en'))
const storyTitle = computed(() => storyData.listInfo[currentLang.value].title)
const storyParagraphs = computed(() => storyData.paragraphs[currentLang.value])
const storyUI = computed(() => storyData.ui[currentLang.value])

// 物語全体の高さとスクロール速度の計算
// 1分55秒(115秒)で全体をスクロール
const SCROLL_DURATION = 115 // 秒

const startStory = () => {
  hasStarted.value = true
  isPlaying.value = true
  
  // 音楽再生（ファイルが存在する場合）
  if (audioPlayer.value) {
    audioPlayer.value.play().catch(err => {
      console.warn('Audio playback failed:', err)
    })
  }
  
  // スクロールアニメーションの開始
  if (scrollContainer.value) {
    const containerHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    scrollContainer.value.style.scrollBehavior = 'smooth'
    
    // CSSアニメーションを適用
    scrollContainer.value.classList.add('scrolling')
  }
}

const togglePlayPause = () => {
  if (!hasStarted.value) {
    startStory()
    return
  }
  
  isPlaying.value = !isPlaying.value
  
  // 音楽の一時停止/再開
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.play()
    } else {
      audioPlayer.value.pause()
    }
  }
  
  // スクロールアニメーションの一時停止/再開
  if (storyContent.value) {
    if (isPlaying.value) {
      storyContent.value.style.animationPlayState = 'running'
    } else {
      storyContent.value.style.animationPlayState = 'paused'
    }
  }
}

// 曲が終了したときの処理
const onAudioEnded = () => {
  hasEnded.value = true
  isPlaying.value = false
}

// もう一度読む
const restart = () => {
  // ページをリロードして最初から
  window.location.reload()
}

// ユーザーによるスクロールを完全に防止
const preventScroll = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  return false
}

onMounted(() => {
  if (scrollContainer.value) {
    // ホイールイベントを防止（マウススクロール）
    scrollContainer.value.addEventListener('wheel', preventScroll, { passive: false })
    // タッチイベントを防止（モバイルスクロール）
    scrollContainer.value.addEventListener('touchmove', preventScroll, { passive: false })
    // キーボードイベントを防止（矢印キー、スペースキーなど）
    scrollContainer.value.addEventListener('keydown', (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
      if (scrollKeys.includes(e.key)) {
        e.preventDefault()
      }
    })
  }
  
  // 音楽の終了イベントをリッスン
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('ended', onAudioEnded)
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('wheel', preventScroll)
    scrollContainer.value.removeEventListener('touchmove', preventScroll)
  }
  
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener('ended', onAudioEnded)
  }
})

// 現在のURLを取得（OGP用）
const route = useRoute()
const requestURL = useRequestURL()
const baseUrl = requestURL.origin
const currentUrl = `${baseUrl}${route.path}`

useHead({
  title: storyData.meta[currentLang.value].title,
  meta: [
    {
      name: 'description',
      content: storyData.meta[currentLang.value].description
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DotGothic16&display=swap'
    }
  ]
})

useSeoMeta({
  title: storyData.meta[currentLang.value].title,
  description: storyData.meta[currentLang.value].description,
  ogTitle: storyData.meta[currentLang.value].title,
  ogDescription: storyData.meta[currentLang.value].description,
  ogImage: storyData.endingImage ? `${baseUrl}${storyData.endingImage}` : `${baseUrl}/favicon.svg`,
  ogUrl: currentUrl,
  ogType: 'website',
  ogSiteName: 'Greko Stories',
  twitterCard: 'summary_large_image',
  twitterTitle: storyData.meta[currentLang.value].title,
  twitterDescription: storyData.meta[currentLang.value].description,
  twitterImage: storyData.endingImage ? `${baseUrl}${storyData.endingImage}` : `${baseUrl}/favicon.svg`
})
</script>

<template>
  <div class="regain-your-emotions-container">
    <audio ref="audioPlayer">
      <source src="/audio/regain-your-emotions.mp3" type="audio/mpeg">
    </audio>
    
    <!-- 固定ヘッダー（タイトル） -->
    <header class="story-header">
      <h1 class="story-title">{{ storyTitle }}</h1>
    </header>
    
    <!-- スクロールコンテナ -->
    <div 
      ref="scrollContainer" 
      class="scroll-container"
      :class="{ 'scrolling': hasStarted }"
    >
      <div ref="storyContent" class="story-content">
        <!-- 開始前の案内 -->
        <div v-if="!hasStarted" class="start-prompt">
          <p class="prompt-text">Press {{ storyUI.startButton }} to begin</p>
          <p class="volume-warning">{{ storyUI.volumeWarning }}</p>
          <button @click="startStory" class="start-button">
            {{ storyUI.startButton }}
          </button>
        </div>
        
        <!-- 物語開始時の余白 -->
        <div v-if="hasStarted" class="story-start-spacer"></div>
        
        <!-- 物語本文 -->
        <div class="story-text" :class="{ 'visible': hasStarted }">
          <p 
            v-for="(paragraph, index) in storyParagraphs"
            :key="index"
            class="paragraph"
            :class="{ 'empty-line': paragraph === '' }"
          >
            {{ paragraph || '\u00A0' }}
          </p>
        </div>
        
        <!-- 物語の最後に表示する画像 -->
        <div v-if="storyData.endingImage && hasStarted" class="ending-image-container">
          <img 
            :src="storyData.endingImage" 
            alt="Story ending illustration"
            class="ending-image"
          />
        </div>
        
        <!-- 物語終了後の余白 -->
        <div class="story-end-spacer"></div>
      </div>
    </div>
    
    <!-- コントロールボタン（一時停止/再生） -->
    <div v-if="hasStarted && !hasEnded" class="controls">
      <button @click="togglePlayPause" class="control-button">
        {{ isPlaying ? storyUI.pause : storyUI.play }}
      </button>
    </div>
    
    <!-- 終了時：もう一度読むボタン -->
    <div v-if="hasEnded" class="end-screen">
      <div class="end-content">
        <h2 class="end-message">{{ storyUI.theEnd }}</h2>
        <button @click="restart" class="restart-button">
          {{ storyUI.restart }}
        </button>
        <NuxtLink to="/stories" class="back-to-list-button">
          ← {{ t('storiesList.grekoStories') }}
        </NuxtLink>
      </div>
    </div>
    
    <!-- フッター -->
    <footer class="story-footer">
      {{ t('storiesList.by') }} <NuxtLink to="/stories" class="footer-link">{{ t('storiesList.grekoStories') }}</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

.regain-your-emotions-container {
  position: relative;
  width: 100%;
  height: 100vh;
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
  font-family: 'DotGothic16', 'Courier New', monospace;
  overflow: hidden;
}

/* 固定ヘッダー */
.story-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 26, 0.95);
  border-bottom: 2px solid #5a6a7a;
  padding: 1.5rem 2rem;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.story-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.1em;
  color: #e0e8f0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* スクロールコンテナ */
.scroll-container {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 80px;
  overflow: hidden;
  /* ユーザーによるスクロールを完全に無効化 */
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* スクロールアニメーション */
.scroll-container.scrolling {
  animation: autoScroll 115s linear forwards;
}

@keyframes autoScroll {
  from {
    scroll-behavior: smooth;
  }
  to {
    scroll-behavior: smooth;
  }
}

.scroll-container.scrolling .story-content {
  animation: contentScroll 115s linear forwards;
}

@keyframes contentScroll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% + 100vh - 160px));
  }
}

.story-content {
  padding: 2rem;
  min-height: calc(100vh - 160px);
}

/* 開始プロンプト */
.start-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.prompt-text {
  font-size: 1rem;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  animation: blink 1.5s step-start infinite;
}

.volume-warning {
  font-size: 0.875rem;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  color: #ccff00;
  text-shadow: 0 0 8px rgba(204, 255, 0, 0.4);
}

@keyframes blink {
  50% {
    opacity: 0.4;
  }
}

.start-button {
  background: #5a6a7a;
  color: #0f0f1a;
  border: 3px solid #5a6a7a;
  padding: 1rem 3rem;
  font-family: 'DotGothic16', 'Courier New', monospace;
  font-size: 1.25rem;
  cursor: pointer;
  letter-spacing: 0.15em;
  transition: all 0.2s ease;
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.5),
    inset 2px 2px 0 rgba(255, 255, 255, 0.2);
}

.start-button:hover {
  background: #6a7a8a;
  color: #0f0f1a;
  transform: scale(1.05);
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.6),
    inset 2px 2px 0 rgba(255, 255, 255, 0.3);
}

.start-button:active {
  transform: scale(0.95);
}

/* 物語開始時の余白 */
.story-start-spacer {
  height: 60vh;
}

/* 物語テキスト */
.story-text {
  opacity: 0;
  transition: opacity 1s ease;
}

.story-text.visible {
  opacity: 1;
}

.paragraph {
  font-size: 1rem;
  line-height: 2;
  margin-bottom: 1.5rem;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0.05em;
}

.paragraph.empty-line {
  margin-bottom: 0.5rem;
  min-height: 0.5rem;
}

/* 物語の最後に表示する画像 */
.ending-image-container {
  margin: 12rem auto 4rem;
  max-width: 800px;
  text-align: center;
  opacity: 0;
  animation: fadeInImage 2s ease-in-out 0.5s forwards;
}

@keyframes fadeInImage {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ending-image {
  max-width: 100%;
  max-height: 15rem; /* 文章7,8行分の高さ（1行2rem × 7.5行） */
  width: auto;
  height: auto;
  object-fit: contain;
  border: 3px solid #5a6a7a;
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.5),
    inset 0 2px 4px rgba(90, 106, 122, 0.1);
  image-rendering: pixelated; /* レトロゲーム風の画像表示 */
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* 物語終了後の余白 */
.story-end-spacer {
  height: 100vh;
}

/* コントロールボタン */
.controls {
  position: fixed;
  bottom: 100px;
  right: 2rem;
  z-index: 100;
}

.control-button {
  background: rgba(90, 106, 122, 0.2);
  color: #d0d8e8;
  border: 2px solid #5a6a7a;
  padding: 0.75rem 1.5rem;
  font-family: 'DotGothic16', 'Courier New', monospace;
  font-size: 0.875rem;
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4);
}

.control-button:hover {
  background: rgba(90, 106, 122, 0.3);
  border-color: #d0d8e8;
}

.control-button:active {
  transform: scale(0.95);
}

/* 終了画面 */
.end-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 26, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(8px);
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.end-content {
  text-align: center;
  padding: 2rem;
}

.end-message {
  font-size: 2rem;
  margin-bottom: 3rem;
  letter-spacing: 0.2em;
  color: #e0e8f0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.restart-button {
  background: #5a6a7a;
  color: #0f0f1a;
  border: 3px solid #5a6a7a;
  padding: 1rem 3rem;
  font-family: 'DotGothic16', 'Courier New', monospace;
  font-size: 1.125rem;
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.2s ease;
  display: block;
  margin: 0 auto 1.5rem;
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.5),
    inset 2px 2px 0 rgba(255, 255, 255, 0.2);
}

.restart-button:hover {
  background: #6a7a8a;
  color: #0f0f1a;
  transform: scale(1.05);
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.6),
    inset 2px 2px 0 rgba(255, 255, 255, 0.3);
}

.restart-button:active {
  transform: scale(0.95);
}

.back-to-list-button {
  display: inline-block;
  color: #a0a8b8;
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  padding: 0.75rem 1.5rem;
  border: 2px solid #7a8a9a;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.back-to-list-button:hover {
  color: #d0d8e8;
  border-color: #5a6a7a;
  transform: scale(1.05);
}

.back-to-list-button:active {
  transform: scale(0.95);
}

/* フッター */
.story-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 26, 0.9);
  border-top: 1px solid #3a4a5a;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #6a7a8a;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.footer-link {
  color: #7a8a9a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #5a6a7a;
  text-decoration: underline;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .story-header {
    padding: 1rem;
  }
  
  .story-title {
    font-size: 1rem;
  }
  
  .scroll-container {
    top: 60px;
    bottom: 70px;
  }
  
  .story-content {
    padding: 1rem;
  }
  
  .story-start-spacer {
    height: 50vh;
  }
  
  .paragraph {
    font-size: 0.875rem;
    line-height: 1.8;
  }
  
  .ending-image-container {
    margin: 6rem auto 2rem;
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .ending-image {
    max-height: 11.8rem; /* モバイル版：文章7,8行分の高さ（1行1.575rem × 7.5行） */
  }
  
  .start-button {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
  
  .controls {
    bottom: 80px;
    right: 1rem;
  }
  
  .control-button {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
  
  .end-message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .restart-button {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
  
  .back-to-list-button {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
}
</style>

