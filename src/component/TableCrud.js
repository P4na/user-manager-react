import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import pgAxios from "../api/pgAxios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserListContext } from "../pages/Dashboard";

export const TableCrud = () => {
  const { userList, setUserList } = useContext(UserListContext);
  const GET_ALL = "/all";

  const handleDelete = async (id) => {
    try {
      await pgAxios
        .delete(`${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => pgAxios.get(GET_ALL).then((res) => setUserList(res.data)));
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const userColumns = [
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "dataNascita",
      headerName: "Data di nascita",
      width: 150,
    },
  ];

  const rows = userList.map((row) => ({
    id: row.id,
    username: row.username,
    email: row.email,
    dataNascita: row.dataNascita,
  }));

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      with: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{ display: "flex" }}>
            <IconButton variant="outlined" size="small" className="viewButton">
              <EditIcon className="icon" />
            </IconButton>
            <div className="deleteButton">
              <IconButton
                variant="outlined"
                size="small"
                color="danger"
                className="viewButton"
                onClick={(e) => {
                  handleDelete(params.id);
                }}
              >
                <DeleteIcon />
              </IconButton>

              {/* <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="ModaleDelCazzo">
                  <Typography
                    id="modal-modal-title centrati"
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    Sei sicuro? Anche i dati correlati saranno eliminati
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      console.log(e);
                      handleDelete(e);
                    }}
                  >
                    Cancella
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginLeft: 5 }}
                    onClick={() => setOpen(false)}
                  >
                    Annulla
                  </Button>
                </Box>
              </Modal> */}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        sx={{ height: 700 }}
        rows={rows}
        columns={userColumns.concat(viewColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </>
  );
};
