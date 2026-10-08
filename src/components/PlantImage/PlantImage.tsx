import noImageIcon from '@/assets/icons/no-image.svg'
import { plantImages } from '@/data/plantImages'
import type { ImageKey } from '@/interfaces/plant'
import './PlantImage.css'

interface PlantImageProps {
  imageKey: ImageKey | null
  className?: string
}

export function PlantImage({ imageKey, className }: PlantImageProps) {
  const classes = ['plant-image', className].filter(Boolean).join(' ')

  if (!imageKey) {
    return (
      <div className={`${classes} plant-image-empty`}>
        <img src={noImageIcon} alt="" width="24" height="24" />
        <span>No image</span>
      </div>
    )
  }

  const image = plantImages[imageKey]
  return <img className={classes} src={image.src} alt={`${image.label} illustration`} />
}
