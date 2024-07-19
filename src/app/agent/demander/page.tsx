import Retour from '@/components/retour'
import React from 'react'
import { redirect } from 'next/navigation'
import CreateDemandeForm from './CreateDemandeForm'
import { HelpIcon } from '@/components/icons/Help'
import { useFormState } from 'react-dom'
import AjouProduit from './AjouProduit'



function page({
    searchParams,
  }: {
    searchParams: {
        step : string ,
        title : string,
        description : string,
        id : string
    }
  }) {
    if(searchParams.step == null){
        redirect('?step=creer')
    }

  return (
    <div className='w-full h-full flex-grow flex'>
        <section className='w-full max-w-lg bg-white p-4 flex flex-col gap-4'>
        <Retour/>
        <h1 className='text-xl font-semibold'>Demander une démo</h1>
        <CreateDemandeForm
        status={searchParams.step == 'creer' ? 'creer' : 'voir'}
        title={searchParams.title || undefined}
        description={searchParams.description || undefined}
        />
        </section>
        <section className='w-full '>
            {
                searchParams.step === 'creer' && (
                    <div className='w-full h-full flex gap-2 justify-center items-center'>
                        <HelpIcon className='w-10 h-10 text-gray-500'/>
                        <h1 className='text-3xl text-gray-500'>Creer une demande
                        </h1>
                    </div>)
            }
            {
                searchParams.step === 'ajouter-produit' && <AjouProduit id={searchParams.id}/>
            }
        </section>
    </div>
  )
  
}

export default page