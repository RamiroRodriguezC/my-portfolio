import styles from '../../css/StartButton.module.css'

function StartButton({ onClick }) {
  return (
    <button className={styles.startButton} onClick={onClick}>
      <span className={styles.logoWrapper}>
        <svg
          viewBox="0 0 20 16"
          className={styles.logo}
          aria-label="Windows Flag"
        >
          <path d="M2 2 L6 2 L6 14 L2 14 Z" fill="#f56342" />
          <path d="M6 2 L12 4 L12 12 L6 14 Z" fill="#28b845" />
          <path d="M12 4 L18 2 L18 14 L12 12 Z" fill="#0089f9" />
          <path d="M2 2 L12 4 L12 6 L2 4 Z" fill="#f9bc15" />
          <path d="M2 4 L12 6 L12 8 L2 6 Z" fill="#f56342" />
          <path d="M2 6 L12 8 L12 10 L2 8 Z" fill="#0089f9" />
          <path d="M2 8 L12 10 L12 12 L2 10 Z" fill="#f9bc15" />
          <path d="M2 10 L12 12 L12 14 L2 12 Z" fill="#28b845" />
        </svg>
      </span>
      <span className={styles.label}>Start</span>
    </button>
  )
}

export default StartButton