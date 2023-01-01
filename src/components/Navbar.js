import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@emotion/react';
import { ColorModeContext, tokens } from '../theme';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <AppBar position="static" sx={{background: colors.card[500]}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
        >
          <DiamondIcon color={colors.text} />
        </IconButton>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <Link to='/'>
          <Typography color={colors.text} variant="h6" component="div" sx={{ flexGrow: 1, ml: '30px' }}>
            Home
          </Typography>
        </Link>
        <Link reloadDocument to='/settings'>
          <Typography color={colors.text} variant="h6" component="div" sx={{ flexGrow: 1, ml: '30px' }}>
            Settings
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
