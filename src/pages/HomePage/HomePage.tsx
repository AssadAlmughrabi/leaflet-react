import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { PlantFilter } from '@/components/PlantFilter/PlantFilter'
import { PlantList } from '@/components/PlantList/PlantList'
import { Summary } from '@/components/Summary/Summary'
import { usePlants } from '@/hooks/usePlants'
import type { Filter } from '@/interfaces/plant'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { plants, toggleWatered } = usePlants()
  const [filter, setFilter] = useState<Filter>('all')

  const total = plants.length
  const watered = plants.filter((plant) => plant.wateredToday).length
  const needs = total - watered

  const visiblePlants = plants.filter((plant) => {
    if (filter === 'needs') return !plant.wateredToday
    if (filter === 'watered') return plant.wateredToday
    return true
  })

  return (
    <main className="screen home">
      <Header onAdd={() => navigate('/add')} />
      <Summary watered={watered} total={total} />
      <PlantFilter
        value={filter}
        counts={{ all: total, needs, watered }}
        onChange={setFilter}
      />
      <PlantList plants={visiblePlants} onToggle={toggleWatered} onMore={() => {}} />
    </main>
  )
}
