import { useContext } from 'react'
import { PlantsContext } from '@/context/PlantsContext'

export function usePlants() {
  const context = useContext(PlantsContext)
  if (!context) throw new Error('usePlants must be used inside <PlantsProvider>')
  return context
}
