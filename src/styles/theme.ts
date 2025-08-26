import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#E0F5F6',
      contrast: '#0C3037',
      defaultBlur: 'rgba(52,125, 128, 0.8)'
    },
    fg: {
      default: '#0C3037',
      contrast: '#E0F5F6',
      inactive: 'rgba(255, 255, 255, 0.75)',
    },
    accent: {
      flamingo: '#8B2F3E',
      yellow: '#FFA361',
    },
  },
  filters: {
    backdrop: 'blur(5px)',
  }
} as const;

export default theme;
