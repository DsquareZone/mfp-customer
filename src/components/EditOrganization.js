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
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {UpdateOrganization,getCustomer,getAllCategory,getAllSource,getAllTag,login} from '../service/Customer.service';
//alert message
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useFormik} from 'formik';
let gridApi;


const EditOrganization = () => {


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
    const[tag,settag] = useState([]);
    const [tagname, settagname] = useState();
    const[selectedTagID,setSelectedTagID] = useState("");
    const[submitting,setSubmitting]=useState(true);
    const [formData, setFormData] = useState({
      customer_id: Number(),
      customer_type: "",
      organization_name: "",
      industry_type: "",
      mobile_no: Number(),
      email: "",
      website: "",
      source: "",
      address: "",
      city: "",
      state: "",
      pincode: Number(),
      gst: "",
      category: "",
      tag: ""
    });

    
    const handleCategoryChange = (event) => {
      setFormData({ ...formData,[event.target.name]:event.target.value})
    }
    const handleSourceChange = (event) => {
      setFormData({ ...formData,[event.target.name]:event.target.value})
    }
    const handleTagChange = (event) => {
      setFormData({ ...formData,[event.target.name]:event.target.value})
    }
    const handleChange = () => {
        setcustomertype(customer_type)
    }
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



//getmethod
      const getOrganization = () => {
        const customer_id = window.location.pathname.split('/')[3];
        console.log('inserted_id: ' + customer_id)
    
        const customer_access_token = localStorage.getItem("ipss_access_token");
        getCustomer(customer_access_token, customer_id)
    
          .then(res => { // handle success
            console.log(res);
            
            setFormData({
              customer_id: res.data.customer_id ,
              customer_type : res.data.customer_type,
              organization_name : res.data.organization_name,
              industry_type:res.data.industry_type,
              mobile_no:res.data.mobile_no,
              email:res.data.email,
              website:res.data.website,
              source:res.data.source,
              address:res.data.address,
              city:res.data.city,
              state:res.data.state,
              pincode:res.data.pincode,
              gst:res.data.gst,
              category:res.data.category,
              tag:res.data.tag ? JSON.parse(res.data.tag) : '',
             });
  
          })
          .catch(error => {// handle error
            console.log(error);
          })
          .then(() => {// always executed
            console.log('always');
          });
      }

      const handleUpdateSubmit = () => {
      //  event.preventDefault();
       setSubmitting(true);
       const customer_id = window.location.pathname.split('/')[3];
       console.log('inserted_id: ' + customer_id)
     const organization = {
        "customer_type": formData.customer_type,
        "organization_name": formData.organization_name,
        "industry_type": formData.industry_type,
        "mobile_no": formData.mobile_no,
        "website": formData.website,
        "email": formData.email,
        "address": formData.address,
        "city": formData.city,
        "state": formData.state,
        "pincode":formData.pincode,
        "gst": formData.gst,
        "category": formData.category,
        "source": formData.source,
        "tag": JSON.stringify(formData.tag),
      
      };
      console.log(organization);
     // individual['category'] = selectedCategoryID;
    
      const customer_access_token = localStorage.getItem("ipss_access_token");
      UpdateOrganization(customer_access_token, organization,customer_id)
        .then(res => { // handle success
          //console.log(res.data.inserted_id);
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
    const validation = async () => {
      console.log('validation')
  
      if(formData.organization_name.trim() === '') {
        setorgnameerror(true)
      }
      if (formData.emailvaidate) {
        //  alert("Email Address Not Valid")
          setEmailCheck(true)
       
        }
        if (formData.websitevaidate) {
            setWebsiteCheck(true)
         
          }
          if (formData.mobilenovaidate) {
            setMobnoCheck(true)
         
          }
      if(
        formData.organization_name.trim() === '' ||
        formData.emailvaidate ||
        formData.websitevaidate ||
        formData.mobilenovaidate
      )
        {
          return
        }else{
          console.log('submitting called')
          setSubmitting(true)
          handleUpdateSubmit()
        }
        
    }
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
       const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id)
        const customer_access_token = localStorage.getItem("ipss_access_token");
          getAllCategory(customer_access_token,customer_id)
        
            .then(res => { // handle success
              console.log(res);
              setcategory(res.data.results)
              getOrganization();
        
            })
            .catch(error => {// handle error
              console.log(error);
            })
            .then(() => {// always executed
              console.log('always');
            });
        
        }
        const invalidateSource = () => {
          const customer_id = window.location.pathname.split('/')[3];
          console.log('inserted_id: ' + customer_id)
          const customer_access_token = localStorage.getItem("ipss_access_token");
            getAllSource(customer_access_token,customer_id)
          
              .then(res => { // handle success
                console.log(res);
                setsource(res.data.results)
                getOrganization();
          
              })
              .catch(error => {// handle error
                console.log(error);
              })
              .then(() => {// always executed
                console.log('always');
              });
          
          }
          const invalidateTag = () => {
            const customer_id = window.location.pathname.split('/')[3];
            console.log('inserted_id: ' + customer_id)
            const customer_access_token = localStorage.getItem("ipss_access_token");
              getAllTag(customer_access_token,customer_id)
            
                .then(res => { // handle success
                  console.log(res);
                  settag(res.data.results)
                  getOrganization();
            
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
    
       //update
 const onChange = (id, value) => {

  console.log(value, id)
  setFormData({ ...formData, [id]: value })

}
    
    //for redirect
    const history = useHistory();

    return (
        <div className="ag-theme-alpine" style={{ height: "90vh", margin: "5vh" }}>


            <AppBar position="static" class="appbar29" style={{ width: "1200px"}}>
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
            <Paper className='top_paper'>
                <div className='paper'>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="individual" id='individual' control={<Radio />} label="Individual" onClick={() => history.push("/components/Individual/")} />
                            <FormControlLabel
                                control={<Radio />} value1={customer_type}
                                onClick={handleChange}
                                label="Organization"
                               // value="organization"
                                id='Organization' />
                        </RadioGroup>
                    </FormControl>
                    <br></br><br></br>
                    <TextField
                        id="organization_name"
                        label="Name"
                        value={formData.organization_name}
                     onChange={(event) => {onChange("organization_name", event.target.value);setorgnameerror(false)}} 
                     variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={org_nameerror ? true : false}
                        helperText={org_nameerror ? 'Field is Required' : ''}
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
                        id="industry type"
                        label="Industry Type" 
                          value={formData.industry_type}
                          onChange={(event) => onChange("industry_type", event.target.value)}
                          variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                <div className='row_2'>
                    <TextField
                        id="address org"
                        label="Address"
                        value={formData.address}
                        onChange={(event) => onChange("address", event.target.value)}
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
                        id="gst org"
                        label="GST"
                        value={formData.gst}
                        onChange={(event) => onChange("gst", event.target.value)}
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
                        value={formData.mobile_no}
                        onBlur={(event) => ValidateMobileNo(event.target.value)}
                        onChange={(event) => {onChange("mobile_no", event.target.value);setMobnoCheck(false)}}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={mobilenovaidate}
                        helperText={mobilenovaidate ? 'Enter Valid Number' : ''}  
                        />
                </div>
                <div className='row_2'>
                    <TextField
                        id="city org"
                        label="City"
                        value={formData.city}
                        onChange={(event) => onChange("city", event.target.value)}
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
                   value={formData.category}
                   label="Category"
                   onChange={(event) => onChange("category", event.target.value)}
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
                        id="email org"
                        label="E-Mail"
                        value={formData.email}
                        onBlur={(event) => ValidateEmail(event.target.value)}
                        onChange={(event) => { onChange("email", event.target.value);setEmailCheck(false)}}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={emailvaidate}
                        helperText={emailvaidate ? 'Enter Valid Email Address' : ''}
                         />
                </div>
                <div className='row_2'>
                    <TextField
                        id="state org"
                        label="State"
                        value={formData.state}
                        onChange={(event) => onChange("state", event.target.value)}
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
                   value={formData.source}
                   label="Source"
                   onChange={(event) => onChange("source", event.target.value)}
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
                             {obj.source_name.trim()}
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
                        id="website org"
                        label="Website"
                        value={formData.website}
                        onBlur={(event) => ValidateWebsite(event.target.value)}
                        onChange={(event) => {onChange("website", event.target.value);setWebsiteCheck(false)}}                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={websitevaidate}
                        helperText={websitevaidate ? 'Enter Valid Website URL' : ''} 
                        />
                </div>
                <div className='row_2'>
                    <TextField
                        id="pincode org"
                        label="Pincode"
                        value={formData.pincode}
                        onChange={(event) => onChange("pincode", event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>
                <div className='row_3'>
                <Autocomplete
            value={formData.tag}
            onChange={(event, newValue) => {
              console.log({ newValue });
              setFormData((prev) => ({ ...prev, tag: newValue }));
              settagname(newValue);
            }}
            multiple
            size='small'
            id='tags-filled1'
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
                        <Button size='small' variant="contained" id='save' type="submit"onClick={handleUpdateSubmit ? validation : ''}>Save</Button>
                        <Snackbar open={open1} autoHideDuration={6000}  onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="success">
          <strong> Updated Successfully!</strong> 
          </Alert>
            </Snackbar>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    )

}
export default EditOrganization;