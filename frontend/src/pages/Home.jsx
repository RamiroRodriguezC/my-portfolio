import Desktop from '../components/containers/Desktop'
import TaskBar from '../components/containers/TaskBar'
import { DESKTOP_ICONS, DESKTOP_WALLPAPER } from '../config/constants'

function Home() {
  const handleOpenWindow = (icon) => {
    console.log('Abrir ventana:', icon.name)
  }

  const handleIconSelect = (iconId) => {
    console.log('Icono seleccionado:', iconId)
  }

  const handleStartClick = () => {
    console.log('Click en Inicio')
  }

  return (
    <>
      <Desktop
        icons={DESKTOP_ICONS}
        wallpaper={DESKTOP_WALLPAPER}
        onOpenWindow={handleOpenWindow}
        onIconSelect={handleIconSelect}
      />
      <TaskBar onStartClick={handleStartClick} />
    </>
  )
}

export default Home