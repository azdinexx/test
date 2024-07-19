'use client'
import React from 'react'
import { ChevronBackOutline } from './icons/chevronBack'
import { useRouter } from 'next/navigation'

function Retour() {
  const router = useRouter()

  return (
    <button className='font-semibold text-blue-500 flex items-center gap-1 '
    onClick={()=>router.back()}
    >
        <ChevronBackOutline
        
        />
        Retour
    </button>
  )
}

export default Retour