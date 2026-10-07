import type { Plant } from '@/interfaces/plant'

export const initialPlants: Plant[] = [
  {
    id: 'monstera',
    name: 'Monstera',
    room: 'Living Room',
    wateringFrequencyDays: 7,
    wateredToday: true,
    imageKey: 'monstera',
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    room: 'Bedroom',
    wateringFrequencyDays: 14,
    wateredToday: false,
    imageKey: 'snake-plant',
  },
  {
    id: 'basil',
    name: 'Basil',
    room: 'Kitchen',
    wateringFrequencyDays: 2,
    wateredToday: false,
    imageKey: 'basil',
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    room: 'Bathroom',
    wateringFrequencyDays: 21,
    wateredToday: true,
    imageKey: 'aloe-vera',
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    room: 'Hallway',
    wateringFrequencyDays: 3,
    wateredToday: false,
    imageKey: 'boston-fern',
  },
  {
    id: 'succulent-trio',
    name: 'Succulent Trio',
    room: 'Office',
    wateringFrequencyDays: 10,
    wateredToday: true,
    imageKey: 'succulent-trio',
  },
]
