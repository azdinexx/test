import { z } from 'zod';

export type save_document_and_print_pdf_FormState =
  | {
      error?: string;
      document_id?: undefined;
      message?: undefined;

      errors?: {
        client?: string[] | undefined;
        exoniration?: string[] | undefined;
        exonirationNumber?: string[] | undefined;
        exonirationFile?: string[] | undefined;
        typePaiment?: string[] | undefined;
        numeroPaiment?: string[] | undefined;
        montantHT?: string[] | undefined;
        montantTTC?: string[] | undefined;
        montantPaie?: string[] | undefined;
        commentaire?: string[] | undefined;

        documentFile?: string[] | undefined;
      };
    }
  | null
  | undefined;

export const save_document_and_print_pdf_Schema = z.object({
  client: z.string({
    required_error: 'Nom du client est requis',
  }),
  exoniration: z.enum(['OUI', 'NON', 'ENCOURS'], {
    required_error: 'Exoniration est requis',
  }),
  exonirationNumber: z.string().optional(),
  typePaiment: z.enum(['ESPECE', 'CHEQUE', 'VIREMENT', 'EFFET'], {
    required_error: 'Type de paiment est requis',
  }),
  numeroPaiment: z.string().optional(),
  montantHT: z.number({
    required_error: 'Montant HT est requis',
  }),
  montantTTC: z.number({
    required_error: 'Montant TTC est requis',
  }),
  montantPaie: z.number({
    required_error: 'Montant paie est requis',
  }),
  commentaire: z.string().optional().default(''),
});
