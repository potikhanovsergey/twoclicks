import {
  StackProps,
  GroupProps,
  TextInputProps,
  TextProps,
  TitleProps,
  ContainerProps,
  ImageProps,
  ThemeIconProps,
  SimpleGridProps,
  GridProps,
  ColProps,
  OverlayProps,
  BadgeProps,
  CardProps,
  AspectRatioProps,
  ActionIconProps,
  MediaQueryProps,
  ButtonProps,
  CenterProps,
  DividerProps,
  AvatarProps,
  Center,
  Stack,
  Group,
  TextInput,
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
import YoutubeFrame from "app/core/components/YoutubeFrame"
import dynamic from "next/dynamic"
import { IconBaseProps } from "react-icons"
type CanvasButtonProps = ButtonProps & React.ComponentPropsWithoutRef<"button">
export const canvasBuildingBlocks = {
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
  mediaquery: MediaQuery,
  iconbase: IconBase,
  youtubeframe: YoutubeFrame,
}
// export const canvasBuildingBlocks = {
//   "@mantine/core/center": dynamic<CenterProps>(() =>
//     import("@mantine/core/cjs/Center/Center").then((module) => module.Center)
//   ),

//   "@mantine/core/button": dynamic<CanvasButtonProps>(() =>
//     import("@mantine/core/cjs/Button/Button").then((module) => module.Button)
//   ),
//   "@mantine/core/stack": dynamic<StackProps>(() =>
//     import("@mantine/core/cjs/Stack/Stack").then((module) => module.Stack)
//   ),
//   "@mantine/core/group": dynamic<GroupProps>(() =>
//     import("@mantine/core/cjs/Group/Group").then((module) => module.Group)
//   ),
//   "@mantine/core/textinput": dynamic<TextInputProps>(() =>
//     import("@mantine/core/cjs/TextInput/TextInput").then((module) => module.TextInput)
//   ),
//   "@mantine/core/text": dynamic<TextProps>(() =>
//     import("@mantine/core/cjs/Text/Text").then((module) => module.Text)
//   ),
//   "@mantine/core/title": dynamic<TitleProps>(() =>
//     import("@mantine/core/cjs/Title/Title").then((module) => module.Title)
//   ),
//   "@mantine/core/container": dynamic<ContainerProps>(() =>
//     import("@mantine/core/cjs/Container/Container").then((module) => module.Container)
//   ),
//   "@mantine/core/image": dynamic<ImageProps>(() =>
//     import("@mantine/core/cjs/Image/Image").then((module) => module.Image)
//   ),
//   "@mantine/core/box": dynamic<ImageProps>(() =>
//     import("@mantine/core/cjs/Box/Box").then((module) => module.Box)
//   ),
//   "@mantine/core/themeicon": dynamic<ThemeIconProps>(() =>
//     import("@mantine/core/cjs/ThemeIcon/ThemeIcon").then((module) => module.ThemeIcon)
//   ),
//   "@mantine/core/simplegrid": dynamic<SimpleGridProps>(() =>
//     import("@mantine/core/cjs/SimpleGrid/SimpleGrid").then((module) => module.SimpleGrid)
//   ),
//   "@mantine/core/grid": dynamic<GridProps>(() =>
//     import("@mantine/core/cjs/Grid/Grid").then((module) => module.Grid)
//   ),
//   "@mantine/core/col": dynamic<ColProps>(() =>
//     import("@mantine/core/cjs/Grid/Col/Col").then((module) => module.Col)
//   ),
//   "@mantine/core/overlay": dynamic<OverlayProps>(() =>
//     import("@mantine/core/cjs/Overlay/Overlay").then((module) => module.Overlay)
//   ),
//   "@mantine/core/badge": dynamic<BadgeProps>(() =>
//     import("@mantine/core/cjs/Badge/Badge").then((module) => module.Badge)
//   ),
//   "@mantine/core/card": dynamic<CardProps>(() =>
//     import("@mantine/core/cjs/Card/Card").then((module) => module.Card)
//   ),
//   "@mantine/core/divider": dynamic<DividerProps>(() =>
//     import("@mantine/core/cjs/Divider/Divider").then((module) => module.Divider)
//   ),
//   "@mantine/core/avatar": dynamic<AvatarProps>(() =>
//     import("@mantine/core/cjs/Avatar/Avatar").then((module) => module.Avatar)
//   ),
//   "@mantine/core/aspectratio": dynamic<AspectRatioProps>(() =>
//     import("@mantine/core/cjs/AspectRatio/AspectRatio").then((module) => module.AspectRatio)
//   ),
//   "@mantine/core/actionicon": dynamic<ActionIconProps>(() =>
//     import("@mantine/core/cjs/ActionIcon/ActionIcon").then((module) => module.ActionIcon)
//   ),
//   mediaquery: dynamic<MediaQueryProps>(() =>
//     import("@mantine/core/cjs/MediaQuery/MediaQuery").then((module) => module.MediaQuery)
//   ),
//   iconbase: dynamic<IconBaseProps>(() => import("react-icons").then((module) => module.IconBase)),
//   youtubeframe: dynamic(() => import("app/core/components/YoutubeFrame")),
// }
