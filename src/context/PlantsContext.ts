import { createContext } from 'react'
import type { Plant, PlantInput } from '@/interfaces/plant'

export interface PlantsContextValue {
  plants: Plant[]
  addPlant: (input: PlantInput) => void
  updatePlant: (id: string, input: PlantInput) => void
  deletePlant: (id: string) => void
  toggleWatered: (id: string) => void
}

export const PlantsContext = createContext<PlantsContextValue | null>(null)
