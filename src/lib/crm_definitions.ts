import { z } from 'zod';

export const NouveauCrmClientFormSchema = z.object({
  nom: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  personne_a_contacter: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  SiteWeb: z.string().optional(),
  fonction: z.string().optional(),
  type: z.enum(['Particulier', 'Entreprise', 'Ecole']),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim()
    .optional(),
  telephone: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  adresse: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters long.' })
    .trim(),
  ville: z
    .string()
    .min(2, { message: 'City must be at least 2 characters long.' })
    .trim(),
  codePostal: z.string().trim().optional(),
  canal: z.enum([
    'SITEWEB',
    'EMAIL',
    'TELEPHONE',
    'FACEBOOK',
    'INSTAGRAM',
    'PROSPECTION',
    'WHATSAPP',
    'GOOGLE',
    'AUTRE',
  ]),
  autre_canal: z.string().trim().optional(),
});

export type Type_of_client_type = 'Particulier' | 'Entreprise' | 'Ecole';

export type NouveauClientFormState =
  | {
      errors: {
        nom?: string[] | undefined;
        personne_a_contacter?: string[] | undefined;
        type?: string[] | undefined;
        email?: string[] | undefined;
        telephone?: string[] | undefined;
        adresse?: string[] | undefined;
        ville?: string[] | undefined;
        codePostal?: string[] | undefined;
        canal?: string[] | undefined;
        autre_canal?: string[] | undefined;
      };
    }
  | {
      message: string;
    }
  | null
  | undefined;

export type NouveauOpportuniteFormState =
  | {
      errors: {
        client_id?: string[] | undefined;
        observation?: string[] | undefined;
        status?: string[] | undefined;
        NiveuaInteret?: string[] | undefined;
        prospection?: string[] | undefined;
        interet?: string[] | undefined;
      };
    }
  | {
      message: string;
    }
  | null
  | undefined;

export const NouveauOpportuniteFormSchema = z.object({
  ID_CLT: z.number(),
  observation: z
    .string()
    .max(500, { message: 'Observation must be less than 500 characters long.' })
    .trim()
    .optional(),
  mobilier_scolaire: z.boolean(),
  mobilier_bureau: z.boolean(),
  ecran_interactif: z.boolean(),
  equipment_informatique: z.boolean(),
  NiveuaInteret: z
    .number()
    .min(0, { message: '0 is the min' })
    .max(5, { message: '5 is the max' }),
  status: z.enum([
    'non_traite',
    'en_cours',
    'proposition_devis',
    'negociation',
    'gagne',
    'perdu',
  ]),
  prospection: z.enum([
    'TELEPHONIQUE',
    'EMAIL',
    'VISITE_CLIENT',
    'TERRAIN',
    'SOCIAL_MEDIA',
    'AUTRE',
  ]),
});

export const SupprimerCrmClientSchema = z.object({
  client_id: z.number(),
});

export type SupprimerCrmClientFormState =
  | { errors: { client_id?: string[] | undefined } }
  | { errors: { message: string } }
  | { message: string }
  | { success: boolean }
  | null
  | undefined;

export type Prospection_Type =
  | 'TELEPHONIQUE'
  | 'EMAIL'
  | 'VISITE_CLIENT'
  | 'TERRAIN'
  | 'SOCIAL_MEDIA'
  | 'AUTRE';

export type Status_Type =
  | 'non_traite'
  | 'en_cours'
  | 'proposition_devis'
  | 'negociation'
  | 'gagne'
  | 'perdu';

export type canal_type =
  | 'SITEWEB'
  | 'EMAIL'
  | 'TELEPHONE'
  | 'FACEBOOK'
  | 'INSTAGRAM'
  | 'PROSPECTION'
  | 'WHATSAPP'
  | 'GOOGLE'
  | 'AUTRE';
