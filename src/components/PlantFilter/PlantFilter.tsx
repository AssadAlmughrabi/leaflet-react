import { Button } from '@/components/Button/Button'
import type { Filter } from '@/interfaces/plant'
import './PlantFilter.css'

const FILTERS: Filter[] = ['all', 'needs', 'watered']

const LABELS: Record<Filter, string> = {
  all: 'All',
  needs: 'Needs Water',
  watered: 'Watered',
}

interface PlantFilterProps {
  value: Filter
  counts: Record<Filter, number>
  onChange: (filter: Filter) => void
}

export function PlantFilter({ value, counts, onChange }: PlantFilterProps) {
  return (
    <div className="plant-filter" role="group" aria-label="Filter plants">
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          variant={filter === value ? 'primary' : 'outline'}
          className="filter-tab"
          aria-pressed={filter === value}
          onClick={() => onChange(filter)}
        >
          {LABELS[filter]} ({counts[filter]})
        </Button>
      ))}
    </div>
  )
}
