import React from 'react'
import Posts from './Posts'

const PostList = ({postList}) => {
  return (
    <>
    {
        postList.map((post)=>(
            <Posts post={post} key={post._id} />
        ))
    }
      
    </>
  )
}

export default PostList
