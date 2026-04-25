import { useState } from 'react'
import styles from '../../css/Desktop.module.css'
import Icon from '../Icon'

function Desktop({ icons, wallpaper, onOpenWindow, onIconSelect }) {
  const [selectedIconId, setSelectedIconId] = useState(null)

  const handleBackgroundClick = () => {
    setSelectedIconId(null)
    if (onIconSelect) onIconSelect(null)
  }

  const handleIconClick = (id) => {
    setSelectedIconId(id)
    if (onIconSelect) onIconSelect(id)
  }

  return (
    <div
      className={styles.desktop}
      style={{ background: wallpaper }}
      onClick={handleBackgroundClick}
    >
      <div className={styles.iconGrid}>
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={styles.iconSlot}
            style={{ gridRow: icon.row, gridColumn: icon.col }}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              logoSrc={icon.logoSrc}
              name={icon.name}
              isSelected={selectedIconId === icon.id}
              onDoubleClick={() => onOpenWindow && onOpenWindow(icon)}
              onClick={() => handleIconClick(icon.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Desktop