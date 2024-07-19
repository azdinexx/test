'use server';
import {
  NouveauOpportuniteFormSchema,
  NouveauOpportuniteFormState,
  Prospection_Type,
  Status_Type,
} from '@/lib/crm_definitions';
import { db } from '@/lib/db';
import { getUserId } from '@/lib/session';
import { redirect } from 'next/navigation';
import { getCommnercialClients } from './crm-client';
import { client } from '@prisma/client';

export async function create_opportunite(
  state: NouveauOpportuniteFormState,
  formData: FormData
) {
  console.log('formData', formData);

  const validatedFields = NouveauOpportuniteFormSchema.safeParse({
    ID_CLT: Number(formData.get('client_id')),
    nom: formData.get('nom'),
    observation: formData.get('observation'),
    status: formData.get('status'),
    NiveuaInteret: Number(formData.get('NiveuaInteret')),
    prospection: formData.get('prospection'),
    mobilier_scolaire: Boolean(formData.get('mobilier_scolaire')),
    mobilier_bureau: Boolean(formData.get('mobilier_bureau')),
    ecran_interactif: Boolean(formData.get('ecran_interactif')),
    equipment_informatique: Boolean(formData.get('equipment_informatique')),
  });

  if (!validatedFields.success) {
    console.log(
      'some fields are wrong',
      validatedFields.error.flatten().fieldErrors
    );

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const {
    ID_CLT,
    observation,
    status,
    mobilier_bureau,
    mobilier_scolaire,
    ecran_interactif,
    equipment_informatique,
    NiveuaInteret,
    prospection,
  } = validatedFields.data;
  console.log({
    ID_CLT,
    observation,
    status,
    mobilier_bureau,
    mobilier_scolaire,
    ecran_interactif,
    equipment_informatique,
    NiveuaInteret,
    prospection,
  });
  // Call the provider or db to create a crm client...

  const userId = await getUserId();
  if (!userId) {
    return {
      message: 'Impossible de créer le client. Veuillez réessayer.',
    };
  }
  const prospectionID = await get_propection(prospection);
  if (!prospectionID)
    return {
      message: 'problem creating / finding the prospection',
    };
  const NiveuaInteretID = await get_niveau_interet(NiveuaInteret);
  if (!NiveuaInteretID)
    return {
      message: 'problem creating / finding the NiveuaInteretID',
    };
  const statusID = await get_status(status);
  if (!statusID)
    return {
      message: 'problem creating / finding the status',
    };

  const crm_opportunite = await db.opportunite_clt.create({
    data: {
      ID_CLT,
      Date_Crtd: await createDate(),
      Prospection: prospectionID,
      Niveau_Intere: NiveuaInteretID,
      Statut: statusID,
      idUserOp: userId,
      Centre_Inter: mobilier_bureau ? 'on' : 'of',
      Centre_Inter1: mobilier_scolaire ? 'on' : 'of',
      Centre_Inter2: ecran_interactif ? 'on' : 'of',
      Centre_Inter3: equipment_informatique ? 'on' : 'of',
      Numerotation: 'new_crm',
    },
  });
  console.log(crm_opportunite);
  if (!crm_opportunite) {
    return {
      message: 'Impossible de créer le client. Veuillez réessayer.',
    };
  }
  if (observation) {
    await create_observation(observation, userId, crm_opportunite.ID_Opprt);
  }

  redirect(
    '/commercial/dashboard/opportunite?success=true&opp_id=' +
      crm_opportunite.ID_Opprt
  );
}

export async function get_user_opportunites(
  orderBy?: 'Niveau_Intere' | 'Date_Crtd',
  sort?: 'asc' | 'desc'
) {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }
  const orderByClause = orderBy
    ? {
        [orderBy]: sort,
      }
    : undefined;
  const opportunities = await db.opportunite_clt.findMany({
    where: {
      idUserOp: userId,
    },
    orderBy: orderByClause,
  });
  let user_clients = await getCommnercialClients('all') 
  if(!user_clients) user_clients= []
  if (opportunities) {
    const niveaux_interets = await db.nivea_inter.findMany({});
    const prospection = await db.prospection.findMany({});
    const corrceted_opp = opportunities.map( (opp) => {
      return {
        ...opp,
        Niveau_Intere: niveaux_interets.find((n) => {
          if (n.id_Inter === opp.Niveau_Intere) return n.Niveau_Inter;
        })?.Niveau_Inter,
        Prospection: prospection.find((p) => {
          if (p.id_Prosp === opp.Prospection) return p;
        })?.Type_Prosp,
        Client: user_clients?.find((c ) => {
          if (c.idCli === opp.ID_CLT) return c
        })?.Raison_Social

      };
    });
    return  corrceted_opp;
  }
}

//create a date
export async function createDate() {
  const date = new Date(); // Assuming you want to format the current date

  return date.toISOString();
}

//create observation
async function create_observation(
  observation: string,
  iduser: number,
  ID_Opert: number
) {
  const user = await db.login.findUnique({
    where: {
      iduser,
    },
  });
  if (user?.username) {
    const created_observation = await db.observ_oppert.create({
      data: {
        Username: user.username,
        Observation: observation,
        date_Observ: await createDate(),
        ID_Opert,
      },
    });
    return created_observation.ID_Observ;
  }
  return null;
}
// create or get status
async function get_status(status: Status_Type) {
  const exist = await db.statu.findFirst({
    where: {
      Statu: status,
    },
  });

  if (exist) return exist.idstatu;

  const created_status = await db.statu.create({
    data: {
      Statu: status,
    },
  });
  if (created_status) return created_status.idstatu;

  return null;
}
// create or get get_niveau_interet
async function get_niveau_interet(Niveau_Inter: number) {
  const exist = await db.nivea_inter.findFirst({
    where: {
      Niveau_Inter,
    },
  });

  if (exist) return exist.id_Inter;

  const created_niveau_interet = await db.nivea_inter.create({
    data: {
      Niveau_Inter,
    },
  });
  if (created_niveau_interet) return created_niveau_interet.id_Inter;

  return null;
}
// create or get prospection
async function get_propection(prospection: Prospection_Type) {
  const exist = await db.prospection.findFirst({
    where: {
      Type_Prosp: prospection,
    },
  });

  if (exist) return exist.id_Prosp;

  const created_prospection = await db.prospection.create({
    data: {
      Type_Prosp: prospection,
    },
  });
  if (created_prospection) return created_prospection.id_Prosp;

  return null;
}
// get the latest crm opp
export async function get_latest_crm_opportunities() {
  const userId = await getUserId();
  if (!userId) {
    return {
      errors: {
        message:
          'Impossible de récupérer les opportunitees. Veuillez réessayer.',
      },
    };
  }
  const opportunitees = await db.opportunite_clt.findMany({
    where: {
      idUserOp: userId,
    },
    orderBy: {
      Date_Crtd: 'desc',
    },
    take: 5,
  });
  return opportunitees;
}
