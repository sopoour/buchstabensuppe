import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#347D80',
      soft: '#D4EAEA',
    },
    fg: {
      default: '#FFFFFF',
      contrast: '#000000',
      inactive: 'rgba(255, 255, 255, 0.75)',
    },
    accent: {
      flamingo: '#FF7875',
      yellow: '#FFF747',
    },
  },
  filters: {
    backdrop: 'blur(8px)',
  }
} as const;

export default theme;
