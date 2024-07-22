'use client'
import { logout } from '@/actions/auth'
import React from 'react'
import { useFormState } from 'react-dom'

function Logoutbtn() {
    const [state, action ] = useFormState(logout , null)
  return (
    <form action={action} className='mt-auto text-center p-4 text-red-500 hover:text-red-700'>
        <button type='submit' className=''>
        Deconnexion
        </button>
    </form>
  )
}

export default Logoutbtn