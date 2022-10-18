import { Grid, Select, Button, useMantineTheme, Box, Group, TextInput } from "@mantine/core"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import ButtonGroup from "app/core/components/base/ButtonGroup"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { FeedStore } from "store/feed"

const PagesHeader = () => {
  const theme = useMantineTheme()

  const [filtersOpened, setFiltersOpened] = useState(false)
  return (
    <Box>
      <Grid my="lg" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Grid.Col span={2}>
          <Select
            value={"All"}
            data={[
              { value: "All", label: "All" },
              { value: "Following", label: "Following" },
              { value: "Popular", label: "Popular" },
              { value: "New & Noteworthy", label: "New & Noteworthy" },
            ]}
          />
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
              {
                type: "button",
                children: "All",
                active: true,
              },
              {
                type: "button",
                children: "Landings",
              },
              {
                type: "button",
                children: "Portfolios",
              },
              {
                type: "button",
                children: "Templates",
              },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TextInput
            placeholder="Search page..."
            size="sm"
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
    </Box>
  )
}

export default observer(PagesHeader)
