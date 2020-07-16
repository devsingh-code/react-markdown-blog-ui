import React,{useState} from 'react';
import {Header,Divider,Container, Image, Button,Modal} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import {authAxios} from '../services'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useParams, withRouter, NavLink} from 'react-router-dom';
import {api} from '../api';
import {useFetch} from '../helpers';
import {history} from "../helpers";
import Renderer from 'markdown-it/lib/renderer';


const DeleteModal = ({title,postSlug,thumbnail}) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    function handleSubmit() {
       
        setLoading(true);

        authAxios
            .delete(api.posts.delete(postSlug))
            .then(res => {
                setLoading(false);
                history.push('/')
            })
            .catch(err => {
                setLoading(false);
                setError(err.message || err)
            })
    }

    const [open,toggle] = useState(false);
    
        return (
        <Modal
            trigger={<Button onClick={() =>toggle(true)} secondary floated="right">Delete Post</Button>}
            open={open}
            onClose={() =>toggle(false)}
            size='small'
        >
        <Modal.Header>Delete this Post</Modal.Header>
            <Modal.Content image>
            <Image wrapped size='medium' src={thumbnail} />
            <Modal.Description>
                <Header>{title}</Header>
                {error && (
                    <Message negative message={error} />
                )}
                <p>
                Are you sure, you want to delete this post?
                </p>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() =>toggle(false)}>
                    No
                </Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Confirm Delete"
                    onClick={handleSubmit}
                    loading ={loading}
                    disabled ={loading}
                />
          </Modal.Actions>
        </Modal>
        )
    }

    const Blockquote =(props)=>{
        return (
            <blockquote>
            {props.value ? props.value:props.children}
            </blockquote>
        )

    }

    const Renderers ={
        blockquote: Blockquote
    }

const PostDetail = () =>{
    
    const {postSlug} = useParams()
    const {data,loading,error} = useFetch(api.posts.retrieve(postSlug))
    
    
    return(
        <Container text style={{ paddingTop: 10, paddingBottom:10}}>
        {error && <Message negative message={error} />}
        {loading && <Loader/>}
        {data && (
            <div>
            <Image src={data.thumbnail}/>
            <Header as="h1">
            {data.title}
            </Header>
            <small> Last Updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</small>
            <ReactMarkdown source={data.content} renderers = {Renderers}  />   
            <Divider/>

            {data.is_author &&(
                <>
                <NavLink to={`/posts/${postSlug}/update`}>
                <Button color="orange">
                    Update 
                </Button>
                </NavLink>
                <DeleteModal postSlug={postSlug} title = {data.title} thumbnail = {data.thumbnail}/>
                    </>
            )}

            

            </div>
        )}
        
        </Container>
    )
}

export default withRouter(PostDetail);