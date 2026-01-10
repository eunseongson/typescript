import React from 'react'
import {
    SyncLoader
} from 'react-spinners'

const Loading = () => {
    return (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <SyncLoader size="15" color='green' />
        </div>
    )
}

export default Loading