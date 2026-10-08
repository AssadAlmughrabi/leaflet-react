import moreIcon from '@/assets/icons/more.svg'
import { Button } from '@/components/Button/Button'
import { PlantImage } from '@/components/PlantImage/PlantImage'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'
import type { Plant } from '@/interfaces/plant'
import './PlantCard.css'

interface PlantCardProps {
  plant: Plant
  onToggle: (id: string) => void
  onMore: (id: string) => void
}

export function PlantCard({ plant, onToggle, onMore }: PlantCardProps) {
  return (
    <li className="plant-card">
      <PlantImage imageKey={plant.imageKey} className="plant-card-image" />

      <div className="plant-card-body">
        <div className="plant-card-top">
          <div className="plant-card-text">
            <h2 className="plant-card-name">{plant.name}</h2>
            <p className="plant-card-meta">
              {plant.room} · every {plant.wateringFrequencyDays} days
            </p>
          </div>
          <Button
            variant="ghost"
            className="plant-card-more"
            aria-label={`More actions for ${plant.name}`}
            onClick={() => onMore(plant.id)}
          >
            <span className="plant-card-more-dot">
              <img src={moreIcon} alt="" width="16" height="16" />
            </span>
          </Button>
        </div>

        <div className="plant-card-bottom">
          <StatusBadge watered={plant.wateredToday} />
          <Button
            variant={plant.wateredToday ? 'muted' : 'amber'}
            className="plant-card-toggle"
            onClick={() => onToggle(plant.id)}
          >
            {plant.wateredToday ? 'Mark as needs water' : 'Mark as watered'}
          </Button>
        </div>
      </div>
    </li>
  )
}
