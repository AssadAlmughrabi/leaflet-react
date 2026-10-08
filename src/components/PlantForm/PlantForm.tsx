import { useState, type FormEvent } from 'react'
import closeIcon from '@/assets/icons/close.svg'
import imageIcon from '@/assets/icons/image.svg'
import { Button } from '@/components/Button/Button'
import { FrequencyStepper } from '@/components/FrequencyStepper/FrequencyStepper'
import { PlantImage } from '@/components/PlantImage/PlantImage'
import { ROOMS } from '@/data/rooms'
import type { PlantInput } from '@/interfaces/plant'
import './PlantForm.css'

const MIN_DAYS = 1
const MAX_DAYS = 365

interface PlantFormProps {
  initialValues: PlantInput
  submitLabel: string
  onSubmit: (values: PlantInput) => void
  onCancel: () => void
}

export function PlantForm({ initialValues, submitLabel, onSubmit, onCancel }: PlantFormProps) {
  const [values, setValues] = useState<PlantInput>(initialValues)
  const [nameError, setNameError] = useState('')
  const [frequencyError, setFrequencyError] = useState('')

  function update<K extends keyof PlantInput>(key: K, value: PlantInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function changeFrequency(days: number) {
    update('wateringFrequencyDays', days)
    setFrequencyError('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = values.name.trim()
    const frequencyValid = values.wateringFrequencyDays >= MIN_DAYS

    setNameError(name ? '' : 'Please enter a plant name.')
    setFrequencyError(frequencyValid ? '' : `Must be at least ${MIN_DAYS} day.`)
    if (!name || !frequencyValid) return

    onSubmit({ ...values, name })
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit} noValidate>
      <div className="plant-form-card">
        <div className="plant-form-field" role="group" aria-labelledby="plant-image-label">
          <span id="plant-image-label" className="plant-form-label">
            Plant image
          </span>
          <div className="plant-form-image">
            <PlantImage imageKey={values.imageKey} className="plant-form-preview" />
            <div className="plant-form-image-actions">
              <Button variant="secondary" className="plant-form-image-button" onClick={() => {}}>
                <img src={imageIcon} alt="" width="20" height="20" />
                {values.imageKey ? 'Change plant image' : 'Choose plant image'}
              </Button>
              {values.imageKey && (
                <Button
                  variant="outline"
                  className="plant-form-image-button"
                  onClick={() => update('imageKey', null)}
                >
                  <img src={closeIcon} alt="" width="16" height="16" />
                  Remove image
                </Button>
              )}
              <p className="plant-form-hint">Choose from the supplied plant illustrations.</p>
            </div>
          </div>
        </div>

        <div className="plant-form-field">
          <label className="plant-form-label" htmlFor="plant-name">
            Plant name
          </label>
          <input
            id="plant-name"
            className="plant-form-input"
            type="text"
            placeholder="e.g. Peace Lily"
            value={values.name}
            onChange={(event) => {
              update('name', event.target.value)
              setNameError('')
            }}
            aria-invalid={nameError !== ''}
            aria-describedby={nameError ? 'plant-name-error' : undefined}
          />
          {nameError && (
            <p id="plant-name-error" className="plant-form-error">
              {nameError}
            </p>
          )}
        </div>

        <div className="plant-form-field">
          <label className="plant-form-label" htmlFor="plant-room">
            Room
          </label>
          <select
            id="plant-room"
            className="plant-form-input plant-form-select"
            value={values.room}
            onChange={(event) => update('room', event.target.value)}
          >
            {ROOMS.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        <div className="plant-form-field">
          <label className="plant-form-label" htmlFor="plant-frequency">
            Watering frequency
          </label>
          <FrequencyStepper
            id="plant-frequency"
            value={values.wateringFrequencyDays}
            min={MIN_DAYS}
            max={MAX_DAYS}
            onChange={changeFrequency}
            errorId={frequencyError ? 'plant-frequency-error' : undefined}
          />
          {frequencyError && (
            <p id="plant-frequency-error" className="plant-form-error">
              {frequencyError}
            </p>
          )}
        </div>

        <label className="plant-form-switch-row" htmlFor="plant-watered">
          <span className="plant-form-label">Watered today?</span>
          <input
            id="plant-watered"
            className="plant-form-switch"
            type="checkbox"
            role="switch"
            checked={values.wateredToday}
            onChange={(event) => update('wateredToday', event.target.checked)}
          />
        </label>
      </div>

      <div className="plant-form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
