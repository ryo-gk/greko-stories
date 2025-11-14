<script setup lang="ts">
// Neon Story - 本の世界に入った少年の冒険物語
const { t, locale } = useI18n()

const scrollContainer = ref<HTMLElement | null>(null)
const storyContent = ref<HTMLElement | null>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const hasStarted = ref(false)
const hasEnded = ref(false)

// 物語固有のデータ定義（このコンポーネントに閉じて管理）
const storyData = {
  id: 'neon-story',
  // 物語の最後に表示する画像（後で画像を配置する場合はここにパスを設定）
  endingImage: '/images/neon-story-ending.jpg',
  meta: {
    en: {
      title: 'Neon Story - Greko Stories',
      description: 'Neon, a shy boy who entered the world of a book. An adventure begins to find trustworthy companions to save the captive princess.'
    },
    ja: {
      title: 'Neon Story - Greko Stories',
      description: '本の世界に入り込んだ内気な少年、ネオン。囚われの姫を救うため、信頼できる仲間を見つける冒険が始まる。'
    }
  },
  listInfo: {
    en: {
      title: 'Neon Story',
      description: 'Neon, a shy boy who entered the world of a book. An adventure begins to find trustworthy companions to save the captive princess.',
      duration: '3'
    },
    ja: {
      title: 'Neon Story',
      description: '本の世界に入り込んだ内気な少年、ネオン。囚われの姫を救うため、信頼できる仲間を見つける冒険が始まる。',
      duration: '3'
    }
  },
  ui: {
    en: {
      startButton: 'START STORY',
      play: 'PLAY',
      pause: 'PAUSE',
      restart: 'Read Again',
      theEnd: 'THE END'
    },
    ja: {
      startButton: 'START STORY',
      play: 'PLAY',
      pause: 'PAUSE',
      restart: 'もう一度読む',
      theEnd: 'THE END'
    }
  },
  paragraphs: {
    en: [
      'Neon lay face-down on his futon, clutching a thick book to his chest. The room was dimly lit, with only the light falling on the pages illuminating his world. Outside, the night wind rustled the trees and tapped lightly against the window. But Neon\'s consciousness was entirely focused on the book.',
      '',
      '',
      'He was reading his favorite adventure story, one he had read countless times. A brave adventurer—strong, wise, caring for his companions, and facing any hardship head-on. And the companions who trusted and supported him. Neon couldn\'t help but envy that relationship.',
      '',
      '"I wish I had companions like that."',
      '',
      'He whispered softly. At school, he couldn\'t talk well with kids his age. Even when he wanted to reach out, his legs would freeze and words wouldn\'t come. Before he knew it, he spent more time alone reading books. That\'s why the friendships and adventures in books seemed to shine so brightly.',
      '',
      'As the story approached its climax, Neon slowed down his page-turning slightly. It was a scene that warmed his heart no matter how many times he read it. The protagonist and his companions joined forces and finally defeated the demon lord. When he finished reading to the end, Neon exhaled with satisfaction.',
      '',
      '"Still a great story."',
      '',
      'As he was about to close the book, he noticed something odd. Beyond the last page, there was a blank sheet. Had this page always been there? Neon furrowed his brow and gently turned the page with his fingertip.',
      '',
      'At that moment, black letters emerged in the center of the blank page.',
      '',
      '"Neon, brave Neon. Please help me... Find truly trustworthy companions. Come save me..."',
      '',
      'Neon gasped. He pulled back his trembling hand, eyes wide. The letters were definitely calling his name. Moreover, it was as if a voice was reaching him from beyond the book.',
      '',
      '"Wh-why...?"',
      '',
      'Before he could finish asking, a dazzling light overflowed from the book. The light painted his vision white, and the outline of the room and the feel of the book disappeared. He was swallowed by a sensation as if the entire world was being replaced.',
      '',
      'When the light subsided, before Neon\'s eyes spread an unfamiliar forest. Tall trees stood in rows, the wind rustled the leaves, and in the distance, he could hear the murmur of a small stream. Under his feet was moss-covered earth. There was definitely a soft texture.',
      '',
      '"Where... is this...?"',
      '',
      'Neon didn\'t realize it, but he had entered the world of the book. The stage of the adventure he had longed for. However, the adventurer who was supposed to have been defeated in the story—that brave hero—was actually the demon lord hiding his true form. And the princess imprisoned by him used the only faint path that could reach the outside world to call for Neon\'s help.',
      '',
      'As the forest wind blew through, Neon trembled slightly. But in the depths of his chest, a different emotion was budding than usual. Not just fear. Somehow, a quickening that hinted at the beginning of an adventure.',
      '',
      'Could this shy boy, who found it difficult even to make friends, find trustworthy companions and save the princess?',
      '',
      'His long journey had only just taken its first step.'
    ],
    ja: [
      'ネオンは、布団の上にうつ伏せになりながら、一冊の分厚い本を胸に抱えていた。部屋の灯りは弱く、ページの上に落ちる光だけが彼の世界を照らしている。家の外では夜風が木々を揺らし、窓を軽く叩く音がする。けれど、ネオンの意識はすべて本の中に向いていた。',
      '',
      '',
      '彼が読んでいるのは、何度も読み返したお気に入りの冒険物語だ。勇敢な冒険者──強く、賢く、仲間想いで、どんな困難があっても立ち向かっていく主人公。そして、彼を信頼して支える仲間たち。ネオンはその関係がうらやましくて仕方がなかった。',
      '',
      '「僕にも、あんな仲間がいたらな。」',
      '',
      '小さくつぶやく。学校では、同年代の子たちとうまく話せない。声をかけたいと思っても足がすくみ、言葉が出てこない。気づけば一人で本を読む時間が増えていた。だからこそ、本の世界の友情や冒険が輝いて見えるのだった。',
      '',
      '物語の終盤に差し掛かり、ネオンはページをめくる手を少しだけゆっくりにした。何度読んでも心が熱くなる場面だ。主人公が仲間たちと力を合わせ、ついに魔王を倒す。最後まで読み切ると、ネオンは満足げに息を吐いた。',
      '',
      '「やっぱりいい話だな。」',
      '',
      '本を閉じかけたとき、違和感に気づいた。最後のページのさらに奥に、一枚の白紙のページがある。こんなページ、あっただろうか。ネオンは眉をひそめ、そっと指先で紙をめくった。',
      '',
      'その瞬間、白紙の中央に黒い文字が浮かび上がった。',
      '',
      '「ネオン、勇者ネオン。私を助けて……。本当に信頼できる仲間を見つけて。私を助けにきて……。」',
      '',
      'ネオンは息をのんだ。震える手を引っ込め、目を見開く。文字は確かに、彼の名前を呼んでいる。しかも、まるで本の向こう側から声が届くかのように。',
      '',
      '「な、なんで……？」',
      '',
      '問いかけるより早く、本からまばゆい光があふれ出した。光は彼の視界を白く塗りつぶし、部屋の輪郭も、本の感触も消えていく。まるで世界ごと入れ替わるような感覚に飲み込まれた。',
      '',
      'やがて光が収まり、ネオンの目の前には、見知らぬ森が広がっていた。背の高い木々が並び、風が葉を揺らし、遠くでは小さな川のせせらぎが聞こえる。足元には苔むした大地。確かに柔らかい感触がある。',
      '',
      '「ここ……どこ……？」',
      '',
      'ネオンは気づいていなかったが、彼は本の世界に入っていた。彼が憧れていた冒険の舞台。しかし、物語で倒されたはずの冒険者──あの勇敢な英雄──実は本当の姿を隠した魔王だったのだ。そして、彼に囚われた姫が、外の世界に唯一届くわずかな道を使って、ネオンへ助けを求めたのである。',
      '',
      '森の風が吹き抜ける中、ネオンは小さく震える。けれど、その胸の奥には、いつもとは違う感情が芽生えていた。恐怖だけではない。どこか、冒険の始まりを予感させるような高鳴り。',
      '',
      '内気で、友達をつくることすら難しかった少年は、信頼できる仲間を見つけ、姫を救うことができるのだろうか。',
      '',
      '彼の長い旅は、まだ一歩目を踏み出したばかりだった。'
    ]
  }
}

// 現在の言語に応じたデータを取得
const currentLang = computed(() => (locale.value === 'ja' ? 'ja' : 'en'))
const storyTitle = computed(() => storyData.listInfo[currentLang.value].title)
const storyParagraphs = computed(() => storyData.paragraphs[currentLang.value])
const storyUI = computed(() => storyData.ui[currentLang.value])

// 物語全体の高さとスクロール速度の計算
// 3分22秒(202秒)で全体をスクロール
const SCROLL_DURATION = 202 // 秒

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
</script>

<template>
  <div class="neon-story-container">
    <audio ref="audioPlayer">
      <source src="/audio/neon-story.mp3" type="audio/mpeg">
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

.neon-story-container {
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
  animation: autoScroll 202s linear forwards;
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
  animation: contentScroll 202s linear forwards;
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
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
  animation: blink 1.5s step-start infinite;
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

