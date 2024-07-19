'use server';
import { connectMSSQL } from '@/utils/db';

export async function getClients() {
  try {
    const pool = await connectMSSQL();
    if (!pool) {
      throw new Error('pool is not defined');
    }
    const result = await pool.query(
      'SELECT CT_Intitule , CT_Classement , CT_Pays ,CT_Type, CT_Ville , CT_NumPayeur ,  CT_Adresse , CT_Num , CG_NumPrinc  FROM F_Comptet WHERE CT_Type = 0 ;'
    );
    // CT_Intitule , CT_Classement , CT_Pays , CT_Ville , CT_NumPayeur , CT_CodePostal , CT_Adresse , CT_Num , CG_NumPrinc , CT_CodePostal
    const clients = result.recordset;

    return clients;
  } catch (error) {
    return null;
  }
}
