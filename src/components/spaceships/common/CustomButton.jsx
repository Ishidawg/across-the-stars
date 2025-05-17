import { useState } from "react"

export default function CustomButton({ normalSrc, pressedSrc, alt, onPress }) {
  const [src, setSrc] = useState(normalSrc)

  return (
    <img
      src={src}
      alt={alt}
      onMouseDown={() => {
        setSrc(pressedSrc)
        onPress?.()
      }}
      onMouseUp={() => setSrc(normalSrc)}
      onMouseLeave={() => setSrc(normalSrc)}
      style={{ cursor: "pointer", imageRendering: "pixelated" }}
    />
  )
}