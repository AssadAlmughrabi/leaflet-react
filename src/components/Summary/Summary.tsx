import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import './Summary.css'

interface SummaryProps {
  watered: number
  total: number
}

export function Summary({ watered, total }: SummaryProps) {
  const percent = total === 0 ? 0 : Math.round((watered / total) * 100)

  return (
    <section className="summary" aria-label="Watering summary">
      <p className="summary-label">Watered today</p>
      <div className="summary-row">
        <p className="summary-count">
          {watered}/{total}
        </p>
        <ProgressBar value={percent} label="Plants watered today" />
        <span className="summary-percent">{percent}%</span>
      </div>
    </section>
  )
}
