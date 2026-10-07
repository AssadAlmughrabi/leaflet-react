export type ImageKey =
  | 'monstera'
  | 'snake-plant'
  | 'basil'
  | 'aloe-vera'
  | 'boston-fern'
  | 'succulent-trio'

export interface Plant {
  id: string
  name: string
  room: string
  wateringFrequencyDays: number
  wateredToday: boolean
  imageKey: ImageKey | null
}

export type Filter = 'all' | 'needs' | 'watered'

export type PlantInput = Omit<Plant, 'id'>
