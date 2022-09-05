/*File: 
   Objective: 
            
    
  Description: 
                 

Initiated By: Gobi Krishna N on 11th july 2022

Modification History

-------------------------------------------------------------------------------------------------------------------
DATE          |   AUTHOR        |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------
14.07.2021     Poornima kamatchi     API Integration                                  api service added to ui screen 

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
import { Button, MenuItem, Stack } from '@mui/material';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import PublishIcon from '@material-ui/icons/Publish';
import { Paper, Select } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
//import Autocomplete ,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@mui/material/Grid';
//import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addNewIndividual, getAllCategory, getAllOrganization, getAllSource, getAllTag, login } from '../service/Customer.service';
//alert message
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/lab/Alert';
//import {createFilterOptions} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { S3_URL } from '../service/s3url';
import ProfilePhotoUploader from '../service/photouploader';

let gridApi;

export const defaultS3Data = {
  //media_id: "",
  media_key: '',
};

//Function Initialization
const Individual = () => {
  const [customer_type, setcustomertype] = useState('');
  const [customer_name, setcustomername] = useState('');
  const [customer_nameerror, setcustomernameerror] = useState('');
  const [organization, setorgnamemap] = useState([]);
  // organization value
  const [orgname, setorgname] = useState();
  const [selectedOrgID, setSelectedOrgID] = useState('');
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
  const [submitting, setSubmitting] = useState(true);
  const [upload_logo, setUpload_logo] = useState(defaultS3Data);

  const handleClick = () => {
    setorgname(organization_name[0]);
  };

  const handleOrgChange = (event) => {
    setSelectedOrgID(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategoryID(event.target.value);
    //handleChange();
  };
  const handleSourceChange = (event) => {
    setSelectedSourceID(event.target.value);
  };
  const handleTagChange = (event) => {
    settag(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    if (customer_name.trim() === '') {
      setcustomernameerror(true);
    }
    if (emailvaidate) {
      //  alert("Email Address Not Valid")
      setEmailCheck(true);
    }
    if (websitevaidate) {
      setWebsiteCheck(true);
    }
    if (mobilenovaidate) {
      setMobnoCheck(true);
    }
    if (customer_name.trim() === '' || emailvaidate || websitevaidate || mobilenovaidate) {
      setSubmitting(false);
      return;
    }

    const individual = {
      customer_name: customer_name,
      organization_name: orgname,
      job_position: job_position,
      mobile_no: Number(mobile_no),
      website: website,
      email: email,
      address: address,
      city: city,
      state: state,
      pincode: Number(pincode),
      pan: pan,
      category: selectedCategoryID,
      source: selectedSourceID,
      tag: JSON.stringify(tagname),
      upload_logo: upload_logo.media_key,
    };
    console.log(individual);
    //  individual['category'] = selectedCategoryID;

    const customer_access_token = localStorage.getItem('ipss_access_token');
    addNewIndividual(customer_access_token, individual)
      .then((res) => {
        // handle success
        console.log(res.data.inserted_id);
        setOpen1(true);
        setcustomername();
        setmobileno();
        setwebsite();
        setemail();
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
  //validate email
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
  //validate website
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
  //validate mobileno
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

  //getall organization
  const invalidateOrganization = () => {
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllOrganization(customer_access_token)
      .then((res) => {
        // handle success
        console.log(res);
        const processedOrgs = res.data.results.map((result) => result.organization_name);
        console.log(processedOrgs);
        setorgnamemap(processedOrgs);
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
  //getall category

  const invalidateCategory = () => {
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllCategory(customer_access_token)
      .then((res) => {
        // handle success
        console.log(res);
        setcategory(res.data.results);
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
  //getall source

  const invalidateSource = () => {
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllSource(customer_access_token)
      .then((res) => {
        // handle success
        console.log(res);
        setsource(res.data.results);
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
  //getall tag

  const invalidateTag = () => {
    const customer_access_token = localStorage.getItem('ipss_access_token');
    getAllTag(customer_access_token)
      .then((res) => {
        // handle success
        console.log(res);
        settag(res.data.results);
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

  //useeffect call when page loads

  useEffect(() => {
    invalidateOrganization();
    invalidateCategory();
    invalidateSource();
    invalidateTag();
    loginUser();
  }, []);

  //for redirect
  const history = useHistory();

  /*return function start*/

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
      <form onSubmit={handleSubmit}>
        <Paper className='top_paper'>
          <div className='paper'>
            <FormControl>
              <RadioGroup
                // value={customer_type}
                //   onChange={(event) =>setcustomertype(event.target.value)}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <FormControlLabel
                  control={<Radio />}
                  //value="individual"
                  label='Individual'
                  id='individual'
                />
                <FormControlLabel
                  onClick={() => history.push('/components/Organization')}
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
              value={customer_name}
              onChange={(event) => {
                setcustomername(event.target.value);
                setcustomernameerror(false);
              }}
              helperText={customer_nameerror && ' Field is Required.'}
              label='Name'
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              error={customer_nameerror}
            />

            <br></br>
            <br />
            {/* <Autocomplete
   value={orgname}
   onChange={handleClick}
    options={organization_name}
    getOptionLabel={option => option.organization_name}
    style={{ width: 300 }}
    renderInput={params => (
      <TextField
        {...params}
        label="Combo box"
        variant="outlined"
        fullWidth

      />
    )}
  /> */}
            <Autocomplete
              freeSolo
              id='free-solo-2-demo'
              disableClearable
              options={organization}
              value={orgname}
              onChange={(event, newValue) => {
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
            {/* <FormControl sx={{ minWidth: 170 }} size="small">
              <InputLabel >Organization</InputLabel>
              <Select

                style={{ width: "225px" }}
                id="organization"
                align="left"
                size="small"
                defaultValue=""
                value={selectedOrgID}
                label="Organization"
                onChange={handleOrgChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {organization_name.map(obj => {
                  return (
                    <MenuItem
                      value={obj.organization_name}
                    >
                      {obj.organization_name}
                    </MenuItem>
                  );
                })}

              </Select>
            </FormControl> */}
          </div>

          <div className='upload'>
            {/*<Button variant="text" id='upload' ><Avatar><PublishIcon className='band1'></PublishIcon></Avatar></Button>
            <br></br>
            <span className='upload_label'>Photo</span></div> */}
            <div className='pro_photo'>
              <a
                style={{ marginRight: 20 }}
                target='_blank'
                href={'https://freshvoice.sgp1.digitaloceanspaces.com/' + upload_logo.media_key}
              >
                View Photo
                <icon />{' '}
              </a>
              <ProfilePhotoUploader onDocumentUploaded={setUpload_logo} title='Upload Your Photo' />
              {upload_logo && upload_logo.media_key ? (
                <div
                  // className="round user_avatar"
                  roundedCircle
                  src={S3_URL + upload_logo.media_key}
                  alt='Profile image'
                  width={100}
                  height={100}
                  style={{
                    marginTop: -25,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <Avatar
                  // src="/broken-image.jpg"
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: -25,
                    backgroundColor: '#3874ff',
                  }}
                ></Avatar>
              )}
              {upload_logo && upload_logo.media_key ? (
                <Button
                  variant='outlined'
                  color='secondary'
                  style={{
                    marginTop: 15,
                    width: 110,
                  }}
                  onClick={() => Delete_document()}
                >
                  Delete photo
                </Button>
              ) : (
                <span style={{ paddingTop: 6 }} className='fvaccprofile'>
                  Upload photo
                </span>
              )}
            </div>
          </div>

          <br></br>
          <br></br>
        </Paper>
        <br></br>
        <br></br>
        <div className='row'>
          <div className='row_1'>
            <TextField
              id='job_position'
              label='Job Position'
              name='job_position'
              value={job_position}
              onChange={(event) => setjobposition(event.target.value)}
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
              name='address'
              value={address}
              onChange={(event) => setaddress(event.target.value)}
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
              name='pan'
              value={pan}
              onChange={(event) => setpan(event.target.value)}
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
              name='mobile_no'
              value={mobile_no}
              onChange={(event) => {
                setmobileno(event.target.value);
                setMobnoCheck(false);
              }}
              helperText={mobilenovaidate ? 'Enter Valid Mobile Number' : ''}
              onBlur={(event) => ValidateMobileNo(event.target.value)}
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              error={mobilenovaidate}
            />
          </div>
          <div className='row_2'>
            <TextField
              id='city'
              label='City'
              name='city'
              value={city}
              onChange={(event) => setcity(event.target.value)}
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
                value={selectedCategoryID}
                label='Category'
                name='category'
                onChange={handleCategoryChange}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {category.map((obj) => {
                  return <MenuItem value={obj.category_id}>{obj.category_name}</MenuItem>;
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
              id='email'
              label='E-Mail'
              name='email'
              value={email}
              onChange={(event) => {
                setemail(event.target.value);
                setEmailCheck(false);
              }}
              helperText={emailvaidate ? 'Enter Valid Email Address' : ''}
              onBlur={(event) => ValidateEmail(event.target.value)}
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              error={emailvaidate}
            />
          </div>
          <div className='row_2'>
            <TextField
              id='state'
              label='State'
              name='state'
              value={state}
              onChange={(event) => setstate(event.target.value)}
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className='row_3'>
            <FormControl sx={{ minWidth: 170 }} size='small'>
              <InputLabel>Source</InputLabel>
              <Select
                style={{ width: '225px' }}
                id='source'
                align='left'
                size='small'
                defaultValue=''
                name='source'
                value={selectedSourceID}
                label='Source'
                onChange={handleSourceChange}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {source.map((obj) => {
                  return <MenuItem value={obj.source_id}>{obj.source_name}</MenuItem>;
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
              name='website'
              value={website}
              onChange={(event) => {
                setwebsite(event.target.value);
                setWebsiteCheck(false);
              }}
              helperText={websitevaidate ? 'Enter Valid Website URL' : ''}
              onBlur={(event) => ValidateWebsite(event.target.value)}
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              error={websitevaidate}
            />
          </div>
          <div className='row_2'>
            <TextField
              id='pincode'
              label='Pincode'
              name='pincode'
              value={pincode}
              onChange={(event) => setpincode(event.target.value)}
              variant='outlined'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            {/* <Autocomplete
        multiple
        id="tags-outlined"
       options={tag}
       getOptionLabel={(option) => option.tag_name}
      //  options={tag.map((option) => option.tag_name)}
   // value={tag}
      onChange={(e) => settagname(e.target.value)}
       // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
          style={{width:"225px" }}
            {...params}
            label="Tag"
            //placeholder="Favorites"
          />
        )}
      /> */}
          </div>
        </div>
        <br></br>
        <br></br>
        {/* //cancel button */}
        <div className='row'>
          <div className='button'>
            <div className='button_1'>
              <Button size='small' variant='outlined' id='cancel'>
                Cancel
              </Button>
            </div>
            {/* //save button */}
            <div className='button_2'>
              <Button size='small' variant='contained' id='save' onClick={handleSubmit}>
                Save
              </Button>
              <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity='success'>
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
  );
};
//export function
export default Individual;
