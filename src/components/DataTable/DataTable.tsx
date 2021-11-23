import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "../Loading/Loading";
import "../../scss/DataTable/DataTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const columns: GridColDef[] = [
  { field: "userId", headerName: "User Id", width: 100 },
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "completed", headerName: "Completed", width: 100 }
];

export default function DataTable () {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [rowsSelected, setRowsSelected] = useState([]);
  const tableData: any = useSelector((state) => state);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (res: any) {
        console.log("component updated");
        dispatch({ type: "SET_DATA", payload: res.data });
        setLoading(false);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  }, [dispatch]);

  function handleDelete (): any {
    const rowsSelectedSet: any = new Set(rowsSelected);
    const newArr = tableData.filter((value: any) => {
      return !rowsSelectedSet.has(value.id);
    });
    dispatch({ type: "SET_DATA", payload: newArr });
  }

  const handleSelectedRows: any = (rows: any) => {
    setRowsSelected(rows);
  };
  return (
    <div className="data-table-box">
      {loading ? (
        <Loading />
      ) : (
        <>
          {isEmpty(tableData) ? (
            ""
          ) : (
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(rows) => {
              handleSelectedRows(rows);
            }}
          />
        </>
      )}
    </div>
  );
}
