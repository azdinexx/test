'use client'
import { ajouter_produit } from '@/actions/demande'
import { LoadingLoop } from '@/components/icons/Loading'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast, Toaster } from 'sonner'

function AjouterProduitForm({
    id
}:{
    id : string
}) {
    const [state , action] = useFormState(ajouter_produit, null)
    const {pending} = useFormStatus()
    const router = useRouter()

    useEffect(() => {
        if(state?.success){
            toast.success(state.success)
            router.refresh()
        }
    }, [state, router])
  return (
    <>
    {
        state?.error && <div className='text-red-500 text-center mt-3'>{state.error}</div>
    }
    <form action={action} className='py-3 mb-3 flex gap-4 text-sm items-center bg-blue-50/70 p-4 rounded-md mt-3'>
    <label htmlFor="name">Nom</label>
    <input type="text" name='name' className='border rounded-md w-full p-2 ' />
    <label htmlFor="quantity">Quantite</label>
    <input type="number" name='quantity' defaultValue={1} className='w-14 border rounded-md p-2' />
    <button className=' bg-blue-500 text-white p-2 rounded-md '>
        {
          pending ? <LoadingLoop/> : 'Ajouter'
        }
    </button>
    <input type="hidden" name="demande_id" value={id} />
</form>
<Toaster richColors position='top-center'/>
        </>
  )
}

export default AjouterProduitForm