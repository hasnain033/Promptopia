"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Form from '@components/Form'

const createPrompt = () => {

    const [submitting, setIsSubmitting] = useState(false)
    const [post, setPost] = useState({page:'',tag:''})

    const {data : session} = useSession()
    const router = useRouter()
    console.log(session)

    const createPrompt = async (e) =>{
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId:session.id,
                    tag:post.tag
                })
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }
  return (
    <Form
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default createPrompt