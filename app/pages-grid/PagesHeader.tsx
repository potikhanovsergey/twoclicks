import { Grid, Select, Button, useMantineTheme, Box, Group, TextInput } from "@mantine/core"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import ButtonGroup from "app/core/components/base/ButtonGroup"
import { observer } from "mobx-react-lite"
import { useCallback, useMemo, useState } from "react"
import { FeedStore } from "store/feed"

const PagesHeader = () => {
  const theme = useMantineTheme()
  const { feedType, sortType } = FeedStore

  const sortTypes = useMemo(() => {
    return [
      { value: "Popular", label: "Popular" },
      { value: "Latest", label: "Latest" },
      { value: "Following", label: "Following" },
    ]
  }, [])
  const onChangeSortType = useCallback((v) => {
    if (v) {
      FeedStore.sortType = v
    }
  }, [])
  return (
    <Grid
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
      }}
    >
      <Grid.Col span={2}>
        <Select value={sortType} data={sortTypes} onChange={onChangeSortType} />
      </Grid.Col>
      <Grid.Col span={8}>
        <ButtonGroup
          wrapperProps={{
            sx: {
              justifyContent: "center",
              width: "fit-content",
              margin: "0 auto",
            },
          }}
          buttons={[
            { label: "All", value: "All" },
            { label: "Portfolios", value: "Portfolio" },
            { label: "Projects", value: "Project" },
            { label: "Templates", value: "Template" },
          ].map((b) => ({
            type: "button",
            children: b.label,
            active: feedType === b.value,
            onClick: () => {
              FeedStore.feedType = b.value
            },
          }))}
        />
      </Grid.Col>
      <Grid.Col span={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TextInput
          placeholder="Search pages..."
          size="sm"
          aria-label="Search pages"
          value={FeedStore.searchValue}
          onChange={(e) => (FeedStore.searchValue = e.currentTarget.value)}
          rightSection={
            <FaSearch
              color={theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]}
            />
          }
        />
      </Grid.Col>
    </Grid>
  )
}

export default observer(PagesHeader)
