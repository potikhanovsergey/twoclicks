import { useTranslation } from "next-i18next"
import { Stack, Button } from "@mantine/core"
import React, { Suspense, useContext, useState } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { recursiveTagName } from "helpers"

const BuilderBlocks = () => {
  const [data] = useState({
    blocks: [
      {
        id: "3123dasab",
        component: "tabs",
        isSingleClosing: false,
        editType: "section",
        props: {
          children: [
            {
              id: "321fsdc",
              component: "tab",
              isSingleClosing: false,
              props: {
                label: "Tab 1",
                children: ["Tab 1 content"],
              },
            },
            {
              id: "321fsdac",
              component: "tab",
              isSingleClosing: false,
              props: {
                label: "Tab 2",
                children: ["Tab 2 content"],
              },
            },
            {
              id: "321fsf21dc",
              component: "tab",
              isSingleClosing: false,
              props: {
                label: "Tab 3",
                children: ["Tab 3 content"],
              },
            },
          ],
        },
      },
      {
        id: "3213213122",
        component: "button",
        isSingleClosing: false,
        editType: "element",
        props: {
          children: ["Button Text"],
        },
      },
      {
        id: "3213312",
        component: "stack",
        isSingleClosing: false,
        props: {
          children: [
            {
              id: "321543213213",
              component: "group",
              isSingleClosing: false,
              props: {
                children: [
                  {
                    id: "213122321",
                    component: "button",
                    isSingleClosing: false,
                    editType: "element",
                    props: {
                      color: "blue",
                      size: "xl",
                      children: ["very deep button"],
                    },
                  },
                  {
                    id: "21312320",
                    component: "button",
                    isSingleClosing: false,
                    editType: "element",
                    props: {
                      color: "green",
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
  })
  return (
    <Suspense fallback="Loading...">
      {data.blocks.length > 0 &&
        data.blocks.map((b, i) => {
          const TagName = recursiveTagName(b, true)
          if (TagName) {
            return TagName
          }
          return <React.Fragment key={i} />
        })}
    </Suspense>
  )
}

const Builder = () => {
  // const { t } = useTranslation('pagesBuild');
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  // const { push } = CanvasStore;
  return (
    <Stack>
      <h1>Builder</h1>
      <BuilderBlocks />
      <Button
        onClick={() =>
          setModalContext((prevValue: IModalContextValue) => ({
            ...prevValue,
            canvasComponentsModal: true,
          }))
        }
      >
        Add component
      </Button>
      <Button
        color="red"
        onClick={() =>
          setModalContext((prevValue: IModalContextValue) => ({
            ...prevValue,
            canvasSectionsModal: true,
          }))
        }
      >
        Add section
      </Button>
      <Button
        onClick={
          () => 1
          // CanvasStore.changeProp({
          //   id: "21312320",
          //   newProps: {
          //     color: "red",
          //     size: "xl",
          //   },
          // })
        }
      >
        Change prop
      </Button>
    </Stack>
  )
}

export default Builder
