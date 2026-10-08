import { PlantCard } from '@/components/PlantCard/PlantCard'
import type { Plant } from '@/interfaces/plant'
import './PlantList.css'

interface PlantListProps {
  plants: Plant[]
  onToggle: (id: string) => void
  onMore: (id: string) => void
}

export function PlantList({ plants, onToggle, onMore }: PlantListProps) {
  return (
    <ul className="plant-list">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onToggle={onToggle} onMore={onMore} />
      ))}
    </ul>
  )
}
