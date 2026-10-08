//hooks
import { usePlants } from '@/hooks/usePlants'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//components
import { Header } from '@/components/Header/Header'
import { PlantFilter } from '@/components/PlantFilter/PlantFilter'
import { Summary } from '@/components/Summary/Summary'
//interfaces
import type { Filter } from '@/interfaces/plant'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { plants } = usePlants()
  const [filter, setFilter] = useState<Filter>('all')

  const total = plants.length
  const watered = plants.filter((plant) => plant.wateredToday).length
  const needs = total - watered

  return (
    <main className="screen home">
      <Header onAdd={() => navigate('/add')} />
      <Summary watered={watered} total={total} />
      <PlantFilter
        value={filter}
        counts={{ all: total, needs, watered }}
        onChange={setFilter}
      />
    </main>
  )
}
