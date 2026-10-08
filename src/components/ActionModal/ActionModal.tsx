import pencilIcon from '@/assets/icons/pencil.svg'
import trashIcon from '@/assets/icons/trash.svg'
import { PlantImage } from '@/components/PlantImage/PlantImage'
import { useDialog } from '@/hooks/useDialog'
import type { Plant } from '@/interfaces/plant'
import './ActionModal.css'

interface ActionModalProps {
  plant: Plant
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export function ActionModal({ plant, onEdit, onDelete, onClose }: ActionModalProps) {
  const dialog = useDialog(onClose)

  return (
    <dialog {...dialog} className="action-modal" aria-labelledby="action-modal-title">
      <div className="action-modal-panel">
        <PlantImage imageKey={plant.imageKey} className="action-modal-image" />
        <h2 id="action-modal-title" className="action-modal-title">
          {plant.name}
        </h2>
        <p className="action-modal-subtitle">Choose an action</p>

        <button type="button" className="action-modal-option" onClick={onEdit}>
          <img src={pencilIcon} alt="" width="20" height="20" />
          Edit plant
        </button>
        <button type="button" className="action-modal-option danger" onClick={onDelete}>
          <img src={trashIcon} alt="" width="20" height="20" />
          Delete plant
        </button>
        <button type="button" className="action-modal-option cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </dialog>
  )
}
