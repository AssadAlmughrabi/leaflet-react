import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import trashIcon from '@/assets/icons/trash.svg'
import { ActionModal } from '@/components/ActionModal/ActionModal'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Header } from '@/components/Header/Header'
import { Modal } from '@/components/Modal/Modal'
import { PlantFilter } from '@/components/PlantFilter/PlantFilter'
import { PlantList } from '@/components/PlantList/PlantList'
import { Summary } from '@/components/Summary/Summary'
import { usePlants } from '@/hooks/usePlants'
import type { Filter } from '@/interfaces/plant'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { plants, toggleWatered, deletePlant } = usePlants()
  const [filter, setFilter] = useState<Filter>('all')
  const [actionPlantId, setActionPlantId] = useState<string | null>(null)
  const [deletePlantId, setDeletePlantId] = useState<string | null>(null)

  const actionPlant = plants.find((plant) => plant.id === actionPlantId)
  const plantToDelete = plants.find((plant) => plant.id === deletePlantId)

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
        <PlantList plants={visiblePlants} onToggle={toggleWatered} onMore={setActionPlantId} />
      )}

      {actionPlant && (
        <ActionModal
          plant={actionPlant}
          onEdit={() => navigate(`/edit/${actionPlant.id}`)}
          onDelete={() => {
            setActionPlantId(null)
            setDeletePlantId(actionPlant.id)
          }}
          onClose={() => setActionPlantId(null)}
        />
      )}

      {plantToDelete && (
        <Modal
          variant="warning"
          icon={trashIcon}
          title={`Delete ${plantToDelete.name}?`}
          cancelLabel="Keep plant"
          confirmLabel="Delete plant"
          onCancel={() => setDeletePlantId(null)}
          onConfirm={() => {
            deletePlant(plantToDelete.id)
            setDeletePlantId(null)
          }}
        >
          <p>This will remove {plantToDelete.name} from your list.</p>
          <p className="modal-warning-text">This can’t be undone.</p>
        </Modal>
      )}
    </main>
  )
}
