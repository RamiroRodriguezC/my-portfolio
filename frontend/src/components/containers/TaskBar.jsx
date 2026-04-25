import { useState, useEffect } from 'react'
import styles from '../../css/TaskBar.module.css'
import StartButton from './StartButton'

function TaskBar({ onStartClick }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={styles.taskbar}>
      <StartButton onClick={onStartClick} />

      <div className={styles.tray}>
        <div className={styles.clock}>
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}

export default TaskBar