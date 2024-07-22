import { getUserDemandes } from '@/actions/demande'
import { Demande, User } from '@prisma/client'
import React from 'react'


async function TableDemande(
) {

    const demandes = await getUserDemandes()


  return (
    <section className='px-10 divide-y'>
        <TableHeader />
        <div className='flex flex-col overflow-y-scroll'>

        {
            demandes.map((demande , index) => (
                <ul key={index} className='grid grid-cols-12 gap-1'>
                    <li className='p-2 col-span-2'>
                        {demande.createdAt.toDateString()}
                    </li>
                    <li className='p-2 col-span-4'>
                        {demande.title}
                    </li>
                    <li className='p-2 col-span-3'>
                        {demande?.user?.firstName} {demande?.user?.lastName}
                    </li>
                    <li className='p-2 col-span-2'>
                        {demande.status}
                    </li>
                    <li className='p-2'>
                        {
                            
                            Math.floor((new Date().getTime() - demande.createdAt.getTime()) / 1000 / 60 / 60 / 24) + ' jours'
                        }
                    </li>
                </ul>
            ))
        }
        </div>
    </section>
  )
}

export default TableDemande

function TableHeader() {
    return <ul className='grid grid-cols-12 bg-gray-200  rounded-md' >
        <li className='p-2 hover:bg-gray-300/50 cursor-pointer col-span-2'>
            Date de demande
        </li>
        <li className='p-2 hover:bg-gray-300/50 cursor-pointer col-span-4'>
            Titre
        </li>
        <li className='p-2 hover:bg-gray-300/50 cursor-pointer col-span-3'>
            Demandeur
        </li>
        <li className='p-2 hover:bg-gray-300/50 cursor-pointer col-span-2'>
            Status
        </li>
        <li className='p-2 hover:bg-gray-300/50 cursor-pointer '>
            Latency
        </li>

    </ul>
}