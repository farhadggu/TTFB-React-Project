import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const initialState = {
  title: "",
  urls: "",
  logo: "",
  ttfb: [],
  loop_time: "",
};

const ModalForm = ({
  open, 
  handleClose,
  editState,
  isEdit,
  editID,
  setEditState,
  setItems,
  items,
  setIsEdit,
  setEditID
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(initialState);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(isEdit) {
      setEditState({...editState, [name]: value})
    }
    setData({ ...data, [name]: value });
  };
  
  const submitHandler = (e) => {
    e.preventDefault();

    if(isEdit) {
      setItems(items.map((item) => {
        if(item.id === editID) {
          return {
            ...item, 
            title: editState.title,
            urls: editState.urls,
            logo: editState.logo,
            loop_time: editState.loop_time,
            ttfb: []
          }
        }
        setIsEdit(false)
        setEditID(null)
        setData({})
        return item
      }))
      setData({})
      handleClose()
      window.location.reload()
      return
    }

    setItems([...items, {
      id: new Date().getTime().toString(),
      title: data.title,
      urls: data.urls,
      logo: data.logo,
      loop_time: data.loop_time,
      ttfb: []
    }])
    setData({})
    handleClose()
    window.location.reload()
    return
  };

  const deleteHandler = (id) => {
    setItems(items.filter((item) => item.id !== id))
    window.location.reload()
    handleClose()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 700,
    bgcolor: colors.card[500],
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  if(isEdit) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          component="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            name="title"
            sx={{ width: "800px", marginBottom: "30px" }}
            value={editState.title}
            onChange={changeHandler}
            label="Title"
            variant="outlined"
          />
          <TextField
            name="urls"
            sx={{ width: "800px", marginBottom: "30px" }}
            value={editState.urls}
            onChange={changeHandler}
            label="Url Request"
            variant="outlined"
          />
          <TextField
            name="logo"
            sx={{ width: "800px", marginBottom: "30px" }}
            value={editState.logo}
            onChange={changeHandler}
            label="Logo Url"
            variant="outlined"
          />
          <TextField
            name="loop_time"
            sx={{ width: "800px", marginBottom: "30px" }}
            value={editState.loop_time}
            onChange={changeHandler}
            label="Loop Time For Each Request"
            variant="outlined"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Button 
              variant="contained" 
              startIcon={<EditIcon />}
              color='success'
              type="submit"
              sx={{marginRight: '20px'}}
            >
              Edit
            </Button>
            <Button 
              variant="contained" 
              startIcon={<DeleteIcon />} 
              color='error' 
              type="button"
              onClick={() => deleteHandler(editID)}
            >
              Delete
            </Button>

          </Box>
        </Box>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}
        component="form"
        onSubmit={submitHandler}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          name="title"
          sx={{ width: "800px", marginBottom: "30px" }}
          value={data.title}
          onChange={changeHandler}
          label="Title"
          variant="outlined"
        />
        <TextField
          name="urls"
          sx={{ width: "800px", marginBottom: "30px" }}
          value={data.urls}
          onChange={changeHandler}
          label="Url Request"
          variant="outlined"
        />
        <TextField
          name="logo"
          sx={{ width: "800px", marginBottom: "30px" }}
          value={data.logo}
          onChange={changeHandler}
          label="Logo Url"
          variant="outlined"
        />
        <TextField
          name="loop_time"
          sx={{ width: "800px", marginBottom: "30px" }}
          value={data.loop_time}
          onChange={changeHandler}
          label="Loop Time For Each Request (TYPE MILI SECONDS: 1000MS)"
          variant="outlined"
        />
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </Modal>
  )
}

export default ModalForm
