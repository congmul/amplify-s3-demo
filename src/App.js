import './App.css';
import React, { useState, useEffect } from 'react';

// import { withAuthenticator } from 'aws-amplify-react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function App() {
  const [ imgFile, setImgFile ] = useState({
    fileUrl: '',
    file: '',
    fileName: ''
  })

  const [ fileUrl, setFileUrl ] = useState({ fileUrl: ''});
  useEffect(() => {
    Storage.get('JJH (1).jpeg')
    .then(data => {
      setFileUrl({ fileUrl: data});
    })
  }, [])
  const handleCange = e => {
    const file = e.target.files[0];
    console.log(file.name);
    setImgFile({
      fileUrl: URL.createObjectURL(file),
      file,
      fileName: file.name
    })
  }
  const saveFile = () =>{
    Storage.put(imgFile.fileName, imgFile.file)
    .then(() => {
      console.log('successfully stored')
      setImgFile({
        fileUrl: '',
        file: '',
        fileName: ''
      })
    })
    .catch(err => {
      console.log('err', err);
    })
  }
  return (<>
    <div className="App">
      <AmplifySignOut />
      <input type='file' onChange={handleCange} />
      <img src={imgFile.fileUrl} alt="myimg"/>
      <button onClick={saveFile}>Save</button>
    </div>
    <img src={fileUrl.fileUrl} />
    </>
  );
}

export default withAuthenticator(App);
