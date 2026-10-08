import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
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

  const goToAdd = () => navigate('/add')

  return (
    <main className="screen home">
      <Header onAdd={goToAdd} />
      <Summary watered={watered} total={total} />
      <PlantFilter
        value={filter}
        counts={{ all: total, needs, watered }}
        onChange={setFilter}
      />
      {total === 0 ? (
        <EmptyState onAdd={goToAdd} />
      ) : visiblePlants.length === 0 ? (
        <p className="home-filter-empty">
          {filter === 'needs' ? 'No plants need water.' : 'No plants watered yet.'}
        </p>
      ) : (
        <PlantList plants={visiblePlants} onToggle={toggleWatered} onMore={() => {}} />
      )}
    </main>
  )
}
