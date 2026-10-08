import { useEffect, useRef, useState } from 'react'
import checkIcon from '@/assets/icons/check.svg'
import { Button } from '@/components/Button/Button'
import { PlantImage } from '@/components/PlantImage/PlantImage'
import { plantImages } from '@/data/plantImages'
import type { ImageKey } from '@/interfaces/plant'
import './ImagePicker.css'

const OPTIONS: (ImageKey | null)[] = [null, ...(Object.keys(plantImages) as ImageKey[])]

interface ImagePickerProps {
  value: ImageKey | null
  backLabel: string
  onSelect: (imageKey: ImageKey | null) => void
  onCancel: () => void
}

export function ImagePicker({ value, backLabel, onSelect, onCancel }: ImagePickerProps) {
  const [draft, setDraft] = useState<ImageKey | null>(value)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <div className="image-picker">
      <button type="button" className="back-link" onClick={onCancel}>
        ‹ {backLabel}
      </button>
      <h1 ref={titleRef} className="title" tabIndex={-1}>
        Choose plant image
      </h1>
      <p className="image-picker-subtitle">Pick an illustration for this plant.</p>

      <ul className="image-picker-grid">
        {OPTIONS.map((option) => {
          const selected = option === draft
          const label = option ? plantImages[option].label : 'No image'

          return (
            <li key={option ?? 'none'} className="image-picker-item">
              <button
                type="button"
                className={selected ? 'image-picker-tile selected' : 'image-picker-tile'}
                aria-pressed={selected}
                aria-label={label}
                onClick={() => setDraft(option)}
              >
                {selected && (
                  <span className="image-picker-check">
                    <img src={checkIcon} alt="" width="14" height="14" />
                  </span>
                )}
                <PlantImage imageKey={option} className="image-picker-image" />
                {selected && <span className="image-picker-selected">Selected</span>}
                {option && <span className="image-picker-label">{label}</span>}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="image-picker-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSelect(draft)}>Use selected image</Button>
      </div>
    </div>
  )
}
