import needsWaterIcon from '@/assets/icons/needs-water.png'
import wateredTodayIcon from '@/assets/icons/watered-today.png'
import './StatusBadge.css'

interface StatusBadgeProps {
  watered: boolean
}

export function StatusBadge({ watered }: StatusBadgeProps) {
  return (
    <span className={watered ? 'status-badge watered' : 'status-badge needs'}>
      <img src={watered ? wateredTodayIcon : needsWaterIcon} alt="" width="16" height="16" />
      {watered ? 'Watered today' : 'Needs water'}
    </span>
  )
}
