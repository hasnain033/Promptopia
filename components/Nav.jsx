
"use client";

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react' 
const Nav = () => {
    const {data:session} = useSession()
    const [Provider, setProvider] = useState(null)
    const [dropdown, setdropdown] = useState(false)

    useEffect(()=>{
        const setOutProvider = async () =>{
            const response = await getProviders()
            setProvider(response)
        }
        setOutProvider()
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image width={30} height={30} src='/assets/images/logo.svg' alt='logo'/>
        <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Destop navigation */}

        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                        Create Prompt
                    </Link>
                    <button type='button' onClick={signOut} className='outline_btn'>SignOut</button>
                    <button>
                        <Link href='/profile'>
                            <Image src={session?.user.image} width={37} height={37} className='rounded-full'
                            alt='profile'/>
                        </Link>
                    </button>

                </div>
            ): (
                <>
                {
                    Provider && Object.values(Provider).map(Provider=>{
                        return (
                            <button type='button'
                            key={Provider.name}
                            className='black_btn'
                            onClick={()=> signIn(Provider.id)}>
                                Sign In
                            </button>
                        )
                    })
                }
                </>
            )
          }
        </div>

        {/* Mobile navigation */}

        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
            <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full'
            alt='profile' onClick={()=>setdropdown(prev=>!prev)}/>
            {dropdown && (
                <div className='dropdown'>
                    <Link href='/profile' className='dropdown_link' onClick={()=> setdropdown(false)}>
                        My Profile
                    </Link>
                    <Link href='/create-prompt' className='dropdown_link' onClick={()=> setdropdown(false)}>
                        Create Prompt
                    </Link>
                    <button type='button' className='mt-5 w-full black_btn' onClick={()=>{
                        setdropdown(false)
                        signOut()
                    }}>Sign Out</button>
                </div>
            )}
                </div>
            ):(
                Provider && Object.values(Provider).map(Provider=>{
                    return (
                        <button type='button'
                        key={Provider.name}
                        className='black_btn'
                        >
                            Sign In
                        </button>
                    )
                })
            )}
        </div>
    </nav>
  )
}

export default Nav