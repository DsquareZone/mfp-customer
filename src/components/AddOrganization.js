/*File: 
   Objective: 
            
    
  Description: 
                 

Initiated By: Gobi Krishna N on 11th July 2022...

Modification History

-------------------------------------------------------------------------------------------------------------------
DATE          |   AUTHOR        |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------


--------------------------------------------------------------------------------------------------------------------
*/
//react import
import React, { useEffect, useState } from 'react'
//for redirect
import { useHistory } from "react-router-dom";
//css
import "./ag.css";
//mock data
import data from '../../mock/rpt.json';
// material ui
import { Button } from '@mui/material';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import PublishIcon from '@material-ui/icons/Publish';
import { Paper,Select, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {addNewOrganization,getAllCategory,getAllSource,getAllTag,login} from '../service/Customer.service';
import Chip from '@mui/material/Chip';

//alert message
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/lab/Alert';
//validation
import { Formik , useFormik } from 'formik';
import * as yup from 'yup';
// import "yup-mobile_no";
import {configcustomerSchema } from '@ipss/utils/lib/validators/organisationcustomer'; //importing the validation respective library must for validation library
let gridApi;


const Organization = () => {


    const[customer_type,setcustomertype] = useState("");
    const[organization_name,setorgname] = useState("");
    const [org_nameerror, setorgnameerror] = useState("");
    const[industry_type,setindustrytype] = useState("");
    const[mobile_no,setmobileno] = useState("");
    const [mobilenovaidate, setMobnoCheck] = useState(false);
    const[website,setwebsite] = useState("");
    const [websitevaidate, setWebsiteCheck] = useState(false);
    const[email,setemail] = useState("");
    const [emailvaidate, setEmailCheck] = useState(false);
    const[address,setaddress] = useState("");
    const[city,setcity] = useState("");
    const[state,setstate] = useState("");
    const[pincode,setpincode] = useState("");
    const[gst,setgst] = useState("");
    const[category,setcategory] = useState([]);
    const[selectedCategoryID,setSelectedCategoryID] = useState("");
    const[source,setsource] = useState([]);
    const[selectedSourceID,setSelectedSourceID] = useState("");
    const [tag, settag] = useState([]);
  const [tagname, settagname] = useState();
    const[submitting,setSubmitting]=useState(true);
    const[checked,setchecked] = useState("");
    
    const handleCategoryChange = (event) => {
      setSelectedCategoryID(event.target.value)
    }
    const handleSourceChange = (event) => {
      setSelectedSourceID(event.target.value)
    }
    const handleTagChange = (event) => {
      setSelectedTagID(event.target.value)
    }
  
   // const defaultCustomer = ("Organization")
    //login
    const loginUser = () => {
    
      // Make a req to login
      login("ithod@pgc.com", "edp123").then(res => { // handle success
        console.log(res.data.access_token);
        localStorage.setItem("ipss_access_token", res.data.access_token);
      })
        .catch(error => {// handle error
          console.log(error);
        })
        .then(() => {// always executed
          console.log('always');
        });
    }
    //for alert message
 const [open1, setOpen1] = useState(false)


 const handleClose1 = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }
 
   setOpen1(false);
 };





 const handleSubmit = (event) => {
  event.preventDefault();
 setSubmitting(true);
 if(organization_name.trim() === '') {
  setorgnameerror(true)
}
if (emailvaidate) {
  //  alert("Email Address Not Valid")
    setEmailCheck(true)
 
  }
  if (websitevaidate) {
      setWebsiteCheck(true)
   
    }
    if (mobilenovaidate) {
      setMobnoCheck(true)
   
    }
if(
  organization_name.trim() === '' ||
  emailvaidate ||
  websitevaidate ||
  mobilenovaidate
)
  {
    setSubmitting(false)
    return
  }
const organization = {
  "customer_type": "Organization",
  "organization_name": organization_name,
  "industry_type": industry_type,
  "mobile_no": Number(mobile_no),
  "website": website,
  "email": email,
  "address": address,
  "city": city,
  "state": state,
  "pincode":Number(pincode),
  "gst": gst,
  "category": selectedCategoryID,
  "source": selectedSourceID,
  "tag": JSON.stringify(tagname),

};
console.log(organization);
// individual['category'] = selectedCategoryID;

const customer_access_token = localStorage.getItem("ipss_access_token");
//organization["customer_type"]= customer_type;
addNewOrganization(customer_access_token, organization)
  .then(res => { // handle success
    console.log(res.data.inserted_id);
    setOpen1(true);
    setTimeout(() => {
      setSubmitting(false)
      setOpen1(false);

    }, 6000);
  })
  .catch(error => {// handle error
    console.log(error);
  })
  .then(() => {// always executed
    console.log('always');
  });

}
      //validate email
  const ValidateEmail = (email) => {
    console.log('email verify called')
    // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      setEmailCheck(false)
      console.log('email valid')
    }
    else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not email valid')
      setEmailCheck(true)
    }
  }
  //validate website
  const ValidateWebsite = (website) => {
    console.log('website verify called')
    // eslint-disable-next-line
    var websiteformat = /^((https?|http):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    if (website.match(websiteformat)) {
      setWebsiteCheck(false)
      console.log('website valid')
    }
    else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not website valid')
      setWebsiteCheck(true)
    }
  }
  //validate mobileno
  const ValidateMobileNo = (mobile_no) => {
    console.log('mobilenumber verify called')
    // eslint-disable-next-line
    var numberformat = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (mobile_no.match(numberformat)) {
      setMobnoCheck(false)
      console.log('mobilenumber valid')
    }
    else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not mobilenumber valid')
      setMobnoCheck(true)
    }
  }  

      const invalidateCategory = () => {
    
        const customer_access_token = localStorage.getItem("ipss_access_token");
          getAllCategory(customer_access_token)
        
            .then(res => { // handle success
              console.log(res);
              setcategory(res.data.results)
              
        
            })
            .catch(error => {// handle error
              console.log(error);
            })
            .then(() => {// always executed
              console.log('always');
            });
        
        }
        const invalidateSource = () => {
    
          const customer_access_token = localStorage.getItem("ipss_access_token");
            getAllSource(customer_access_token)
          
              .then(res => { // handle success
                console.log(res);
                setsource(res.data.results)
                
          
              })
              .catch(error => {// handle error
                console.log(error);
              })
              .then(() => {// always executed
                console.log('always');
              });
          
          }
          const invalidateTag = () => {
    
            const customer_access_token = localStorage.getItem("ipss_access_token");
              getAllTag(customer_access_token)
            
                .then(res => { // handle success
                  console.log(res);
                  settag(res.data.results)
                  
            
                })
                .catch(error => {// handle error
                  console.log(error);
                })
                .then(() => {// always executed
                  console.log('always');
                });
            
            }
      
      //Api integeration
      
      useEffect(() => {
    //  invalidateOrganization();
      invalidateCategory();
      invalidateSource();
      invalidateTag();
      loginUser();
      }, []
      )
    
    
    //for redirect
    const history = useHistory();

    return (
        <div className="ag-theme-alpine" style={{ height: "90vh", margin: "5vh" }}>


            <AppBar position="static" class="appbar29"  style={{ width: "1200px"}}>
                <Toolbar >
                    <Box display='flex' flexGrow={1}>
                        <h1 className='band1'> Configure Customers </h1>
                    </Box>
                    {/* <div className='tooltip'><Button variant="text" id='upload'><IosShareRoundedIcon className='band1'></IosShareRoundedIcon></Button>
                        <span className='tooltiptext'>Upload</span> </div> */}
                                  <Grid>
            <div className='tooltip'> 
<Button id="back"  variant="text" onClick={() =>{ history.push("/")}}  ><ArrowBackIcon className='btn'></ArrowBackIcon></Button>
        <span className='tooltiptext'>Back</span> </div>
            </Grid>
                </Toolbar>
            </AppBar>
            <br></br>
            <form onSubmit={handleSubmit} > 
            <Paper className='top_paper'>
                <div className='paper'>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                             value="individual"
                              id='individual'
                              control={<Radio />} label="Individual"
                               onClick={() => history.push("/components/Individual")} />
                            <FormControlLabel
                                control={<Radio />} 
                                label="Organization"
                               // value="Organization"
                                name="customer_type"
                               // onChange={e=>setcustomertype(e.target.value)}
                                id='Organization' />
                        </RadioGroup>
                    </FormControl>
                    <br></br><br></br>
                    <TextField
                        id="organization_name"
                        label="Name"
                        name="organization_name"
                        value={organization_name}
                        helperText={org_nameerror && ' Field is Required.'}
                        onChange={(event) => {setorgname(event.target.value);setorgnameerror(false)}}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={org_nameerror}
                        />
                    <br></br>
                    <br></br>

                </div>

                <div className='upload'><Button  id='logo' > <Avatar><PublishIcon className='band1'></PublishIcon> </Avatar></Button>
                    <br></br>
                    <span className='upload_label'>Logo</span></div>


                <br></br>
                <br></br>

            </Paper>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='row_1'>
                    <TextField
                        id="industry_type"
                        label="Industry Type" 
                        name="industry_type"
                        
                          value={industry_type}
                        onChange={(event) => setindustrytype(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                <div className='row_2'>
                    <TextField
                        id="address"
                        label="Address"
                        name="address"
                     
                        value={address}
                        onChange={(event) => setaddress(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                {/* <div className='row_3'>
           <TextField
          id="pan org"
          label="PAN"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }} />
          </div> */}
                <div className='row_3'>
                    <TextField
                        id="gst"
                        label="GST"
                        name="gst"
                    
                        value={gst}
                        onChange={(event) => setgst(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='row_1'>
                    <TextField
                        id="mobile no org"
                        label="Mobile No"
                        name="mobile_no"
                        value={mobile_no}
                        onChange={(event) => {setmobileno(event.target.value);setMobnoCheck(false)}}
                        helperText={mobilenovaidate ? 'Enter Valid Mobile Number' : ''}
                        onBlur={(event) => ValidateMobileNo(event.target.value)}  variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        error={mobilenovaidate}
                        />
                </div>
                <div className='row_2'>
                    <TextField
                        id="city"
                        label="City"
                        name="city"
                     
                        value={city}
                        onChange={(event) => setcity(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                {/* <div className='row_3'>
          <Autocomplete
              id="Account Manager"
              options={organization}
              style={{width:"222px"}}
              size="small"
              renderInput={(params) => 
              <TextField {...params} 
               label="Account Manager"
               variant="outlined"
               InputLabelProps={{
                shrink: true,
              }} />}
            />
          </div> */}
                <div className='row_3'>
                <FormControl sx={{ minWidth: 170 }} size="small">
            <InputLabel >Category</InputLabel>
              <Select
                   style={{ width: "225px" }}
                   id="category"
                   align="left"
                   size="small"
                   defaultValue=""
                   name="category"
                  onChange={handleCategoryChange}
                   value={selectedCategoryID}
                   label="Category"
                   variant="outlined"
                   InputLabelProps={{
                     shrink: true,
                   }} 
                 >
                   {category.map(obj => {
                         return (
                           <MenuItem
                             value={obj.category_id}
                             onChange={handleCategoryChange}
                             
                           >
                             {obj.category_name}
                           </MenuItem>
                         );
                       })}
       
              </Select>
        </FormControl>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='row_1'>
                    <TextField
                        id="email"
                        label="E-Mail"
                        name ="email"
                        value={email}
                        onChange={(event) => { setemail(event.target.value); setEmailCheck(false)}}
                        helperText={emailvaidate ? 'Enter Valid Email Address' : ''}
                        onBlur={(event) => ValidateEmail(event.target.value)}                       
                         variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={emailvaidate}
                        />
                </div>
                <div className='row_2'>
                    <TextField
                        id="state org"
                        label="State"
                        name ="state"
                    
                        value={state}
                        onChange={(event) => setstate(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                <div className='row_3'>
                <FormControl sx={{ minWidth: 170 }} size="small">
            <InputLabel >Source</InputLabel>
              <Select
              style={{ width: "225px" }}
                   id="source"
                   align="left"
                   size="small"
                   defaultValue=""
                   name ="source"
                   onChange={handleSourceChange}                          
                
                   value={selectedSourceID}
                   label="Source"
                  variant="outlined"
                   InputLabelProps={{
                     shrink: true,
                   }} 
                 >
                   {source.map(obj => {
                         return (
                           <MenuItem
                             value={obj.source_id}   
                             onChange={handleSourceChange}                          
                           >
                             {obj.source_name}
                           </MenuItem>
                         );
                       })}
       
              </Select>
        </FormControl> 
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='row_1'>
                    <TextField
                        id="website"
                        label="Website"
                        name ="website"
                        value={website}
                        onChange={(event) => {setwebsite(event.target.value);setWebsiteCheck(false)}}
                        helperText={websitevaidate ? 'Enter Valid Website URL' : ''}
                        onBlur={(event) => ValidateWebsite(event.target.value)}                   
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        error={websitevaidate}
                        />
                </div>
                <div className='row_2'>
                    <TextField
                        id="pincode org"
                        label="Pincode"
                        name ="pincode"
                    
                        value={pincode}
                        onChange={(event) => setpincode(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                <div className='row_3'>
                <Autocomplete
              value={tagname}
              onChange={(event, newValue) => {
                settagname(newValue);
              }}
              multiple
              size='small'
              id='tags-filled'
              style={{ width: '225px' }}
              options={tag.map((option) => option.tag_name)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Tag'
                  // placeholder="Favorites"
                />
              )}
            />
                    {/* <TextField
                        id="tag org"
                        label="Tag"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} /> */}
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='button'>
                    <div className='button_1'>
                        <Button size='small' variant="outlined" id='cancel'>Cancel</Button>
                    </div>
                    <div className='button_2'>
                        <Button size='small' variant="contained" id='save'onClick={handleSubmit}>Save</Button>
                        <Snackbar open={open1} autoHideDuration={6000}  onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="success">
          <strong> Saved Successfully!</strong> 
          </Alert>
            </Snackbar>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            </form>

        </div>
    )

}
export default Organization;