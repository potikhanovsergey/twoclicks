import { Grid, Select, Button, useMantineTheme } from "@mantine/core"
import ButtonGroup from "app/core/components/base/ButtonGroup"

const PagesHeader = () => {
  const theme = useMantineTheme()
  return (
    <Grid my="lg" sx={{ justifyContent: "space-between" }}>
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
        <Button size="xs" sx={{ alignSelf: "flex-right" }} color="dark">
          Filters
        </Button>
      </Grid.Col>
    </Grid>
  )
}

export default PagesHeader
