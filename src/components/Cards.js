import { Box, Grid } from "@mui/material"
import CardItem from "./CardItem"

function Cards({items}) {
  return (
    <>
      <Box>
        <Grid padding='0 10px' container display='flex' justifyContent='center' alignItems='center' spacing={1}>
          {items.map((data, index) => {
            return (
              <Grid xs={6} md={4} item key={index}>
                <CardItem {...data} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
    
  )
}

export default Cards
