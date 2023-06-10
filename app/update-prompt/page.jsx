"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Form from '@components/Form'

const EditPrompt = () => {

    const [submitting, setIsSubmitting] = useState(false)
    const [post, setPost] = useState({prompt:'',tag:''})
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter()


    useEffect(()=>{
        const getPromptDetail = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag:data.tag
            })
        }
        if(promptId) getPromptDetail()
    },[promptId])

    const updatePrompt = async (e) =>{
        e.preventDefault()
        setIsSubmitting(true)

        if(!promptId) return alert('Prompt ID is not found')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt