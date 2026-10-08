import './ProgressBar.css'

interface ProgressBarProps {
  value: number
  label: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  )
}
