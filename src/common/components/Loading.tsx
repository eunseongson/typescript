import React from 'react'
import {
    SyncLoader
} from 'react-spinners'

const Loading = () => {
    return (
        <div style={{ marginTop: '20px' }}>
            <SyncLoader size="15" color='green' />
        </div>
    )
}

export default Loading