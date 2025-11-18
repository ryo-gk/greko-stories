<script setup lang="ts">
// Odyssey of the Ethers - ジールとカプーの宇宙漂流記
const { t, locale } = useI18n()

const scrollContainer = ref<HTMLElement | null>(null)
const storyContent = ref<HTMLElement | null>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const hasStarted = ref(false)
const hasEnded = ref(false)

// 物語固有のデータ定義（このコンポーネントに閉じて管理）
const storyData = {
  id: 'odyssey-of-the-ethers',
  // 物語の最後に表示する画像（後で画像を配置する場合はここにパスを設定）
  endingImage: '/images/odyssey-of-the-ethers-ending.jpg',
  meta: {
    en: {
      title: 'Odyssey of the Ethers - Greko Stories',
      description: 'Two consciousnesses, stripped of their physical forms, drift through the cosmos. A tale of curiosity, companionship, and the endless journey through the stars.'
    },
    ja: {
      title: 'Odyssey of the Ethers - Greko Stories',
      description: '物質を失った二つの意識が宇宙を漂う。好奇心と仲間意識、そして星々を渡り歩く終わりなき旅の物語。'
    }
  },
  listInfo: {
    en: {
      title: 'Odyssey of the Ethers',
      description: 'Two consciousnesses, stripped of their physical forms, drift through the cosmos. A tale of curiosity, companionship, and the endless journey through the stars.',
      duration: '5'
    },
    ja: {
      title: 'Odyssey of the Ethers',
      description: '物質を失った二つの意識が宇宙を漂う。好奇心と仲間意識、そして星々を渡り歩く終わりなき旅の物語。',
      duration: '5'
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
      'How long had they been drifting through space? The precise sense of time had long since been lost.',
      '',
      '',
      'The being once called "Zeal" no longer possessed a body. The white fluorescent lights of the laboratory were the last memory of the "material world" they had seen, but even that outline had grown vague. A runaway high-energy particle accident had caused cells and tissues to vaporize, leaving only consciousness strangely preserved. Through an inexplicable transformation, they had been cast into the cosmos as nothing more than a thought-form.',
      '',
      'Having abandoned their material lifespan, their resistance to the flow of time had become abnormally high. A moment and an eternity had become nearly equivalent. They crossed countless galaxies without fatigue. Rather, the ever-changing scenery was the only stimulus, the fuel that kept their thoughts alive.',
      '',
      'At the end of such wandering, Zeal sensed something strange. Space was vast and cold, and even for thought-forms, encounters were rare. That was why, when they caught that wavelength, a slight vibration ran through the depths of their consciousness. Far away, a weak yet certain fluctuation of will. Like someone calling for help, or perhaps simply trying to confirm their own existence.',
      '',
      'As they drew closer, the shape appeared like a bundle of fur, or perhaps the afterimage of a small animal holding a log. This was the being Zeal would later come to call "Capu." Once, it seemed, they had possessed a body similar to what on Earth would be called a beaver. But now, like Zeal, they had been released from the material world, and only the faint light of consciousness drifted, its outline blurred.',
      '',
      'Capu\'s thought-waves were unstable, frequently wavering. Fragments of the past seeped through. A village by the water in their homeland. A peaceful life with companions. And then, the intensification of conflict between peoples. Neither defense nor escape was possible. The group was destroyed, and in the depths of despair and loneliness, Capu too had lost their physical form—Zeal understood this. Language did not pass between them. Yet, reading the intent from the fluctuations of wavelength, layers upon layers of grief and loneliness were revealed.',
      '',
      'Even so, Capu showed no hostility toward Zeal. Rather, they weakly aligned their wavelength, drawing close. Zeal, too, having touched another presence for the first time in their long, lonely wandering, felt something akin to nostalgia. They shared no material commonality, but there was one thing they certainly had in common: an intense curiosity.',
      '',
      'The faint vibrations emitted by Capu\'s thoughts curiously leaned toward showing interest in the surrounding stars. Each time they saw a new light source, their wavelength heightened, and the stimulus propagated to Zeal\'s consciousness. It was as if the two beings\' curiosity resonated and amplified each other.',
      '',
      'And so, the two consciousnesses that had become thought-forms naturally flowed into the same orbit. They skimmed the edges of nebulae, passed through the vortices of supernova remnants, drifted through the thin dust of protoplanetary systems. With each movement, a wordless dialogue took place. Light intensity, particle flow, the slightest fluctuations of gravity. By sharing these, they could grasp each other\'s position and emotions.',
      '',
      'There was no meaning in asking why beings without material form traveled together. There was no logic or purpose there. Simply, both of them faced the same direction, driven by the same impulse: to see the unknown. It could be said that thoughts born in the depths of loneliness had synchronized with the vastness of the cosmos.',
      '',
      'Eventually, a faint band of luminous dust at the edge of a galactic arm drew near. From afar it appeared quiet, but within it countless planetesimals and seeds of primitive life were scattered. Zeal felt interest and slightly strengthened their thought-wavelength. Capu responded, aligning their vibration in the same direction.',
      '',
      'And so, the first step of their journey was marked.',
      '',
      'It was not mere drifting, but the act of turning the pages of the cosmos, that great book, one by one.',
      '',
      'What follows is the tale of those who abandoned their bodies yet still wished to know the world, wandering among the stars.'
    ],
    ja: [
      '――いつからこうして宇宙を漂っているのか、正確な時間の感覚はとうに失われていた。',
      '',
      '',
      'かつて「ジール」と呼ばれていた存在は、もはや肉体を持たない。実験室の白い蛍光灯の光が最後に見た"物質世界"の記憶だが、それすら輪郭が曖昧だ。高エネルギー粒子の暴走が引き起こした事故によって、細胞も組織も蒸散し、意識だけが奇妙に残留した。説明のつかない変換を経て、ただの思念体として宇宙に放たれてしまったのである。',
      '',
      '物質としての寿命を捨てた結果、時間の流れに対する耐性が異様に高まり、瞬間も永劫もほぼ同値になった。無数の銀河を横切っても、疲労は生じない。むしろ、変わり続ける景色が唯一の刺激であり、思考を保つための燃料でもあった。',
      '',
      'そんな放浪の果てに、ジールは奇妙な気配を感じ取った。宇宙空間は広大で冷たく、思念体ですら出会いは滅多にない。それゆえ、その波長を捉えたとき、思考の深層にわずかな振動が走った。遠くで、弱々しくも確かな意思の揺らぎ。まるで誰かが助けを求めるような、あるいはただ自分の存在を確かめようとするような信号だった。',
      '',
      '近づくと、それは毛の束のようにも、丸太を抱えた小動物の残像のようにも見える形状の思念だった。後にジールが"カプー"と呼ぶようになる存在である。かつては地球で言えばビーバーに似た体つきだったらしい。しかし今はジールと同様、物質世界から解き放たれ、輪郭の薄れた意識の光だけが漂っている。',
      '',
      'カプーの思念波は不安定で、頻繁に揺れた。そこには過去の断片が滲んでいた。故郷の水辺の村、仲間との穏やかな暮らし、そして民族間の争いの激化。防衛も逃避も叶わず、群れは壊滅し、絶望と孤独の極限で、カプーもまた自らの肉体を失ったのだと理解できた。言語は通じない。しかし波長の揺らぎから意図を読めば、悲嘆と孤独が何層にも重なっていた。',
      '',
      'それでも、カプーはジールに敵意を示さなかった。むしろ弱く寄り添うように波長を合わせてきた。ジール自身も、長い孤独の放浪のなかで初めて他者の気配に触れ、どこか懐かしさに似た感覚を覚えた。物質としての共通項はないが、たったひとつ確かに共有しているものがあった。強烈な好奇心だ。',
      '',
      'カプーの思念が発する微弱な振動は、不思議と周囲の星々への興味を示す方向に偏っていた。新たな光源を見るたびに波長が高まり、ジールの意識にも刺激が伝播した。まるで両者の好奇心が共鳴し合って増幅されるようだった。',
      '',
      'こうして、思念体となった二つの意識は自然と同じ軌道へ流れ込んでいった。星雲の縁をかすめ、超新星残骸の渦をくぐり抜け、原始惑星系の薄い塵の中を漂う。そのたびに無言の対話が行われた。光の強度、粒子の流れ、重力のわずかなゆらぎ。それらを共有することで、互いの位置も感情も把握できた。',
      '',
      '物質を持たない者同士が、なぜ共に旅をするのかと問う意味はない。そこに論理や目的があるわけではなく、ただ単純に、ふたりとも未知を見たいという衝動が同じ方向を向いていたのだ。孤独の底で生まれた思念が、宇宙の広大さに同調した結果とも言える。',
      '',
      'やがて、銀河の腕の端にある淡い光の塵帯が近づいてきた。遠くからは静かに見えるが、内部には無数の微惑星や原始的生命の種が散在している。ジールはそこに興味を抱き、思念の波長をわずかに強めた。カプーもそれに応じ、同じ方向へ振動を寄せた。',
      '',
      'こうして、ふたりの旅の第一歩が刻まれた。',
      '',
      'それは、単なる漂流ではなく、宇宙という巨大な書物のページを一つずつめくる行為だった。',
      '',
      'ここから語られるのは、肉体を捨てた者たちが、なおも世界を知りたいと願い、星々を渡り歩いていく物語である。'
    ]
  }
}

// 現在の言語に応じたデータを取得
const currentLang = computed(() => (locale.value === 'ja' ? 'ja' : 'en'))
const storyTitle = computed(() => storyData.listInfo[currentLang.value].title)
const storyParagraphs = computed(() => storyData.paragraphs[currentLang.value])
const storyUI = computed(() => storyData.ui[currentLang.value])

// 物語全体の高さとスクロール速度の計算
// 3分56秒(236秒)で全体をスクロール
const SCROLL_DURATION = 236 // 秒

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
  <div class="odyssey-of-the-ethers-container">
    <audio ref="audioPlayer">
      <source src="/audio/odyssey-of-the-ethers.mp3" type="audio/mpeg">
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

.odyssey-of-the-ethers-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0a0a15;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.02) 2px,
      rgba(0, 0, 0, 0.02) 4px
    ),
    radial-gradient(
      ellipse at 50% 50%,
      rgba(100, 150, 255, 0.03) 0%,
      transparent 70%
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
  background: rgba(10, 10, 21, 0.95);
  border-bottom: 2px solid #4a5a7a;
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
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    0 0 8px rgba(100, 150, 255, 0.3);
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
  animation: autoScroll 236s linear forwards;
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
  animation: contentScroll 236s linear forwards;
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
  background: #4a5a7a;
  color: #0a0a15;
  border: 3px solid #4a5a7a;
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
  background: #5a6a8a;
  color: #0a0a15;
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
  border: 3px solid #4a5a7a;
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.5),
    inset 0 2px 4px rgba(74, 90, 122, 0.1);
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
  background: rgba(74, 90, 122, 0.2);
  color: #d0d8e8;
  border: 2px solid #4a5a7a;
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
  background: rgba(74, 90, 122, 0.3);
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
  background: rgba(10, 10, 21, 0.98);
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
  text-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.5),
    0 0 12px rgba(100, 150, 255, 0.3);
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
  background: #4a5a7a;
  color: #0a0a15;
  border: 3px solid #4a5a7a;
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
  background: #5a6a8a;
  color: #0a0a15;
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
  border: 2px solid #6a7a9a;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.back-to-list-button:hover {
  color: #d0d8e8;
  border-color: #4a5a7a;
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
  background: rgba(10, 10, 21, 0.9);
  border-top: 1px solid #2a3a5a;
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
  color: #4a5a7a;
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

