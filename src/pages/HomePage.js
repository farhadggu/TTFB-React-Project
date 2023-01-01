import { Box } from "@mui/system"
import Cards from "../components/Cards"

function HomePage({items}) {
  return (
    <Box mt={2}>
      <Cards items={items} />
    </Box>
  )
}

export default HomePage
