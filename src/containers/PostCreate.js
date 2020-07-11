import React, {useRef, useState} from 'react';
import {Header, Button, Form } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import Message from '../components/Message';
import axios from 'axios';
import {history} from "../helpers";
import {api} from "../api";


const PostCreate = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [title,setTitle] = useState(null);
    const [markdown, setMarkdown] = useState(null);
    const [thumbnail, setThumbnail] = useState(null)

    const fileInputRef = useRef()

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", markdown)
        console.log(formData);
        axios
            .post(api.posts.create, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Token 3c64107636c7c391802fb2e3c6a3c8a978fb7c33"
                }
            })
            .then(res => {
                console.log(res)
                setLoading(false);
                history.push('/')
                // redirect back to the post list
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                setError(err.message || err)
            })
        
    }

    return(
        <div>
        <Header>Create a Post</Header>
        {error && (
            <Message danger message={error} />
        )}
        {thumbnail && <Message info message={`Selected Image: ${thumbnail.name}`} />}
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Title</label>
                <input
                 placeholder='Title of Blog' 
                 value={title} 
                 onChange={e => setTitle(e.target.value)}

                 />
            </Form.Field>
            <Form.TextArea 
                label='Content' 
                placeholder='This is your post content' 
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                />
            
            <Form.Field>
            
                <Button 
                    type = "button"
                    fluid
                    content='Choose a Thumbnail' 
                    labelPosition="left" 
                    icon='file'
                    onClick={()=>fileInputRef.current.click()}
                />
                <input 
                    ref={fileInputRef} 
                    type='file'    
                    hidden
                    onChange={e => setThumbnail(e.target.files[0])}
                    />
            </Form.Field>
            <Button primary fluid loading ={loading} disabled={loading}  type='submit'>Submit</Button>
        </Form>
        </div>
    )
}




export default withRouter(PostCreate);