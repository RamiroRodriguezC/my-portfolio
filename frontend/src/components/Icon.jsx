import styles from '../css/Icon.module.css'

function Icon({ logoSrc, name, onDoubleClick, onClick, isSelected }) {
  return (
    <div
      className={`${styles.iconContainer} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img src={logoSrc} alt={name} className={styles.iconImage} />
      <span className={styles.iconName}>{name}</span>
    </div>
  )
}

export default Icon