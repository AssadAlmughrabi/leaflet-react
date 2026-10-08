import { useState, type ReactNode } from 'react'
import { initialPlants } from '@/data/initialPlants'
import type { Plant, PlantInput } from '@/interfaces/plant'
import { PlantsContext } from './PlantsContext'

export function PlantsProvider({ children }: { children: ReactNode }) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants)

  function addPlant(input: PlantInput) {
    const plant: Plant = { ...input, id: crypto.randomUUID() }
    setPlants((prev) => [...prev, plant])
  }

  function updatePlant(id: string, input: PlantInput) {
    setPlants((prev) => prev.map((plant) => (plant.id === id ? { ...input, id } : plant)))
  }

  function deletePlant(id: string) {
    setPlants((prev) => prev.filter((plant) => plant.id !== id))
  }

  function toggleWatered(id: string) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id ? { ...plant, wateredToday: !plant.wateredToday } : plant,
      ),
    )
  }

  return (
    <PlantsContext value={{ plants, addPlant, updatePlant, deletePlant, toggleWatered }}>
      {children}
    </PlantsContext>
  )
}
