import React, { useRef, useState, useEffect } from 'react'
//import { liveApi } from '../service/network'
// import { S3FileData } from '../pages/Auth/Register'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { getApi,liveApi } from "./Customer.service";
import { login } from '../service/Customer.service';

// export interface S3FileData {
//     media_id: string;
//     media_key: string;
// }

export const defaultS3Data = {
    media_id: "",
    media_key: "",
} 


//  export const DocumentUploaderProps = { 
//     title: string,
//    onDocumentUploaded: React.Dispatch<React.SetStateAction<S3FileData>>
//  } 

 const ProfilePhotoUploader = ({ title, onDocumentUploaded }) => {
//     const fileChoose1 = useRef<HTMLInputElement>(null)
const fileChoose1 =useRef();
    const [progress, setProgress] = useState(0)
    const [stage, setStage] = useState("init")



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



    //const [stage, setStage] = useState();
    //const [fileChoose1, setFilechoose] = useState();
    const api = liveApi()

    const onFileChoose = async () => {
        setProgress(0);
        //setFilechoose();
        setStage('uploading')
        if (fileChoose1.current?.files) {
            try {
                let data = await uploadImage(fileChoose1.current?.files[0])
                if (data !== null && data.media_id) {
                    onDocumentUploaded({
                        media_id: data.media_id,
                        media_key: data.media_key
                    })
                    // setS3Url(data.s3_url + data.media_key)
                    // setMediaId(data.media_id)
                    //  setMediaKey(data.media_key)
                    setStage('uploaded')

                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const uploadImage = async (file) => {
        return new Promise(async (resolve, reject) => {
            api.post("/doc_upload/", {
                content_type: file.type,
                //uuid: localStorage.getItem("uuid")
            })
                .then(res => {
                    console.log('upload======>', JSON.stringify(res));
                    const formData = new FormData();
                    Object.keys(res.data.data.fields).forEach(key => {
                        formData.append(key, res.data.data.fields[key]);
                    });
                    formData.append("file", file)
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", res.data.data.url, true);
                    xhr.onload = function () {
                        console.log(this.status);
                        if (this.status === 204) {
                            console.log('upload success', res.data.data.media_key);

                            resolve(res.data);
                        } else {
                            console.log('upload failed')
                            reject(null);
                        }
                    };
                    xhr.upload.onprogress = function (evt) {
                        setProgress(Math.round((evt.loaded / evt.total) * 100))
                    }
                    // xhr.setRequestHeader('Content-type', 'multipart/form-data');
                    xhr.send(formData);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
    useEffect(() => {

        loginUser();
      }, []
      )
    return (
        <>

            <div style={{ visibility:'hidden',opacity:0 }} className="fvpropichidebt">
                <input type="file"
                    ref={fileChoose1}
                    onChange={onFileChoose}
                    accept=".jpg,.png,.jpeg,.gif"
                />
            </div>
           
            {stage === 'init' &&
                <div className='emp_pro_upload' onClick={() => fileChoose1.current?.click()}>
                    <AddAPhotoIcon   />
                </div>
            }
            {stage === 'uploading' &&
                <div className='emp_pro_upload' style={{ visibility: 'visible' }}>

                    <div className='text-align-center'>
                        <p style={{
                            fontSize: '23px',
                            marginTop: '18px',
                            color: 'greenyellow'
                        }}>
                            <b>{progress}%</b>
                        </p>
                    </div>
                </div>
            }
            {stage === 'uploaded' &&
                <div className='emp_pro_upload' onClick={() => fileChoose1.current?.click()}>
                    <AddAPhotoIcon />
                </div>
            }
         
        </>
    )

        }
export default ProfilePhotoUploader