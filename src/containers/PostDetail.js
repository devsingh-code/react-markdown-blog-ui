import React from 'react';
import {Header,Container, Image} from 'semantic-ui-react';



import Loader from '../components/Loader';
import Message from '../components/Message';
import {useParams } from 'react-router-dom';
import {api} from '../api';
import {useFetch} from '../helpers';

const PostDetail = () =>{
    
    const {postSlug} = useParams()
    const {data,loading,error} = useFetch(api.posts.retrieve(postSlug))
    
    
    return(
        <Container text>
        {error && <Message negative message={error} />}
        {loading && <Loader/>}
        {data && (
            <div>
            <Image src={data.thumbnail}/>
            <Header as="h1">
            {data.title}
            </Header>
            <small> Last Updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</small>
                <p>
                    {data.content}
                </p>
           
            </div>
        )}
        
        </Container>
    )
}

export default PostDetail;