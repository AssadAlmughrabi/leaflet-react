import { Link, useNavigate } from 'react-router-dom'
import { PlantForm } from '@/components/PlantForm/PlantForm'
import { usePlants } from '@/hooks/usePlants'
import type { PlantInput } from '@/interfaces/plant'
import './AddPlantPage.css'

const EMPTY_PLANT: PlantInput = {
  name: '',
  room: 'Living Room',
  wateringFrequencyDays: 7,
  wateredToday: false,
  imageKey: null,
}

export function AddPlantPage() {
  const navigate = useNavigate()
  const { addPlant } = usePlants()

  function handleSubmit(values: PlantInput) {
    addPlant(values)
    navigate('/')
  }

  return (
    <main className="screen add-plant">
      <Link to="/" className="back-link">
        ‹ My Plants
      </Link>
      <h1 className="title">Add plant</h1>
      <PlantForm
        initialValues={EMPTY_PLANT}
        submitLabel="Save plant"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </main>
  )
}
