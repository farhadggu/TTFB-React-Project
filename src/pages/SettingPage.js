import { useTheme } from "@emotion/react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ModalForm from "../components/ModalForm";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";
import "./SettingPage.css";

const editStates = {
  title: "",
  urls: "",
  logo: "",
  loop_time: "",
  ttfb: [],
};

function SettingPage({ items, setItems }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Modal States
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //handle editing section
  const [editState, setEditState] = useState(editStates);
  const handleEdit = (id, title, urls, logo, loop_time) => {
    setIsEdit(true);
    setEditID(id);
    setEditState({
      title: title,
      urls: urls,
      logo: logo,
      loop_time: loop_time,
    });
  };

  return (
    <Box mt={5}>
      <Button
        sx={{ marginLeft: "30px" }}
        onClick={() => {
          handleOpen();
          setIsEdit(false);
        }}
        variant="contained"
      >
        + Add Website
      </Button>
      <Box mt={10}>
        <Grid container padding="0 30px" columnGap={5} rowGap={5}>
          {items.map((item, index) => {
            const { title, urls, logo, loop_time, id } = item;
            return (
              <Grid
                className="card-setting"
                item
                md={3.8}
                bgcolor={colors.card[500]}
                key={index}
              >

                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <h2>{title}</h2>
                    <h3>URL : {urls}</h3>
                    <h3>Hit Request Per {loop_time} MS</h3>
                  </Box>
                  <Box>
                    <img src={logo} alt="logo" width={100} />
                  </Box>
                </Box>

                <Button
                  sx={{ marginTop: "20px" }}
                  onClick={() => {
                    handleEdit(id, title, urls, logo, loop_time);
                    handleOpen();
                  }}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>

              </Grid>
            );
          })}
        </Grid>
      </Box>
      <ModalForm
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editID={editID}
        setEditID={setEditID}
        editState={editState}
        setEditState={setEditState}
        items={items}
        setItems={setItems}
      />
    </Box>
  );
}

export default SettingPage;
