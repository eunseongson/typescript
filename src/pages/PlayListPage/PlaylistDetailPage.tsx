import React from 'react'
import { useParams } from 'react-router'

const PlaylistDetailPage = () => {
    const { id } = useParams()
    return (
        <div>플레이리스트 id : {id}</div>
    )
}

export default PlaylistDetailPage