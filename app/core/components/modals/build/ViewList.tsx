import { forwardRef, useEffect, useRef, useState } from "react"
// import { observer } from 'mobx-react-lite';
import { Loader, SimpleGrid, Center, ScrollArea, LoadingOverlay } from "@mantine/core"
import shortid from "shortid"
import { ICanvasBlock } from "types"
// import { useGetBuildingBlocks } from '@/hooks/data/useBuildingBlocks';
import ViewListItem from "./ViewListItem"

interface IViewList {
  blocks: ICanvasBlock[]
}

const ObserverList = forwardRef(({ blocks }: IViewList, ref) => (
  <>
    {blocks.map((block, i) => (
      <ViewListItem
        block={block}
        key={shortid.generate()}
        ref={i === blocks.length - 1 ? ref : null}
      />
    ))}
  </>
))

const ViewList = ({ type }: IViewList) => {
  const {
    data: buildingBlocks,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetBuildingBlocks({
    limit: 15,
  })

  const [viewListBlocks, setViewListBlocks] = useState<ICanvasBlock[]>([])

  useEffect(() => {
    if (buildingBlocks) {
      const blocks = []
      for (let i = 0; i < buildingBlocks.pages.length; i += 1) {
        for (let j = 0; j < buildingBlocks.pages[i].results.length; j += 1) {
          blocks.push(buildingBlocks.pages[i].results[j])
        }
      }
      setViewListBlocks(blocks)
    }
  }, [buildingBlocks])

  // ### SCROLL OBSERVER STARTS ###
  const viewport = useRef<HTMLDivElement>(null)
  const [lastElement, setLastElement] = useState(null)
  const viewportObserver = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first?.isIntersecting) {
        console.log(hasNextPage)
        fetchNextPage()
      }
    })
  )

  useEffect(() => {
    const currentElement = lastElement
    const currentObserver = viewportObserver.current
    if (currentElement) {
      currentObserver.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [lastElement])

  // ### SCROLL OBSERVER ENDS ###
  return (
    <>
      {isLoading ? (
        <Center style={{ height: "100%" }}>
          <Loader size="sm" />
        </Center>
      ) : (
        <ScrollArea style={{ height: "100%", position: "relative" }} viewportRef={viewport}>
          <LoadingOverlay visible={isFetchingNextPage} />
          <SimpleGrid cols={4} style={{ padding: "20px" }}>
            <ObserverList blocks={viewListBlocks} ref={setLastElement} />
          </SimpleGrid>
        </ScrollArea>
      )}
    </>
  )
}

export default ViewList
