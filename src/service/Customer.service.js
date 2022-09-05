import axios from "axios";

 export const login = (email, password) => {
    const config = {
      method: 'post',
      url: 'https://ipssapi.techgenzi.com/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": email,
        "password": password
      },
    };
  
    return axios(config);
  
  };
  //getall method
export const getAllCustomer = (token, pageNumber = 0) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer/?paged=' + pageNumber +' &results_per_page=1000 ',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return axios(config);

};
  //add individual customer
export const addNewIndividual = (token,individual={}) => {
  const config = {
    method: 'post',
    url: 'https://ipssapi.techgenzi.com/customer/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: individual
  };
//console.log(info);
  return axios(config);

};
  //add organization customer
  export const addNewOrganization = (token,organization={}) => {
    const config = {
      method: 'post',
      url: 'https://ipssapi.techgenzi.com/customer/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: organization
    };
  //console.log(info);
    return axios(config);
  
  };
//getall for  organization

export const getAllOrganization= (token) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
   
  };

  return axios(config);
};
//getall for  category

export const getAllCategory= (token) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer_category/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
   
  };

  return axios(config);
};
//getall for  source

export const getAllSource= (token) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer_source/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
   
  };

  return axios(config);
};
//getall for  tag

export const getAllTag= (token) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer_tag/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
   
  };

  return axios(config);
};
//for delete the data 
export const deleteCustomer = (token, customer_id) => {
  const config = {
    method: 'delete',
    url: 'https://ipssapi.techgenzi.com/customer/' + customer_id +'/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return axios(config);

};
//for get the data 
export const getCustomer = (token, customer_id) => {
  const config = {
    method: 'get',
    url: 'https://ipssapi.techgenzi.com/customer/' + customer_id +'/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return axios(config);

};
//for update the data 
export const UpdateIndividual = (token,individual={},customer_id) => {
  const config = {
    method: 'patch',
    url: 'https://ipssapi.techgenzi.com/customer/' + customer_id +'/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data:individual,
  };

  return axios(config);

};
//for update the data 
export const UpdateOrganization = (token,organization={},customer_id) => {
  const config = {
    method: 'patch',
    url: 'https://ipssapi.techgenzi.com/customer/' + customer_id +'/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data:organization,
  };

  return axios(config);

};
//get api for image upload
export const getApi = () => (
  axios.create({       
      baseURL: "https://ipssapi.techgenzi.com/",
      headers: {
          'Accept': 'application/json'
      }
  })
)
//create image upload 
export const liveApi = () => (
  axios.create({       
     baseURL:'https://ipssapi.techgenzi.com/',
      headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ipss_access_token')}`
      }
  })
)
