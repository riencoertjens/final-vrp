export const MqMin = bp => `@media (min-width: ${bp})`
export const MqMax = bp => `@media (max-width: ${bp})`

export const getShowImage = (featured_media, ratio) => {
  return featured_media && featured_media.localFile
    ? featured_media.localFile.image.maxWidth.aspectRatio > ratio
      ? featured_media.localFile.image.maxWidth
      : featured_media.localFile.image.maxHeight
    : false
}
