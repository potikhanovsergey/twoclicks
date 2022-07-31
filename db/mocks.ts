import { BuildingBlock } from "@prisma/client"
import { IBuildingBlockMock, ICanvasBlock } from "types"
import shortid from "shortid"

export const pushBlock: IBuildingBlockMock = {
  type: "@mantine/core/textInput",
  editType: "element",
  filterType: "form",
  props: {
    placeholder: "afsldafkls",
    label: "fsds",
    required: true,
  },
}

export const ButtonsList: IBuildingBlockMock[] = [
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "filled",
      color: "blue",
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "light",
      color: "blue",
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "outline",
      color: "blue",
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "default",
      color: "blue",
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "subtle",
      color: "blue",
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "lime", deg: 105 },
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "blue", deg: 60 },
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "orange", to: "red" },
    },
  },
  {
    type: "@mantine/core/button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
    },
  },
]

export const PortfolioStarterMock = {
  name: "My brand new portfolio",
  data: [],
}

export const PortfolioMock = {
  name: "First portfolio in Prisma",
  data: [
    {
      id: shortid.generate(),
      type: "@mantine/core/button",
      editType: "element",
      filterType: "button",
      props: {
        children: ["Button Text"],
      },
    },
    {
      id: shortid.generate(),
      type: "@mantine/core/stack",
      editType: "grid",
      filterType: "grid",
      props: {
        children: [
          {
            id: shortid.generate(),
            type: "@mantine/core/group",
            editType: "grid",
            filterType: "grid",
            props: {
              direction: "column",
              children: [
                {
                  id: shortid.generate(),
                  type: "@mantine/core/button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "blue",
                    size: "xl",
                    children: ["very deep button"],
                  },
                },
                {
                  id: shortid.generate(),
                  type: "@mantine/core/button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "green",
                    children: ["very deep button 1"],
                  },
                },
                {
                  id: shortid.generate(),
                  type: "@mantine/core/button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "orange",
                    children: ["very deep button 1"],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
