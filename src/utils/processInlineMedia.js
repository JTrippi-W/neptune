const processInlineMedia = (text, mediaMetadata) => {
  if (!mediaMetadata) {
    return text;
  }

  return Object.entries(mediaMetadata).reduce((accText, [key, media]) => {
    const imageUrl = media.s.u || media.s.gif;
    const markdownImage = `![](${imageUrl})`;

    return accText.replace(new RegExp(`\\*Processing img ${key}...\\*`, 'g'), markdownImage);
  }, text);
};

export default processInlineMedia;
