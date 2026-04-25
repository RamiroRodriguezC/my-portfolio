import styles from '../../css/StartButton.module.css'

function StartButton({ onClick }) {
  return (
    <button className={styles.startButton} onClick={onClick}>
      <span className={styles.logoWrapper}>
        <img
          src="/icons/winIcon.png"
          alt="Windows"
          className={styles.logo}
        />
      </span>
      <span className={styles.label}>Start</span>
    </button>
  )
}

export default StartButton