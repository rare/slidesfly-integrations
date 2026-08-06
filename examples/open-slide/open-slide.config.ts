import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  base: './',
  build: {
    showSlideBrowser: true,
    showSlideUi: false,
    allowHtmlDownload: false,
  },
};

export default openSlideConfig;
