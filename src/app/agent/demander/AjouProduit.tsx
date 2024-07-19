import { Delete } from '@/components/icons/remove'
import React from 'react'
import AjouterProduitForm from './AjouterProduitForm'
import { get_demande_products } from '@/actions/demande'
import DeleteProduct from './DeleteProduct'

async function AjouProduit({
    id
    }: {
    id: string
}) {
    const produits = await get_demande_products(id)
  return (
    <>
    <div className='max-w-xl mx-auto mt-24 rounded-md shadow-sm border bg-white px-10 py-14'>
        <h1 className='text-xl font-semibold'>Ajout de Produit</h1>
        <AjouterProduitForm id={id}/>

        <ul className='flex flex-col '>
            <li className='py-2 font-bold '>Produits</li>
            
            {
                produits.length === 0 ? 
                <li className='p-10 text-center'>
                <p>
                    Aucun produit
                </p>
            </li>
                :
                produits.map((produit, index) => {
                    return <Produit id={produit.id} title={produit.name} quantity={produit.quantity} key={index} last={index === produits.length - 1}/>
                })
            }
        </ul>
    </div>
    
    </>
  )
}

export default AjouProduit


const Produit = ({
    last=false,
    title ,
    quantity,
    id
}:{
    last : boolean,
    title : string,
    quantity : number
    id : string
}) => {
    return  <li className={'grid grid-cols-5 py-2 border-gray-100 ' + ( last ? '': 'border-b')}>
    <div>
        <DeleteProduct id={id}/>
    </div>
    <div className=' col-span-3'>
        {title}
    </div>
    <div className='text-right'>
        {quantity}
    </div>
</li>
}
