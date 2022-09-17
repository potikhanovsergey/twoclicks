import { Player } from "@lottiefiles/react-lottie-player"
import twodots from "lotties/twodotsloader.json"
import { memo, useMemo } from "react"

interface IMainLoader {
  size?: number
}

const MainLoader = ({ size = 300 }: IMainLoader) => {
  const memoizedStyle = useMemo(() => {
    return {
      height: `${size}px`,
      width: `${size}px`,
    }
  }, [size])
  return <Player autoplay loop src={twodots} style={memoizedStyle} />
}

export default memo(MainLoader)
