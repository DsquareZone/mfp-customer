/*File: 
   Objective: The objective of this page is explore the lead category.
            
    
  Description: Company can easily identifying their  lead category.
                 

Initiated By: Poornima on 06nd July...
Modification History

-------------------------------------------------------------------------------------------------------------------
DATE          |   AUTHOR        |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------
12/07/22          Poornima            Api itegration                             integrating add,edit,delete functionalities

--------------------------------------------------------------------------------------------------------------------
*/
/*react import*/
import React, { useEffect, useState } from 'react'
//for redirect
import { useHistory } from "react-router-dom";
/*ag-grid import*/
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@mui/material';
/*css*/
import "./ag.css";
import data from '../../mock/rpt.json';
// import Popup from './Addpopupbm';
// import Editpopup from './Editpopupbm';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import {deleteCustomer, getAllCustomer, login,getCustomer, getAllCategory} from '../service/Customer.service';

let gridApi;


const Customer = () => {


  //columnhover
  // turns OFF row hover, it's on by default
  const suppressRowHoverHighlight = true;
  // turns ON column hover, it's off by default
  const columnHoverHighlight = true;
  const [rowData, setRowData] = useState([]);
  const [editRow, setEditData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const[customer_type, setcustomertype] = useState();
const [formData, setFormData] = useState({customer_id: "",customer_type: "",organization_name: "",industry_type: "",mobile_no: "",email: "",website: "",source: "",address: "",city: "",state: "",pincode: "",gst: "",category: "",tag: "",customer_name: "",upload_logo: "",organization_name_map: "",job_position: "",pan: ""});
const [categorys, setCategorys] = useState({})

//login user
  const loginUser = () => {

    // Make a req to login
    login("ithod@pgc.com", "edp123").then(res => { // handle success
      console.log(res.data.access_token);
      localStorage.setItem("ipss_access_token", res.data.access_token);
      invalidateCustomer();
    })
      .catch(error => {// handle error
        console.log(error);
      })
      .then(() => {// always executed
        console.log('always');
      });
  }
  //getall
const invalidateCustomer = () => {
  const customer_access_token = localStorage.getItem("ipss_access_token");

  // Make a req to get all users with current page number
  getAllCustomer(customer_access_token, currentPage)
  .then(res => { // handle success
    console.log(res);
    setRowData(res.data.results);
    setEditData(res.data.results);
    setTotalRows(res.data.total_results);
    setRowsPerPage(res.data.results_per_page);
    setCurrentPage(currentPage);
    // invalidateCat();  
  })
    .catch(error => {// handle error
      console.log(error);
    })
    .then(() => {// always executed
      console.log('always');
    });
}
// const invalidateCat = () => {

//   const customer_access_token = localStorage.getItem("ipss_access_token");
//   getAllCustomer(customer_access_token, currentPage).then(res => { // handle success
//     console.log('all data res');
//     console.log(res.data);


//     let data2 = {};

//     res.data.results.map((row) => {
//       //   console.log('rrrrrrrrrr')
//       //console.log(row)
//       data2[row.category_id] = row;
//     }
//     );
//     console.log('res2 actual');
//     console.log(data2);
//     invalidateCategory(formData, data2);
//   })

//     .catch(error => {// handle error
//       console.log(error);

//     })

//     .then(() => {// always executed

//       console.log('always');

//     });

//   } 
//   const invalidateCategory = (formData, data2) => {

//     console.log('data', formData)
//     // Make a req to get all users with current page number

//     const category_access_token = localStorage.getItem("ipss_access_token");
//     getAllCategory(category_access_token).then(res => { // handle success
//       let categoryname = {};
//       res.data.results.map((row) => {
//         console.log("ROW", row)
//         categoryname[row.category_id] = row.category;
//       }
//       );
//       setCategorys(categoryname)
//       console.log('cname1')
//     })

//       .catch(error => {// handle error
//         console.log('companyname error');
//         console.log(error);

//       })

//       .then(() => {// always executed

//         console.log('always');

//       });

//   }

  //csv export
  const onGridReady = (params) => {
    gridApi = params.api
  }
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }


//   //addPopup
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
       
//   console.log(gridApi.selectionService.getSelectedRows());
//   const selectedRows = gridApi.selectionService.getSelectedRows();
//   if (selectedRows === undefined || selectedRows.length >= 1) {
//     alert(" Please UnSelect The Field");
//     setOpen(false);
//   }
//   else{
//   setOpen(true);
//   }
  
//   };

//   const handleClose = () => {
//     setOpen(false);
//     invalidateCategory();
//   };
  //editpopup
  const [updateopen, setUpdateOpen] = React.useState(false);

 
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    invalidateCategory();
  };

   //update
  
   const handleUpdateOpen = () => {
  
    console.log(gridApi.selectionService.getSelectedRows());
    const selectedRows = gridApi.selectionService.getSelectedRows();
    if (selectedRows === undefined || selectedRows.length === 0) {
      alert("No Field Is Selected, Please Select The Field");
    }else if (selectedRows.length > 1){
      alert("More Than One Field Is Selected, Please Select One Field");
    }else { 
  
    const customer_access_token = localStorage.getItem("ipss_access_token");
  
    // Make a req to get all users with current page number
  
    getCustomer(customer_access_token, selectedRows[0].customer_id)
    .then(res => { // handle success
  
      console.log(res);
  
      setFormData({customer_id: res.data.customer_id ,customer_type : res.data.customer_type,organization_name : res.data.orgname,industry_type:res.data.industry_type,mobile_no:res.data.mobile_no,email:res.data.email,website:res.data.website,source:res.data.source,address:res.data.address,city:res.data.city,state:res.data.state,pincode:res.data.pincode,gst:res.data.gst,category:res.data.category,tag:res.data.tagname,customer_name:res.data.customer_name,organization_name:res.data.organization_name ,job_position:res.data.job_position,pan:res.data.pan });
  
      setUpdateOpen(true);

      if(res.data.customer_type === "Individual"){
        console.log('called individual')
      history.push("/Edit/Individual/" + selectedRows[0].customer_id); 
      }
      else
      { 
        console.log('organization')
     history.push("/Edit/Organization/" + selectedRows[0].customer_id);  
      }
    })  
  
      .catch(error => {// handle error
  
        console.log(error);
  
      })
  
      .then(() => {// always executed
  
        console.log('always');
  
      });
  
    }
  
  }
  
  //update
  
  const onChange = (id,value) => {
  
    //const { value, id } = e.target
  
    console.log(value, id)
  
    setFormData({ ...data, [id]: value })
  
  
  
  }
  
   //deleting a user
   const handleDelete = (id) => {
    console.log(gridApi.selectionService.getSelectedRows());
    const selectedRows = gridApi.selectionService.getSelectedRows();
    if (selectedRows === undefined || selectedRows.length === 0) {
      alert("No Field Is Selected, Please Select The Field");
    }else {
    const confirm = window.confirm(
      "Are you sure, you want to Delete",
      id
    );
    if (confirm) {
      console.log(gridApi.selectionService.getSelectedRows());
      const selectedRows = gridApi.selectionService.getSelectedRows();
      if (selectedRows === undefined || selectedRows.length === 0) {
        return;
      }

      const customer_access_token = localStorage.getItem("ipss_access_token");
      let numberOfDeletes = 0;
      selectedRows.forEach((row) => {
        const customer_id = row.customer_id;
        deleteCustomer(customer_access_token, customer_id)
          .then((res) => {
            // handle success

            console.log(res);
            numberOfDeletes++;
            if (numberOfDeletes === selectedRows.length) {
              invalidateCustomer();
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
          .then(() => {
            // always executed
            console.log("always");
          });
      });
    }
  }
  };
    //Api integeration

useEffect(() => {

  const isDevEnv = window.location.href.includes('3004') ? true : false;
  if (isDevEnv) {
    loginUser();
  }
  else {
    invalidateCustomer();
    //invalidateCategory(formData, data2);
  }
  // invalidateUsers();
  var element = document.querySelectorAll('style[data-meta="MuiButtonBase"]');
  console.log(element.length);
  if (element) {
    if (element.length > 1) {
      element[0].parentNode.removeChild(element[1]);
    }
  }


}, []
);
// //add and update  
// const invalidateRpt = () => {
//     const user_access_token = localStorage.getItem("ipss_access_token");
//     setRowData(data.results);
//   }
//   //Api integeration

//   useEffect(() => {

//     invalidateRpt();


//   }, []
//   );
  //for redirect
  const history = useHistory();

  /*return function start*/
  return (
    <div className="ag-theme-alpine" style={{ height: "90vh", margin: "5vh" }}>
      
      
      <AppBar position="static" className="appbar29"style={{ width: "100%"}} >
       <Toolbar >
       <Box display='flex' flexGrow={1}>
      <h1 className='band1'> Customers </h1>
        </Box>
          <div className='tooltip'><Button variant="text" onClick={() => history.push("/components/Individual")}><AddBoxRoundedIcon  className='band1'></AddBoxRoundedIcon></Button>
          <span className='tooltiptext'>Add</span></div>
          <div className='tooltip'><Button variant="text" onClick={handleUpdateOpen}
          // onClick={() => history.push("/components/Individual")}
            ><EditRoundedIcon className='band1'></EditRoundedIcon></Button>
          <span className='tooltiptext'>Edit</span></div>
          <div className='tooltip'><Button variant="text" onClick={handleDelete}  ><DeleteRoundedIcon className='band1'></DeleteRoundedIcon></Button>
          <span className='tooltiptext'>Delete</span></div>
          {/* <div className='tooltip'><Button variant="text"><IosShareRoundedIcon className='band1'></IosShareRoundedIcon></Button>
          <span className='tooltiptext'>Upload</span> </div> */}
          <div className='tooltip'><Button variant="text" onClick={() => onExportClick()}><DownloadRoundedIcon className='band1'></DownloadRoundedIcon></Button>
          <span className='tooltiptext'>Download</span></div>
       </Toolbar>
    </AppBar>

      
      <br></br>

      <div style={{ width: "100%", height: "100%" }} >

        < AgGridReact style={{
          boxSizing: "border-box",
          height: "100%",
          width: "100%",
          textAlign: 'center'
        }}
          pagination={true}
          rowSelection="multiple"
          paginationPageSize={20}
          rowData={rowData}      
            rowMultiSelectWithClick={true}
          defaultColDef={{ sortable: true, resizable: true, editable: false, filter: true, floatingFilter: true, resizabl: true, enableBrowserTooltips: true }}
          onGridReady={onGridReady}
          columnHoverHighlight={columnHoverHighlight}
        >
          {/* <AgGridColumn field="id" headerName="ID" tooltipField="ID" checkboxSelection={true} headerCheckboxSelection={true} headerCheckboxSelectionFilteredOnly={true}></AgGridColumn> */}
          <AgGridColumn field="customer_name" headerName="Customer Name" tooltipField="Customer Name" checkboxSelection={true} headerCheckboxSelection={true} headerCheckboxSelectionFilteredOnly={true} ></AgGridColumn>
          <AgGridColumn field="organization_name"onChange={onChange} headerName="Organization Name" tooltipField="Organization Name"  ></AgGridColumn>
          <AgGridColumn field="customer_type" headerName="Customer Type" tooltipField="Customer Type"  ></AgGridColumn>
          <AgGridColumn field="city" headerName="City" tooltipField="City"  ></AgGridColumn>
          <AgGridColumn field="mobile_no" headerName="Mobile Number" tooltipField="Mobile Number"  ></AgGridColumn>
          <AgGridColumn field="category"  headerName="Category" tooltipField="Category"  ></AgGridColumn>
          <AgGridColumn field="email" headerName="Email ID" tooltipField="Email ID"  ></AgGridColumn>

      </AgGridReact>
      </div>
      {/* <Popup open={open} handleClose={handleClose} />
      <Editpopup open={updateopen} handleClose={handleUpdateClose} data={formData} onChange={onChange} /> */}
    </div>
  )
  /*return function end*/
}
export default Customer;