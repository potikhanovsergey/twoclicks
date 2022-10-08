import {
  Center,
  Stack,
  Group,
  Text,
  Title,
  Container,
  Box,
  ThemeIcon,
  SimpleGrid,
  Grid,
  Overlay,
  Badge,
  Card,
  Divider,
  Avatar,
  AspectRatio,
  ActionIcon,
  Image,
  MediaQuery,
  Button,
} from "@mantine/core"
import { IconBase } from "@react-icons/all-files"
import ColorCircle from "app/build/sections/components/ColorCircle"
import SimpleHeader from "app/build/sections/headers/SimpleHeader"
import YoutubeFrame from "app/core/components/YoutubeFrame"
import { Carousel } from "@mantine/carousel"
import SlideImage from "app/build/sections/carousels/SlideImage"

export const canvasBuildingBlocks = {
  "@twoclicks/simpleheader": SimpleHeader,
  "@twoclicks/colorcircle": ColorCircle,
  "@mantine/core/center": Center,
  "@mantine/core/button": Button,
  "@mantine/core/stack": Stack,
  "@mantine/core/group": Group,
  "@mantine/core/text": Text,
  "@mantine/core/title": Title,
  "@mantine/core/container": Container,
  "@mantine/core/image": Image,
  "@mantine/core/box": Box,
  "@mantine/core/themeicon": ThemeIcon,
  "@mantine/core/simplegrid": SimpleGrid,
  "@mantine/core/grid": Grid,
  "@mantine/core/col": Grid.Col,
  "@mantine/core/overlay": Overlay,
  "@mantine/core/badge": Badge,
  "@mantine/core/card": Card,
  "@mantine/core/divider": Divider,
  "@mantine/core/avatar": Avatar,
  "@mantine/core/aspectratio": AspectRatio,
  "@mantine/core/actionicon": ActionIcon,
  "@mantine/carousel/carousel": Carousel,
  "@mantine/carousel/carouselslide": Carousel.Slide,
  slideimage: SlideImage,
  mediaquery: MediaQuery,
  iconbase: IconBase,
  youtubeframe: YoutubeFrame,
}
