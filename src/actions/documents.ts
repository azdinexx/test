'use server';
import { db } from '@/lib/db';
import {
  save_document_and_print_pdf_FormState,
  save_document_and_print_pdf_Schema,
} from '@/lib/document_definitions';
import { getUserId } from '@/lib/session';
import { redirect } from 'next/navigation';
import { writeFile, writeFileSync } from 'fs';
import { convertToPDF } from './printpdf';

export async function getAllDocuments() {
  const alldocuments = await db.document.findMany({});
  return alldocuments || [];
}

export async function get_user_documents() {
  const userId = await getUserId();

  if (!userId) {
    return [];
  }
  const userDocuments = await db.document.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return userDocuments || [];
}

export async function save_document_and_print_pdf(
  state: save_document_and_print_pdf_FormState,
  formData: FormData
) {
  const userId = await getUserId();
  if (!userId) {
    return { error: 'You are not logged in' };
  }

  const verifiedData = save_document_and_print_pdf_Schema.safeParse({
    client: formData.get('client') as string,
    exoniration: formData.get('exoniration') as string,
    exonirationNumber: formData.get('exonirationNumber') as string,
    typePaiment: formData.get('typePaiment') as string,
    numeroPaiment: formData.get('numeroPaiment') as string,
    montantHT: Number(formData.get('montantHT')),
    montantTTC: Number(formData.get('montantTTC')),
    montantPaie: Number(formData.get('montantPaie')),
    commentaire: formData.get('commentaire') as string,
  });

  if (!verifiedData.success) {
    return { errors: verifiedData.error.flatten().fieldErrors };
  }

  const {
    client,
    exoniration,
    exonirationNumber,
    typePaiment,
    numeroPaiment,
    montantHT,
    montantTTC,
    montantPaie,
    commentaire,
  } = verifiedData.data;

  // get the user id
  const commercial_id = await getUserId();

  if (!commercial_id) {
    return { error: 'You are not logged in' };
  }

  const commercial = await db.user
    .findUnique({
      where: {
        id: commercial_id,
      },
    })
    .then((user) => `${user?.firstName} ${user?.lastName}`);

  // customizing a title for the document
  const today = new Date();
  const frenchDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long', // Full weekday name (e.g., jeudi)
    year: 'numeric', // Year (e.g., 2024)
    month: 'long', // Full month name (e.g., mars)
    day: 'numeric', // Day of the month (e.g., 7)
  });
  let title = `${
    client.toUpperCase() + '-' + frenchDate.replaceAll(' ', '-').toUpperCase()
  }`.replaceAll(' ', '_');
  // ----------------- cheking if document exist -------------------
  let documentExist = await db.document.findUnique({
    where: {
      title,
    },
  });
  let temp = title;

  let i = 0;
  while (documentExist) {
    i++;
    title = temp + `_(${i})`;
    documentExist = await db.document.findUnique({
      where: {
        title,
      },
    });
  }
  //-------------------- creating the document --------------------

  const pdfFile = await convertToPDF({
    title,
    exoniration,
    exonirationNumber: exonirationNumber ? exonirationNumber : '',
    modePaiment: {
      typePaiment,
      numero: numeroPaiment || '',
    },
    montantHT,
    montantPaie,
    montantTTC,
    commentaire,
    commercial,
    client,
  });

  if (!pdfFile) {
    return { error: 'an error occured while creating the pdf file' };
  }

  // insert the document in the database

  const newDocument = await db.document.create({
    data: {
      client,
      title,
      exoniration,
      exonirationNumber,
      typePaiment,
      numeroPaiment,
      montantHT,
      montantPaie,
      montantTTC,
      commentaire,
      pdfLink: `/document/fec/${title}.pdf`,
      user: {
        connect: {
          id: commercial_id,
        },
      },
    },
  });

  if (!newDocument) {
    return { error: 'an error occured while creating the document' };
  }

  if (exoniration === 'OUI') {
    redirect(
      `/commercial/dashboard/fec/nouveau?document_id=${newDocument.id}&upload_exoneration=true`
    );
  }
  return redirect(
    `/commercial/dashboard/fec/nouveau?document_id=${newDocument.id}&success=true`
  );
}

/*-------------------- creating the document --------------------

  const pdfFile = await convertToPDF({
    title,
    exoniration,
    exonirationNumber: exonirationNumber ? exonirationNumber : '',
    modePaiment: {
      typePaiment,
      numero: numeroPaiment || '',
    },
    montantHT,
    montantPaie,
    montantTTC,
    commentaire,
    commercial,
    client,
  });

  if (!pdfFile) {
    return { error: 'an error occured while creating the pdf file' };
  }*/

export async function upload_exoneration(state: any, formData: FormData) {
  const file = formData.get('exonirationFile') as File;
  const document_id = formData.get('document_id') as string;

  if (!document_id) {
    return { error: 'document_id is required' };
  }
  if (!file) {
    return { error: 'file is required' };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/document/exoneration/${
    file.name.split('.')[0] + document_id + '.pdf'
  }`;
  writeFileSync(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  const document = await db.document.update({
    where: {
      id: document_id,
    },
    data: {
      exonirationFile: path,
    },
  });

  if (!document) {
    return { error: 'an error occured while updating the document' };
  }

  return redirect(
    `/commercial/dashboard/fec/nouveau?document_id=${document.id}&success=true`
  );
}

export async function get_pdf_link(document_id: string) {
  if (!document_id) {
    return null;
  }
  const document = await db.document.findUnique({
    where: {
      id: document_id,
    },
  });

  if (!document) {
    return null;
  }

  return document.pdfLink;
}
