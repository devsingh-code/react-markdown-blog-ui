import React from 'react';
import {Image, Segment, Dimmer, Loader} from 'semantic-ui-react';




export default () =>{
    return(
        <Segment>
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}

