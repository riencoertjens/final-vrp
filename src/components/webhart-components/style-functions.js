export const MqMin = bp => `@media (min-width: ${bp})`
export const MqMax = bp => `@media (max-width: ${bp})`

export const getShowImage = (image, ratio) => {
  return image && image.file
    ? image.file.image.maxWidth.aspectRatio > ratio
      ? image.file.image.maxWidth
      : image.file.image.maxHeight
    : false
}

export const getCropFocus = smartcrop_image_focus => {
  return smartcrop_image_focus && Object.keys(smartcrop_image_focus).length > 0
    ? `${smartcrop_image_focus.left}% ${smartcrop_image_focus.top}%`
    : "50% 50%"
}

export const getAspectRatioImage = (image, ratio) => {
  const showImage = getShowImage(image, ratio)
  if (showImage) {
    const cropFocus = getCropFocus(image.smartcrop_image_focus)
    console.log(cropFocus)
    return {
      image: showImage,
      cropFocus: cropFocus,
    }
  } else {
    return false
  }
}
