/*File: 
   Objective: 
            
    
  Description: 
                 

Initiated By: Gobi Krishna N on 11th july 2022

Modification History

-------------------------------------------------------------------------------------------------------------------
DATE          |   AUTHOR        |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------


--------------------------------------------------------------------------------------------------------------------
*/
//react import
import React, { useEffect, useState } from 'react';
//for redirect
import { useHistory } from 'react-router-dom';
//css
import './ag.css';
//mock data
import data from '../../mock/rpt.json';
//material ui
import { Button, Chip, MenuItem } from '@mui/material';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import PublishIcon from '@material-ui/icons/Publish';
import { Paper, Select, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@mui/material/Grid';
//import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  getAllCategory,
  getCustomer,
  getAllOrganization,
  getAllSource,
  getAllTag,
  login,
  UpdateIndividual,
} from '../service/Customer.service';
//alert message
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/lab/Alert';
let gridApi;

const EditIndividual = () => {
  const [customer_name, setcustomername] = useState('');
  const [customer_nameerror, setcustomernameerror] = useState('');
  const [organization, setorgnamemap] = useState([]);
  const [orgname, setorgname] = useState();
  const [job_position, setjobposition] = useState('');
  const [mobile_no, setmobileno] = useState('');
  const [mobilenovaidate, setMobnoCheck] = useState(false);
  const [website, setwebsite] = useState('');
  const [websitevaidate, setWebsiteCheck] = useState(false);
  const [email, setemail] = useState('');
  const [emailvaidate, setEmailCheck] = useState(false);
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [pan, setpan] = useState('');
  const [category, setcategory] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [source, setsource] = useState([]);
  const [selectedSourceID, setSelectedSourceID] = useState('');
  const [tag, settag] = useState([]);
  const [tagname, settagname] = useState();
  const [selectedTagID, setSelectedTagID] = useState('');
  const [submitting, setSubmitting] = useState(true);
  const [formData, setFormData] = useState({
    customer_id: Number(),
    customer_type: '',
    mobile_no: Number(),
    email: '',
    website: '',
    source: Number(),
    address: '',
    city: '',
    state: '',
    pincode: Number(),
    category: Number(),
    tag: '',
    customer_name: '',
    organization_name: '',
    job_position: '',
    pan: '',
  });

  const handleOrgChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCategoryChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSourceChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleTagChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  //login
  const loginUser = () => {
    // Make a req to login
    login('ithod@pgc.com', 'edp123')
      .then((res) => {
        // handle success
        console.log(res.data.access_token);
        localStorage.setItem('ipss_access_token', res.data.access_token);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };
  //for alert message
  const [open1, setOpen1] = useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const getIndividual = () => {
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);

    const customer_access_token = localStorage.getItem('ipss_access_token');
    getCustomer(customer_access_token, customer_id)
      .then((res) => {
        // handle success

        setFormData({
          customer_id: res.data.customer_id,
          customer_type: res.data.customer_type,
          mobile_no: res.data.mobile_no,
          email: res.data.email,
          website: res.data.website,
          source: res.data.source,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          pincode: res.data.pincode,
          category: res.data.category,
          tag: res.data.tag ? JSON.parse(res.data.tag) : '',
          customer_name: res.data.customer_name,
          organization_name: res.data.organization_name,
          job_position: res.data.job_position,
          pan: res.data.pan,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };

  const handleUpdateSubmit = () => {
    //event.preventDefault();
    setSubmitting(true);
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);
    const individual = {
      customer_name: formData.customer_name,
      organization_name: formData.organization_name,
      job_position: formData.job_position,
      mobile_no: formData.mobile_no,
      website: formData.website,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      pan: formData.pan,
      category: formData.category,
      source: formData.source,
      tag: JSON.stringify(formData.tag),
    };
    console.log(individual);

    const customer_access_token = localStorage.getItem('ipss_access_token');
    UpdateIndividual(customer_access_token, individual, customer_id)
      .then((res) => {
        // handle success
        // console.log(submitting);
        setOpen1(true);
        setTimeout(() => {
          setSubmitting(false);
          setOpen1(false);
        }, 6000);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };
  const validation = async () => {
    console.log('validation');

    if (formData.customer_name.trim() === '') {
      setcustomernameerror(true);
    }
    if (formData.emailvaidate) {
      //  alert("Email Address Not Valid")
      setEmailCheck(true);
    }
    if (formData.websitevaidate) {
      setWebsiteCheck(true);
    }
    if (formData.mobilenovaidate) {
      setMobnoCheck(true);
    }
    if (formData.customer_name.trim() === '' || formData.emailvaidate || formData.websitevaidate || formData.mobilenovaidate) {
      return;
    } else {
      console.log('submitting called');
      setSubmitting(true);
      handleUpdateSubmit();
    }
  };
  const ValidateEmail = (email) => {
    console.log('email verify called');
    // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      setEmailCheck(false);
      console.log('email valid');
    } else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not email valid');
      setEmailCheck(true);
    }
  };
  const ValidateWebsite = (website) => {
    console.log('website verify called');
    // eslint-disable-next-line
    var websiteformat =
      /^((https?|http):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    if (website.match(websiteformat)) {
      setWebsiteCheck(false);
      console.log('website valid');
    } else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not website valid');
      setWebsiteCheck(true);
    }
  };
  const ValidateMobileNo = (mobile_no) => {
    console.log('mobilenumber verify called');
    // eslint-disable-next-line
    var numberformat = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (mobile_no.match(numberformat)) {
      setMobnoCheck(false);
      console.log('mobilenumber valid');
    } else {
      //  alert("You have entered an invalid email address!");
      console.log('this is not mobilenumber valid');
      setMobnoCheck(true);
    }
  };
  //  //yup validation
  //  const indcustomerFormSchema = yup.object({
  //   ...individualcustomerSchema ,
  // })

  // const formik = useFormik({
  //   validateOnChange: true,
  //   validateOnBlur: false,
  //   validationSchema: indcustomerFormSchema,
  //   onSubmit: onSubmit,
  //   initialValues: formData
  // })

  // const {  // these functiions essential for formik yup
  //   handleChange,
  //   handleSubmit,
  //   handleBlur,
  //   values,
  //   touched,
  //   isValid,
  //   errors,
  // } = formik

  // useEffect(() => {
  //   console.log(errors)
  //   formik.setValues(formData)
  // }, [formData])

  const invalidateOrganization = () => {
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);

    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllOrganization(customer_access_token, customer_id)
      .then((res) => {
        // handle success
        console.log(res);
        const processedOrgs = res.data.results.map((result) => result.organization_name);
        console.log(processedOrgs);
        setorgnamemap(processedOrgs);
        getIndividual();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };
  const invalidateCategory = () => {
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllCategory(customer_access_token, customer_id)
      .then((res) => {
        // handle success
        console.log(res);
        setcategory(res.data.results);
        getIndividual();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };
  const invalidateSource = () => {
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllSource(customer_access_token, customer_id)
      .then((res) => {
        // handle success
        console.log(res);
        setsource(res.data.results);
        getIndividual();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };
  const invalidateTag = () => {
    const customer_id = window.location.pathname.split('/')[3];
    console.log('inserted_id: ' + customer_id);
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllTag(customer_access_token, customer_id)
      .then((res) => {
        // handle success
        console.log(res);
        settag(res.data.results);
        getIndividual();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('always');
      });
  };

  //Api integeration

  useEffect(() => {
    invalidateOrganization();
    invalidateCategory();
    invalidateSource();
    invalidateTag();
    loginUser();
  }, []);

  //update
  const onChange = (id, value) => {
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  };

  //for redirect
  const history = useHistory();

  return (
    <div className='ag-theme-alpine' style={{ height: '90vh', margin: '5vh' }}>
      <AppBar position='static' class='appbar29' style={{ width: '1200px' }}>
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <h1 className='band1'> Configure Customers </h1>
          </Box>
          {/* <div className='tooltip'><Button variant="text" id='upload'><IosShareRoundedIcon className='band1'></IosShareRoundedIcon></Button>
            <span className='tooltiptext'>Upload</span> </div> */}
          <Grid>
            <div className='tooltip'>
              <Button
                id='back'
                variant='text'
                onClick={() => {
                  history.push('/');
                }}
              >
                <ArrowBackIcon className='btn'></ArrowBackIcon>
              </Button>
              <span className='tooltiptext'>Back</span>{' '}
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <br></br>
      {/* <form onSubmit={handleSubmit}>  */}
      <Paper className='top_paper'>
        <div className='paper'>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
              <FormControlLabel
                control={<Radio />}
                // value="individual"
                label='Individual'
                id='individual'
              />
              <FormControlLabel
                onClick={() => history.push('/Edit/Organization/')}
                value='organization'
                control={<Radio />}
                id='Organization'
                label='Organization'
              />
            </RadioGroup>
          </FormControl>
          <br></br>
          <br></br>

          <TextField
            id='customer_name'
            name='customer_name'
            //onChange={handleChange}
            // required
            value={formData.customer_name}
            label='Name'
            variant='outlined'
            size='small'
            onChange={(event) => {
              onChange('customer_name', event.target.value);
              setcustomernameerror(false);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={customer_nameerror ? true : false}
            helperText={customer_nameerror ? 'Field is Required' : ''}
          />

          <br></br>
          <br />
          {console.log({ formData })}
          <Autocomplete
            freeSolo
            id='free-solo-2-demo1'
            disableClearable
            options={organization}
            value={formData.organization_name}
            onChange={(event, newValue) => {
              setFormData(prev=>({...prev,organization_name:newValue}));
                       setorgname(newValue);
                     }}
            size='small'
            renderInput={(params) => (
              <TextField
                {...params}
                label='Organization'
                variant='outlined'
                style={{ width: '225px' }}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          {/* <Autocomplete
            id='organization'
            //options={organization}
            value={selectedOrgID}
            onChange={handleOrgChange}
            style={{ width: "222px" }}
            size="small"
            renderInput={(params) =>
              <Select
                label="Organization"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }} >
                      {organization_name_map.map(obj => {
                  return (
                    <MenuItem
                      value={obj.customer_id}                             
                    >
                      {obj.organization_name}
                    </MenuItem>
                  );
                })}

                  </Select>
                  }
          /> */}
        </div>

        <div className='upload'>
          <Button variant='text' id='upload'>
            <Avatar>
              <PublishIcon className='band1'></PublishIcon>
            </Avatar>
          </Button>
          <br></br>
          <span className='upload_label'>Photo</span>
        </div>

        <br></br>
        <br></br>
      </Paper>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='row_1'>
          <TextField
            id='job position'
            label='Job Position'
            value={formData.job_position}
            onChange={(event) => onChange('job_position', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className='row_2'>
          <TextField
            id='address'
            label='Address'
            value={formData.address}
            onChange={(event) => onChange('address', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className='row_3'>
          <TextField
            id='pan'
            label='PAN'
            value={formData.pan}
            onChange={(event) => onChange('pan', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='row_1'>
          <TextField
            id='mobile_no'
            label='Mobile No'
            value={formData.mobile_no}
            onBlur={(event) => ValidateMobileNo(event.target.value)}
            onChange={(event) => {
              onChange('mobile_no', event.target.value);
              setMobnoCheck(false);
            }}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            error={mobilenovaidate}
            helperText={mobilenovaidate ? 'Enter Valid Number' : ''}
          />
        </div>
        <div className='row_2'>
          <TextField
            id='city'
            label='City'
            value={formData.city}
            onChange={(event) => onChange('city', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {/* <div className='row_3'>
          <Autocomplete
              id="Account Manager"
              options={organization}
              style={{width:"222px"}}
              renderInput={(params) => 
              <TextField {...params} 
               label="Account Manager"
               variant="outlined"
               size="small"
               InputLabelProps={{
                shrink: true,
              }} />}
            />
          </div> */}
        <div className='row_3'>
          <FormControl sx={{ minWidth: 170 }} size='small'>
            <InputLabel>Category</InputLabel>
            <Select
              style={{ width: '225px' }}
              id='category'
              align='left'
              size='small'
              defaultValue=''
              value={formData.category}
              label='Category'
              onChange={(event) => onChange('category', event.target.value)}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            >
              {category.map((obj) => {
                return (
                  <MenuItem value={obj.category_id} onChange={handleCategoryChange}>
                    {obj.category_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* <Autocomplete
              id="category_name"
              options={category}
             getOptionLabel={(option) => option.category_name}
              onChange={(e, newValue) => {
                console.log(newValue)
                //handleidcard();
                //setSelectedEmpID(event.target.value);
       //formik.setFieldValue('empid1', '' + event.target.value)
           }}
              // style={{ width: 500 }}
              renderInput={(params) => <TextField {...params} label="Category" fullWidth variant="outlined" />}
            /> */}
          {/* <Autocomplete
            id="Category"
           // options={categoryoption}
           value={selectedCategoryID}
            onChange={handleCategoryChange}
            style={{ width: "222px" }}-
          //  renderInput={(params) =>
                label="Category"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }} >   
                 {category.map(obj => {
                  return (
                    <MenuItem
                      value={obj.category_id}                             
                    >
                      {obj.category_name}
                    </MenuItem>
                  );
                })}


              
              </Autocomplete> */}
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='row_1'>
          <TextField
            id='email'
            label='E-Mail'
            value={formData.email}
            onBlur={(event) => ValidateEmail(event.target.value)}
            onChange={(event) => {
              onChange('email', event.target.value);
              setEmailCheck(false);
            }}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            error={emailvaidate}
            helperText={emailvaidate ? 'Enter Valid Email Address' : ''}
          />
        </div>
        <div className='row_2'>
          <TextField
            id='state'
            label='State'
            value={formData.state}
            onChange={(event) => onChange('state', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className='row_3'>
          {/* 
        <FormControl sx={{ minWidth: 170 }} size="small" >
            <InputLabel >Source</InputLabel>
              <Select
                 //  onChange= {handleBloodGroupChange}
                  // style={{ width: "170px" }}
                   id="source"
                   align="left"
                   size="small"
                   defaultValue=""
                   value={selectedSourceID}
                   label="Source"
                  
                  //  InputLabelProps={{
                  //   shrink: true,
                  // }}
                    variant="outlined"
                   onChange={handleSourceChange}
                  
                 >
                  
                   
                  {source.map(obj => {
                         return (
                           <MenuItem
                             value={obj.source_id}                             
                           >
                             {obj.source_name}
                           </MenuItem>
                         );
                       })}
       
              </Select>
              
        </FormControl> */}

          <FormControl sx={{ minWidth: 170 }} size='small'>
            <InputLabel>Source</InputLabel>
            <Select
              style={{ width: '225px' }}
              id='source'
              align='left'
              size='small'
              defaultValue=''
              value={formData.source}
              label='Source'
              onChange={(event) => onChange('source', event.target.value)}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            >
              {source.map((obj) => {
                return (
                  <MenuItem value={obj.source_id} onChange={handleSourceChange}>
                    {obj.source_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* <Autocomplete
            id="Source"
           // options={sourceoption}
            value={selectedSourceID}
            onChange={handleSourceChange}
            style={{ width: "222px" }}
            renderInput={(params) =>
              <Select
                label="Source"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }} >
                     {source.map(obj => {
                  return (
                    <MenuItem
                      value={obj.source_id}                             
                    >
                      {obj.source_name}
                    </MenuItem>
                  );
                })}
                  </Select>
                  }
          /> */}
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='row_1'>
          <TextField
            id='website'
            label='Website'
            value={formData.website}
            onBlur={(event) => ValidateWebsite(event.target.value)}
            onChange={(event) => {
              onChange('website', event.target.value);
              setWebsiteCheck(false);
            }}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            error={websitevaidate}
            helperText={websitevaidate ? 'Enter Valid Website URL' : ''}
          />
        </div>
        <div className='row_2'>
          <TextField
            id='pincode'
            label='Pincode'
            value={formData.pincode}
            onChange={(event) => onChange('pincode', event.target.value)}
            variant='outlined'
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {console.log({ formData })}
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
          {/* <FormControl sx={{ minWidth: 170 }} size="small">
              <InputLabel >Tag</InputLabel>
              <Select
                style={{ width: "225px" }}
                id="tag"
                align="left"
                size="small"
                defaultValue=""
                value={formData.tag}
                label="Tag"
                onChange={handleTagChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {tag.map(obj => {
                  return (
                    <MenuItem
                      value={obj.tag_id}
                      onChange={handleTagChange}
                    >
                      {obj.tag_name}
                    </MenuItem>
                  );
                })}

              </Select>
            </FormControl> */}
          {/* <Autocomplete
            id="tag"
            value={selectedTagID}
            onChange={handleTagChange}
            renderInput={(params) =>
            <Select
            label="Tag"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }} >
                {tag.map(obj => {
                  return (
                    <MenuItem
                      value={obj.tag_id}                             
                    >
                      {obj.tag_name}
                    </MenuItem>
                  );
                })}

                </Select>           
              } 
              /> */}
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='button'>
          <div className='button_1'>
            <Button size='small' variant='outlined' id='cancel'>
              Cancel
            </Button>
          </div>
          <div className='button_2'>
            <Button size='small' variant='contained' id='save' onClick={handleUpdateSubmit ? validation : ''} type='submit'>
              Save
            </Button>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
              <Alert onClose={handleClose1} severity='success'>
                <strong> Updated Successfully!</strong>
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      {/* </form> */}
    </div>
  );
};
export default EditIndividual;
