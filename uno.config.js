import {
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const courseColors = [
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'red',
]

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-gray-100 dark:bg-dark',
    'bg-base-second': 'bg-white dark:bg-dark-100',
    'color-base': 'text-gray-700 dark:text-white/80',
    'color-base-second': 'text-gray-400 dark:text-gray-500/50',
    'text-primary': 'text-blue-500',
    'border-base': 'border border-gray-200 dark:border-gray/50',
    'bg-primary': 'bg-light-blue-500 dark:bg-light-blue-600/80',
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex justify-between',
    'w-primary': 'w-100% max-w-750px ma-a h-100vh',
    'img-auto': 'max-w-100% max-h-100% w-auto h-auto',
    theme: 'text-#fb5656',
  },
  presets: [
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    /**
     * you can add `presetAttributify()` here to enable unocss attributify mode prompt
     * although preset is not working for applet, but will generate useless css
     */
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
  ],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${+d / 4}rem` })],
    [/^p-(\d+)$/, (match) => ({ padding: `${+match[1] / 4}rem` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${+d * 100}` })],

    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  safelist: [
    ...courseColors.map((c) => `bg-${c}`),
    ...courseColors.map((c) => `bg-${c}-3`),
    ...courseColors.map((c) => `text-${c}-5`),
  ],
})
