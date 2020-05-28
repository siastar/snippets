import React from 'react'
const MessageAlert = (props) =>{
    return(
        <div className={props.status === 204 ? 
            'alert alert-success alert-highlighted alerttimeout' :
            props.status === 500 ?
            'alert alert-danger alert-highlighted alerttimeout' :
            'alerttimeout hide'} role="alert">
                    {   props.status === 204 ? 
                        props.successMessage:
                        props.status === 500 ?
                        props.errorMessage:
                        ''
                     }
        </div>
    )
}

export default MessageAlert;