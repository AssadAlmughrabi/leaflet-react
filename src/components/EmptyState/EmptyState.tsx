import plusIcon from '@/assets/icons/plus.svg'
import emptyStatePlant from '@/assets/plants/empty-state-plant.png'
import { Button } from '@/components/Button/Button'
import './EmptyState.css'

interface EmptyStateProps {
  onAdd: () => void
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <img className="empty-state-image" src={emptyStatePlant} alt="" />
      <h2 className="empty-state-title">No plants yet</h2>
      <p className="empty-state-text">Add your first plant to start tracking watering.</p>
      <Button className="empty-state-button" onClick={onAdd}>
        <img src={plusIcon} alt="" width="16" height="16" />
        Add your first plant
      </Button>
    </section>
  )
}
