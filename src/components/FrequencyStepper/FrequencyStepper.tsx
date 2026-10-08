import { Button } from '@/components/Button/Button'
import './FrequencyStepper.css'

interface FrequencyStepperProps {
  id: string
  value: number
  min: number
  max: number
  onChange: (days: number) => void
  errorId?: string
}

export function FrequencyStepper({ id, value, min, max, onChange, errorId }: FrequencyStepperProps) {
  const unitId = `${id}-unit`

  function change(days: number) {
    onChange(Math.min(max, Math.max(0, days)))
  }

  return (
    <div className="stepper">
      <Button
        variant="outline"
        className="stepper-button"
        aria-label="Decrease watering frequency"
        disabled={value <= min}
        onClick={() => change(value - 1)}
      >
        −
      </Button>
      <input
        id={id}
        className="stepper-input"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => change(parseInt(event.target.value, 10) || 0)}
        aria-invalid={errorId !== undefined}
        aria-describedby={errorId ?? unitId}
      />
      <Button
        variant="outline"
        className="stepper-button"
        aria-label="Increase watering frequency"
        disabled={value >= max}
        onClick={() => change(value + 1)}
      >
        +
      </Button>
      <span id={unitId} className="stepper-unit">
        days
      </span>
    </div>
  )
}
