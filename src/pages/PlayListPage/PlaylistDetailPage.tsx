import React from 'react'
import { useParams } from 'react-router'
import { useGetPlaylist } from '../../hooks/useGetPlaylist'
import ErrorMessage from '../../common/components/ErrorMessage'
import Loading from '../../common/components/Loading'

const PlaylistDetailPage = () => {
    const { id } = useParams()
    const {data, isLoading, error} = useGetPlaylist({playlist_id: id || ''})
    if(error) return <ErrorMessage errorMessage={error.message} />
    if(isLoading) return <Loading />

    console.log("data : ", data)
    return (
        <div>플레이리스트 id : {id}</div>
    )
}

export default PlaylistDetailPage