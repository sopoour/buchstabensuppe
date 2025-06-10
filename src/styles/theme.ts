import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#E0F5F6',
      contrast: '#347D80',
      defaultBlur: 'rgba(52,125, 128, 0.5)'
    },
    fg: {
      default: '#347D80',
      contrast: '#E0F5F6',
      inactive: 'rgba(255, 255, 255, 0.75)',
    },
    accent: {
      flamingo: '#FF7875',
      yellow: '#FFF747',
    },
  },
  filters: {
    backdrop: 'blur(5px)',
  }
} as const;

export default theme;
