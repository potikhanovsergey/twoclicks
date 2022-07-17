import { Player } from "@lottiefiles/react-lottie-player"
import loader from "../../../lotties/cube-loader-one-pink.json"

interface ICubeLoader {
  size?: number
}

const CubeLoader = ({ size = 300 }: ICubeLoader) => (
  <Player autoplay loop src={loader} style={{ height: `${size}px`, width: `${size}px` }} />
)

export default CubeLoader
