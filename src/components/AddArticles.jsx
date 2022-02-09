import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React,{useState , useRef} from 'react'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {db, storage} from './../firebaseConfig';
import { toast } from 'react-toastify';

function AddArticles() {
  const imageRef = useRef();

  const [formData , setFormData] = useState({
    title:'',
    description : '',
    image:'',
    createdAt : Timestamp.now().toDate()
  })

  const [progress , setProgress] = useState(0)

  function handleChange(e){
    setFormData({...formData , [e.target.name] : e.target.value})
  }

  function handleImageChange(e){
    setFormData({...formData , image:e.target.files[0]})
    console.log('4534')
    console.log(formData.image)
  }

  function handlePublish(){
    if(!formData.title || !formData.description || !formData.image){
      console.log(formData.image)
      alert('please fill all the fields');
      return ;
    }

    const storageRef = ref(storage , `/images/${Date.now()}${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef , formData.image);
    uploadImage.on('state_changed',(snapshot)=>{
      const progressPercent = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
      setProgress(progressPercent)
    }, err => {
      console.log(err)
    },()=>{
      setFormData({
        title:'',
        description:'',
        image:'',
      })
      imageRef.current.value = ''
      getDownloadURL(uploadImage.snapshot.ref)
      .then(url=>{
        const articleRef = collection(db,'articles');
        addDoc(articleRef , {
          title:formData.title,
          description:formData.description,
          imageUrl:url,
          createdAt:Timestamp.now().toDate()
        })
        .then(()=>{
          toast('article added successfully',{type:'success'})
          setProgress(0)
        })
        .catch(err=>{
          toast('Error in adding articles',{type:'error'})
        })
      })
    })
  }

  return (
    <div style={{ position: 'fixed' }} className='border p-3 mt-3 bg-light'>
      <h2>Create article</h2>
      <label>Title</label>
      <input onChange={e => handleChange(e)} value type='text' name='title' value={formData.title} className='form-control' />
      <label>Description</label>
      <textarea onChange={e => handleChange(e)} value={formData.description} name='description' className='form-control'></textarea>
      <label>Image</label>
      <input onChange={e=>handleImageChange(e)} ref={imageRef} type='file' name='image' accept='image/*' className='form-control' />
      { progress ===0 ? null : (
      <div className='progress'>
        <div className='progress-bar progress-bar-striped mt-2' style={{width:`${progress}%`}}>
          {progress}%
        </div>
      </div>
      )}
      <button onClick={handlePublish} className='form-control btn btn-primary mt-2'>
        Publish
      </button>
    
    </div>
  )
}

export default AddArticles