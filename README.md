# Greko Stories

A web application that provides multiple short stories with synchronized background music. Each story features an auto-scrolling narrative experience with music that matches the story's mood and atmosphere.

## Repository Overview

Greko Stories is a Nuxt.js-based web application that delivers immersive storytelling experiences. Each story app features:

- **Auto-scrolling narrative**: Stories automatically scroll from top to bottom
- **Synchronized music**: Background music that matches the story's emotional tone
- **Retro game aesthetic**: 8-16bit game-style fonts and pixel-art inspired design
- **Multilingual support**: Currently supports Japanese and English
- **Independent story apps**: Each story is a self-contained component with its own data

## Application Architecture

### Technology Stack

- **Framework**: Nuxt 4
- **UI Libraries**: 
  - `@nuxt/icon` for icons
  - `reka-ui/nuxt` for the story list page
- **Internationalization**: `@nuxtjs/i18n`
- **Package Manager**: pnpm

### Project Structure

```
greko-stories/
├── app/
│   ├── pages/
│   │   ├── index.vue              # Redirects to /stories
│   │   └── stories/
│   │       ├── index.vue          # Story list page
│   │       └── {story-name}.vue   # Story routing pages
│   ├── src/
│   │   └── components/
│   │       └── {StoryName}Page.vue  # Individual story components
│   └── locales/
│       ├── en.json                # English translations (common UI only)
│       └── ja.json                # Japanese translations (common UI only)
├── public/
│   ├── audio/                     # Story audio files
│   └── images/                    # Story images
└── nuxt.config.ts
```

### Key Design Principles

1. **Story Independence**: Each story app (`{StoryName}Page.vue`) contains all its own data:
   - Story text (Japanese and English)
   - Title and description
   - UI labels
   - Meta information (SEO)
   - Ending image path

2. **Global Translations**: Only common UI elements are stored in `app/locales/`:
   - Story list page UI
   - Footer text
   - Language switcher labels

3. **No External UI Libraries in Stories**: Story components use only custom CSS to maintain their unique aesthetic.

## Adding a New Story App

### Step-by-Step Guide

1. **Create the Story Component**
   - Copy `app/src/components/NeonStoryPage.vue` as a template
   - Rename it to `{YourStoryName}Page.vue`
   - Update the `storyData` object with your story's content:
     - `id`: Unique identifier (e.g., 'your-story-name')
     - `endingImage`: Path to ending image (e.g., '/images/your-story-ending.jpg')
     - `meta`: Title and description for SEO (Japanese and English)
     - `listInfo`: Title, description, and duration for the story list
     - `ui`: Button labels and UI text (Japanese and English)
     - `paragraphs`: Story text as an array of strings (Japanese and English)

2. **Create the Routing Page**
   - Create `app/pages/stories/{your-story-name}.vue`
   - Import and use your story component:
   ```vue
   <script setup lang="ts">
   import YourStoryPage from '~/src/components/YourStoryPage.vue'
   </script>
   
   <template>
     <YourStoryPage />
   </template>
   ```

3. **Add to Story List**
   - Edit `app/pages/stories/index.vue`
   - Add your story to the `storyList` array:
   ```typescript
   {
     id: 'your-story-name',
     title: {
       en: 'Your Story Title',
       ja: 'あなたの物語のタイトル'
     },
     description: {
       en: 'English description...',
       ja: '日本語の説明...'
     },
     duration: '5',
     path: '/stories/your-story-name'
   }
   ```

4. **Add Assets** (if needed)
   - Place audio file in `public/audio/{your-story-name}.mp3`
   - Place ending image in `public/images/{your-story-name}-ending.jpg`
   - Update the audio source path in your story component if different

### Example Prompt for AI Assistants

When asking an AI assistant to create a new story app, use this prompt structure:

```
Create a new story app called "{StoryName}" for Greko Stories.

Story details:
- Title (EN): {English title}
- Title (JA): {Japanese title}
- Description (EN): {English description}
- Description (JA): {Japanese description}
- Duration: {X} minutes
- Story ID: {story-id}

Story content:
- Provide the full story text in Japanese (as an array of paragraphs)
- Provide the full story text in English (as an array of paragraphs)

Requirements:
1. Create {StoryName}Page.vue in app/src/components/
2. Create {story-id}.vue in app/pages/stories/
3. Add the story to the storyList in app/pages/stories/index.vue
4. Follow the same structure as NeonStoryPage.vue
5. All story-specific data should be contained within the component
6. Use the same styling approach (custom CSS, no external UI libraries)
7. Include support for an ending image (set endingImage path)
8. Ensure all UI text is bilingual (Japanese and English)
```

### Example: Creating "Mystery Tale"

```
Create a new story app called "Mystery Tale" for Greko Stories.

Story details:
- Title (EN): Mystery Tale
- Title (JA): ミステリーテール
- Description (EN): A detective story about solving a mysterious case in a small town.
- Description (JA): 小さな町で起こった謎の事件を解決する探偵物語。
- Duration: 5 minutes
- Story ID: mystery-tale

Story content:
[Japanese story paragraphs here]
[English story paragraphs here]

Requirements:
[Same as above]
```

## Development

### Setup

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Features

- ✅ Auto-scrolling stories with synchronized music
- ✅ Multilingual support (Japanese/English)
- ✅ Browser language detection
- ✅ Manual language switching
- ✅ Responsive design
- ✅ Retro game aesthetic
- ✅ Independent story components
- ✅ SEO-friendly meta tags

## License

Private repository.
