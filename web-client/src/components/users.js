import "../styles/users.css";
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import fetchdata from "../apicalls/fetchdata";
import deleteData from "../apicalls/deletedata";
import addData from "../apicalls/adddata";
import updateData from "../apicalls/updatedata";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

var columns = [
  { title: "id", field: "id", hidden: true, align: "center" },
  { title: "Name", field: "name", align: "center" },
  { title: "Balance (₹)", field: "balance", type: "numeric", align: "center" },
  { title: "Email", field: "email_id", align: "center" },
];

const validateEmail = (email) => {
  const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

toast.configure();

const Users = () => {
  const [data, setData] = useState([]);

  const handleRowDelete = async (selectedRow, resolve) => {
    let deleteRow = JSON.parse(JSON.stringify(selectedRow));
    let result = await deleteData(deleteRow);
    if (result) {
      console.log(selectedRow);
      const index = selectedRow.tableData.id;
      const updatedRows = [...data];
      updatedRows.splice(index, 1);

      setTimeout(() => {
        setData(updatedRows);
        resolve();
      }, 500);
    }
    else
    {
        toast.error("Server error, try again later");
        resolve();
    }
  };

  const handleRowUpdate = async (updatedRow, oldRow, resolve) => {
    let isError = false;
    if (!updatedRow.name || !updatedRow.email_id  || !updatedRow.balance ) {
      toast.error("Enter all details");
      isError = true;
    }

    else if (!validateEmail(updatedRow.email_id)) {
      toast.error("Check your email-id");
      isError = true;

    }
    else if (isNaN(updatedRow.balance)) {
      toast.error("Enter a valid number");
      isError = true;

    }

    let _updateRow = JSON.parse(JSON.stringify(updatedRow));
    if(!isError)
    {
        let result = await updateData(_updateRow);
        if (result) {
            const index = oldRow.tableData.id;
            const updatedRows = [...data];
            updatedRows[index] = updatedRow;
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 500);
          }
          else
          {
              toast.error("Server error, try again later");
              resolve();
          }
    }
    else
        resolve();
  };

  const handleRowAdd = async (newRow, resolve) => {

    let isError = false;
    console.log(newRow)
    if (!newRow.name || !newRow.email_id || !newRow.balance ) {
      toast.error("Enter all details");
      isError = true;
    }

    else if (!validateEmail(newRow.email_id)) {
      toast.error("Check your email-id");
      isError = true;

    }
    else if (isNaN(newRow.balance)) {
      toast.error("Enter a valid number");
      isError = true;

    }
    let user = { person_id: Math.floor(Math.random() * 100), ...newRow };
    let addRow = JSON.parse(JSON.stringify(user));
    if(!isError)
    {
        let result = await addData(addRow);
        if (result) {
            const updatedRows = [...data, user];
            console.log(updatedRows);
            setTimeout(() => {
                setData(updatedRows);
                resolve();
            }, 500);
        }
        else
        {
            toast.error("Server error, try again later");
            resolve();
        }
    }   
    else
    {
      resolve();
    }
  }
  
  useEffect(() => {
    async function fetch() {
      let users = await fetchdata();
      setData(users);
    }
    fetch();
  }, []);

  return (
    <MaterialTable
      title="User list from API"
      columns={columns}
      data={data}
      icons={tableIcons}
      editable={{
        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            handleRowDelete(selectedRow, resolve);
          }),
        onRowUpdate: (updatedRow, oldRow) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(updatedRow, oldRow, resolve);
          }),
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            handleRowAdd(newData, resolve);
          }),
      }}
      options={{
        rowStyle: {
          fontSize: 14,
        },
      }}
    />
  );
};

export default Users;
