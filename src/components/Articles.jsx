import React,{useState , useEffect} from 'react'
import {collection, query, orderBy , onSnapshot} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import DeleteArticle from './DeleteArticle';

function Articles() {
    const [articles , setArticles] = useState([])
    useEffect(()=>{
        const articleRef = collection(db,'articles');
        const q = query(articleRef , orderBy('createdAt','desc'));
        onSnapshot(q,(snapshot)=>{
            const articles = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setArticles(articles)
            console.log(articles)
        });
    },[])

  return (
    <div>
        {
            articles.length === 0 ? (
                <p>no articles found</p>
            ) : (
                articles.map(({id , title, description , imageUrl ,createdAt}) => (

                <div key={id} className='border mt-3 p-3 bg-light'>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={imageUrl} alt={title} className='img-fluid' />
                        </div>
                        <div className='col-8'>
                            <h3>
                                {title}
                            </h3>
                            <p>{createdAt.toDate().toDateString()}</p>
                            <h5>{description}</h5>
                            <DeleteArticle id={id} imageUrl={imageUrl} />
                        </div>
                    </div>
                </div>
                ))
            )
        }
    </div>
  )
}

export default Articles