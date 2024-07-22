'use server'
import { db } from "@/lib/db"
import { getUserId } from "@/lib/session"
import { redirect } from "next/navigation"


export async  function initialiser_demande( state : any , formData : FormData){
    const title = formData.get('title')
    const description = formData.get('description')

    if(!title || !description ){
        return {
            error : 'Veuillez remplir tous les champs'
        }
    }


    const created_demande = await db.demande.create({
        data : {
            title : title as string,
            description : description as string,
            status: 'EN_ATTENTE', // Add the status property here
            service: {
                connect : {
                    id : 'e0df6e3d-5a23-42c1-80c5-a8c2626d8f27'
                }
            }
        }
    })
    

    return redirect('/agent/demander?step=ajouter-produit&id='+created_demande.id+'&title='+title+'&description='+description)
}   

export async function ajouter_produit(state : any , formData : FormData){
    const name = formData.get('name')
    const quantite = formData.get('quantity')
    const demande_id = formData.get('demande_id')
    console.log(name, quantite, demande_id)

    if(!name || !quantite || !demande_id){
        return {
            error : 'Veuillez remplir tous les champs'
        }
    }

    const new_produit = await db.produit.create({
        data : {
            name : name as string,
            quantity : parseInt(quantite as string),
            demande : {
                connect : {
                    id : demande_id as string
                }
            }
        }
    })

    if(!new_produit){
        return {
            error : 'Une erreur est survenue lors de l\'ajout du produit'
        }
    }

    return {
        success : 'Produit ajouté avec succès'
    }
}


export async function get_demande_products(id : string){
    const produits =  await db.produit.findMany({
        where : {
            demande : {
                id
            }
        }
    })

    if(!produits){
        return []
    }

    return produits
}

export async function remove_produit(state : any , formData : FormData){
    const produit_id = formData.get('produit_id')

    if(!produit_id){
        return {
            error : 'Une erreur est survenue lors de la suppression du produit'
        }
    }

    const deleted_produit = await db.produit.delete({
        where : {
            id : produit_id as string
        }
    })

    if(!deleted_produit){
        return {
            error : 'Une erreur est survenue lors de la suppression du produit'
        }
    }

    return {
        success : 'Produit supprimé avec succès'
    }
}

export async function getUserDemandes(){
    const user_id = await getUserId()
    if(!user_id){
        console.log('No user id')
        return []
    }

    const mes_demandes = await db.demande.findMany({
        include : {
            user : true
        },
    })

    return mes_demandes || []
}