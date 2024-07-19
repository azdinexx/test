'use client'
import { initialiser_demande } from '@/actions/demande'
import React from 'react'
import { useFormState } from 'react-dom'

type Props = {
  status : 'creer' | 'voir'
  title? : string
  description? : string
}
function CreateDemandeForm({
  status = 'creer',
  title,
  description
}:Props) {
  const [state , action] = useFormState(initialiser_demande , null)

  return (
    <form action={action} className='flex flex-col gap-2'>
      {
        state?.error && <div className='bg-red-500 text-white p-2 rounded-md'>
          {state?.error}
        </div>
      }
      
        <label htmlFor="title">titre de demande</label>
        <input type="text" name="title" id="title" className='bg-gray-50 p-2 w-full border'
        defaultValue={title ? title : ''}
        disabled={status === 'voir'}
        />
        <label htmlFor="description">description</label>
        <textarea name="description"
        defaultValue={description ? description : ''}
        disabled={status === 'voir'}
        id="description" cols={30} rows={10} className='bg-gray-50 p-2 text-gray-500 border resize-none'></textarea>
        <button type='submit'
        disabled={status === 'voir'}
        className='bg-blue-500 disabled:bg-blue-100  w-full p-2 rounded-md text-white'>
            Creer
        </button>
    </form>
  )
}

export default CreateDemandeForm