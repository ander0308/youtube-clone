import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"
import zIndex from "@mui/material/styles/zIndex"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(103deg, rgba(32,167,151,1) 0%, rgba(225,39,36,1) 0%, rgba(40,49,55,1) 90%, rgba(28,61,74,1) 100%)',
          zIndex: 10,
          height: '300px'
        }} />
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr: { sm: '100px' }}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail