'use server';
import {
  NouveauClientFormState,
  NouveauCrmClientFormSchema,
  SupprimerCrmClientFormState,
  SupprimerCrmClientSchema,
  Type_of_client_type,
  canal_type,
} from '@/lib/crm_definitions';
import { db } from '@/lib/db';
import { getUserId } from '@/lib/session';
import { createDate } from './crm-opportunite';
import { client } from '@prisma/client';

export async function create_crm_client(
  state: NouveauClientFormState,
  formData: FormData
) {
  const validatedFields = NouveauCrmClientFormSchema.safeParse({
    Raison_Social: formData.get('nom'),
    personne_a_contacter: formData.get('personne_a_contacter'),
    fonction: formData.get('fonction'),
    Type_Cli: formData.get('type'),
    Email_Cli: formData.get('email'),
    Tel_Cli: formData.get('telephone'),
    SiteWeb: formData.get('website'),
    Adresse: formData.get('adresse'),
    Ville_Cli: formData.get('ville'),
    code_postal: formData.get('codePostal'),
    canal: formData.get('canal'),
    autre_canal: formData.get('autre_canal'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const iduser = await getUserId();
  if (!iduser) {
    return {
      message: 'Impossible de créer le client. Veuillez réessayer.',
    };
  }
  const {
    nom,
    personne_a_contacter,
    type,
    email,
    telephone,
    adresse,
    ville,
    SiteWeb,
    fonction,
    canal,
  } = validatedFields.data;

  const type_client_id = await get_type_client_id(type);
  if (!type_client_id)
    return {
      message: 'type of client is defined',
    };

  const canalID = await create_canal(canal);

  if (!canalID)
    return {
      message: 'the problem is in canal',
    };

  // Call the provider or db to create a crm client...
  const crm_client = await db.client.create({
    data: {
      iduser,
      Raison_Social: nom,
      Type_Cli: type_client_id,
      Contact: personne_a_contacter,
      Fonction_Conta: fonction || '',
      Email_Cli: email || '',
      Tel_Cli: telephone,
      Adresse: adresse,
      Ville_Cli: ville,
      code_Sage: '',
      Canal: canalID,
      SiteWeb: SiteWeb || '',
      Devis_HT: 0,
      CA_HT: 0,
      date_Crat: await createDate(),
      idRespTech: 0,
    },
  });

  if (!crm_client) {
    return {
      message: 'Impossible de créer le client. Veuillez réessayer.',
    };
  }
  return {
    message: 'Client créé avec succès',
    client_id: crm_client.idCli,
  };
}

// create client :
async function create_canal(canal: canal_type) {
  const exist = await db.canal.findFirst({
    where: {
      Canal: canal,
    },
  });

  if (exist) return exist.ID_Canl;

  const created_canal = await db.canal.create({
    data: {
      Canal: canal,
    },
  });

  if (created_canal) return created_canal.ID_Canl;

  return null;
}
// get the type id:
async function get_type_client_id(type: Type_of_client_type) {
  const exist = await db.type_client.findFirst({
    where: {
      Type_Client: type,
    },
  });

  if (exist) return exist.ID_Type;

  return null;
}

export async function getCommnercialClients(type: string) {
  const iduser = await getUserId();
  if (!iduser) return null;
  const clients = await db.client.findMany({
    where: {
      iduser,
      
    },
    orderBy: {
      date_Crat: 'desc',
    },
  });
  if (clients) {
    const types = await db.type_client.findMany({});
    const canals = await db.canal.findMany({});

    const corrected_clients = clients.map((client : client ) => {
      return {
        ...client,
        type: types.find((e) => {
          if (e.ID_Type === client.Type_Cli) {
            return e.Type_Client;
          }
        })?.Type_Client,
        Canal: canals.find((c) => {
          if (c.ID_Canl === client.Canal) return c.Canal;
        })?.Canal,
      };
    });

    if(!type) return corrected_clients;
    switch (type) {
      case 'entreprise':
        return corrected_clients.filter((client) => client.type === 'Entreprise');
      case 'particulier':
        return corrected_clients.filter((client) => client.type === 'Particulier');
      case 'ecole':
        return corrected_clients.filter((client) => client.type === 'Ecole');
      default:
        return corrected_clients;
    }

  }
}

export async function get_client_name(client_id: string) {
  const userId = await getUserId();
  if (!userId) {
    return {
      errors: {
        message: 'Impossible de récupérer les clients. Veuillez réessayer.',
      },
    };
  }
  const client = await db.client.findUnique({
    where: {
      idCli: Number(client_id),
    },
  });
  if (!client) {
    return {
      errors: {
        message: 'Impossible de récupérer les clients. Veuillez réessayer.',
      },
    };
  }
  return client.Raison_Social;
}

export async function supprimer_crm_client(
  state: SupprimerCrmClientFormState,
  formData: FormData
) {
  const verfiedFields = SupprimerCrmClientSchema.safeParse({
    client_id: formData.get('client_id'),
  });

  if (!verfiedFields.success) {
    return {
      errors: verfiedFields.error.flatten().fieldErrors,
    };
  }

  const { client_id } = verfiedFields.data;

  const userId = await getUserId();
  if (!userId) {
    return {
      errors: {
        message: 'Impossible de supprimer le client. Veuillez réessayer.',
      },
    };
  }

  const opportunities = await db.opportunite_clt.deleteMany({
    where: {
      ID_CLT: Number(client_id),
    },
  });

  if (!opportunities) {
    return {
      errors: {
        message: 'Impossible de supprimer le client. Veuillez réessayer.',
      },
    };
  }
  const client = await db.client.delete({
    where: {
      idCli: Number(client_id),
    },
  });
  if (!client) {
    return {
      errors: {
        message: 'Impossible de supprimer le client. Veuillez réessayer.',
      },
    };
  }

  return {
    success: true,
  };
}

export async function get_latest_crm_clients(iduser: number) {
  const userId = await getUserId();
  if (!userId) {
    return {
      errors: {
        message: 'Impossible de récupérer les clients. Veuillez réessayer.',
      },
    };
  }
  const clients = await db.client.findMany({
    where: {
      iduser,
    },
    orderBy: {
      date_Crat: 'desc',
    },
    take: 5,
  });
  return clients;
}
