'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from '@components/Profile'

const Myprofile = () => {

    const {data:session} = useSession()
    const [allPosts, setAllPosts] = useState([])
    const router = useRouter()

    console.log(session)

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirm = confirm('Are you sure?')
        if(hasConfirm){
            try {
                await fetch(`/api/prompt/${post._id}`,{
                    method:'DELETE'
                })
                const filterPosts = allPosts.filter(p=>{
                    return p._id !== post._id
                })
                setAllPosts(filterPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/user/${session?.id}/posts`)
            const data = await response.json()
        
            setAllPosts(data)
          }
          
        if(session?.id) fetchPosts()
      },[])

  return (
    <Profile
    name='My'
    desc='Welcome to your profile'
    data={allPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default Myprofile