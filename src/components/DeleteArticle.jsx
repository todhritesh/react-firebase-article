import { deleteDoc , doc } from 'firebase/firestore'
import { deleteObject , ref } from 'firebase/storage';
import {db , storage} from './../firebaseConfig'
import React from 'react'
import { toast } from 'react-toastify';

function DeleteArticle({id , imageUrl}) {
    const handleDelete = async ()=>{
        try {
            await deleteDoc(doc(db,'articles',id));
            toast('Article deleted successfully',{type:'success'});
            const storageRef = ref(storage , imageUrl);
            await deleteObject(storageRef);
        }catch(error){
            toast("Error deleting article" , {type:'error'})
            console.log(error)
        }
    }
  return (
    <div>
        <button className='btn btn-danger' onClick={handleDelete}>
            Delete
        </button>
    </div>
  )
}

export default DeleteArticle