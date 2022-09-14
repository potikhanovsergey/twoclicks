import { Player } from "@lottiefiles/react-lottie-player"
import twodots from "lotties/twodotsloader.json"

interface IMainLoader {
  size?: number
}

const MainLoader = ({ size = 300 }: IMainLoader) => (
  <Player autoplay loop src={twodots} style={{ height: `${size}px`, width: `${size}px` }} />
)

export default MainLoader