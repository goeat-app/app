export const theme = {
  colors: {
    primary: {
      DEFAULT: '#FF6B35',
      hover: '#e85a28',
      light: '#FF724C',
      lighter: '#FF7A00',
    },

    background: {
      DEFAULT: '#FDF6F5',
      secondary: '#FBF3ED',
      accent: '#FBDD9C',
      progress: '#FFC8A6FF',
    },

    text: {
      DEFAULT: '#00141C',
      secondary: '#828282',
      tertiary: '#797777',
      light: '#F3F3F3',
    },

    neutral: {
      white: '#E1E1E6',
      gray: {
        DEFAULT: '#E0E0E0',
        light: '#F3F3F3',
      },
    },
  },
} as const;

export type Theme = typeof theme;
