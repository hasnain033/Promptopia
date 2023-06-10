'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@components/Profile"

const UserProfile = ({params}) => {
    
    // console.log(params)
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')

    const [UserPost, setUserPost] = useState([])

    useEffect(()=>{
        // console.log('in effect')
        const fetchPosts = async () => {
            const response =  await fetch(`/api/user/${params?.id}/posts`)
            const data = await response.json()
            // console.log(data)

            setUserPost(data)
        }
        
        if(params.id){
            fetchPosts()
        }
    },[params.id])

    return (
        <Profile
        name={userName}
        desc= {`Welcome to ${userName} profile`}
        data={UserPost}
        />
    )
}

export default UserProfile;