import aloeVera from '@/assets/plants/aloe-vera.png'
import basil from '@/assets/plants/basil.png'
import bostonFern from '@/assets/plants/boston-fern.png'
import monstera from '@/assets/plants/monstera.png'
import snakePlant from '@/assets/plants/snake-plant.png'
import succulentTrio from '@/assets/plants/succulent-trio.png'
import type { ImageKey } from '@/interfaces/plant'

export const plantImages: Record<ImageKey, { src: string; label: string }> = {
  monstera: { src: monstera, label: 'Monstera' },
  'snake-plant': { src: snakePlant, label: 'Snake Plant' },
  basil: { src: basil, label: 'Basil' },
  'aloe-vera': { src: aloeVera, label: 'Aloe Vera' },
  'boston-fern': { src: bostonFern, label: 'Boston Fern' },
  'succulent-trio': { src: succulentTrio, label: 'Succulent Trio' },
}
