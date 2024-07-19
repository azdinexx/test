'use server';

import { EXONERATION, TYPE_PAIMENT } from '@/lib-to-be-deleted/constants';

import puppeteer from 'puppeteer';

export const convertToPDF = async (document: {
  title: string;
  client: string;
  commercial: string;
  exoniration: 'OUI' | 'NON' | 'ENCOURS';
  exonirationNumber: string;
  modePaiment: {
    numero: string | null;
    typePaiment: 'EFFET' | 'CHEQUE' | 'ESPECE' | 'VIREMENT';
  };
  montantHT: number;
  montantTTC: number;
  montantPaie: number;
  commentaire: string;
}): Promise<string | null> => {
  const outputPath = `./public/document/fec/${document.title}.pdf`;

  const ChequeOuEspece =
    document.modePaiment.typePaiment === TYPE_PAIMENT.CHEQUE ||
    document.modePaiment.typePaiment === TYPE_PAIMENT.EFFET;
  const NumeroDePaiment = `<div class="flex gap-4 p-2">
    <p>Numéro :</p>
    <input type="text" class="bg-gray-100 px-2 py-1" value="${document.modePaiment.numero}" />
  </div>`;
  const template = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <article id="thisbitch" class="border flex flex-col">
      <header class="grid grid-cols-3 grid-rows-1 border-b">
        <div class="border-r flex items-center justify-center p-3">
          <image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADpCAMAAADPsbkXAAAAVFBMVEVHcEwrh8EZfr3s7O0uqtwOcrUPdbfs7O3zlAAuqtwOcrXs7O0uqt0OcrXs7O0tqt0OcrXs7O3ylADylAAOcrUuqtzs7O3ylADs7O3ylAAuqtwOcrXUESdBAAAAGHRSTlMAESM4PDxcYW90fIWVmKa7vczT4ODj6fGwxDizAAAN+0lEQVR42u2d63bkphKFDSOYCIsRzkEnOd3v/55nST1268Yd2qDZO7PyYxLLDfq6qtiI0tsbBEEQBEEm/f1PoP7CnEEe+s//AgWwIK+IBbAggAUBLAhgASwIYEEACwJYAAsCWBDAggAWwIIAFgSwIIAFsCCABQEsCGABLAhgQQALAlgACwJYEMCCABbAggAWBLAggAWwIIAFASwIYAEsCGBBAAsCWAALAlgQwIIAFsCCABYEsCCABbAggAUBLAhgASwIYEEACwJYAAsCWBDAggAWwII89Q/Agkror1D1g0F93/Ou6wjmFIrReLNrmsax78EXFKjh5qVpHDjFbEG5wVo0Dh0mDMoP1hy5wBZUAqyZrR45ESoA1pwTEbagEmDdbmOPqYMKgDVnREweVAAsoAUVAgu1FlQIrNttgCUPlQDrNnHMIVQArNtthK0FlQDrNqHSgkqAdbsNmEeoBFi3ETU8VAIspEOoDFi3G1aHUBGwbvDhoSJggSyoDFhYHEJlwAJZUBmwosgis+j8r5RxfF6DVGZ8kE8lX6bK4b0KLN86izDGhZRKKaVXUkpKzsK2iCgTcnuV+TpqvpQQZyeLKBezOPO49KKzz/P4L4wYfoyLx+h2gwsd2zJTxuFJIdh2Ti0fyjgE1gZYfmRJfbdJS+E5O1Qo65Xu6jCdzx9QDoeEff6Px7n/vIg+fkxu/URayYA7Sbiyz9T9CSr5+r3aa+6kcYrqBOvm4ZSKu1va4wYw5b7MbpL55r9yv6kXB57NV6AeQxN+cYs6vn9b5snzL6XHxVcT0QhYN/es6buXHBGFSB8+t2AR432xgSWNsewIFvcamk/Y8vn6rQcgfb8wu3sgWgFrcv7Ou6+UZf6ZF547sPY3S8dFrGSw7nfpyFdE3QPBIvrunwyl3xRUBZZ7aXj3l3QWQEFgHe6W+C6w7ppn4GoTcpl/MqSeQbsusJwFvA4gy1BaEh0D1vGn9LeBZYfak6stFsobFxVUj1UDlquAv4dIkZSJ164wx78PLMtNFfcYsIhnjl9/SNIUWJMnWIpzvjhFi9ji/xwW2Mo+M49F/GzrnIm7wFLFwJKC/x7eLM6FVL5kUd/hCeO02MLhKnCXeyalCFiOMkvbJ5Zy6UoZa/ikf38l5vrO5wSLnflSOwdBuErr+csXYKqqM4fLcnn11hhY9mTozgVUWO/9ChAV4mWzp5XkkY8SwToPBkRoZyZep7Sw2pr6hGLmRV+lYE0JEesxRcoyRzKy9mTPK2p3lVEErL3/Rq2JXoeWQNyjeixuYZUEy7oy9MPCHNafNULgxD8j1uoOiBeDta0QlTVVhXsBygmlKG5hFQXrRtIilu2bxWIXyyuwiHt6i4G1qfWYZeARd566lgakvIVVFqwhNWKtpl8HFMieYK3CAn85WJsi0cJGTKoSDnBkeQurLFiWPUPPiLUK69QwdzQeLOYscwuCZb39LM0M0NZYzF5gYRUGa0yNWKvZZ+d3PDRVrMEyYvsSsFa/XQU5FkGeitWoKXysqhxYZsvBN2KZ7l8esJyVWlGwqHlhmAjW2gWj5u+qemsWrDE1YpmKDRU7ORuwnI5DUbBWt18Yb36kzaSN9JCXWFilwTKGLN+IRXVRsISDgbJgmWu8ZLCY0cxSL7GwioM1JEYsYiAwE1gux6EsWOYaLxmsdTIkXuvsxsAyLQx1MFhFIpbLiCwMljFgpoO12mWW53/N2garzxWxyoBF7ZVsYbCMi4d0sNbePju7sHxrG6wpscYqW7y7HIfCYD2nQWUHa72zczKdmjQOlqF8vyfaDdnA4tZPUhosZSh4coB1dmZHpVhYNFBkmNy6zX++/kkv330jlsnQyQbWm3U3uzRYMvfGgiEZ0v3fRFhYXfhLAJYZJWT153ks/ExhIY6kRCxlMJrygWV1HEqDZfreZAHrmAx1ymW7XPW1WX16OzbPiEVMX7F8YFkdh9eBxQuARXc7OzLJwqoOrCEhYkmnzZcMltVxKA0WKwrWep+bbir3tzrBGtLXhX4RixkXMRnBsjkOpcEyLXozgbXd2VFpFlZ1Eet0XegVsSyb9BnBsjkOrYO1PpXKEi2s+sAaIiMWt5yRywmW5RHl1sFan6P3eMS/rVR4+oiDxwF6ZXt4NydYlueAvx+sVB9TBx3QbStinRkO1ohF6O7wHbc4i8QhD7DMjsP3g8UCx2cpJxKfwqoQrM4SsR696TbS2t3hwPd8/eFY3hlYRlOjArDurg4VwjsZJibX+lLh2S8IaApy2pNFBfy8Eyyz41ABWE45QNl3QYl+CqvCiDVaIpa7Iwh9SwSLOMGippKvBbBc3gH3bwfWGlhTfMQy9b3LC5Zx5+gKYG3nitUMVvDjECQ2Yhn7FmQGy+Q4XAKsdTJMeBy5woh1Ur1711iGLqSZwTI5DpcAi14XLJ5QY523XctbvBsdh0uApXOsCetMhb15sPqoAxk0yW7gPmAZHIcGwHLuz4gsLladEWsIcN4JoZTvOt9Ri0HqfI7xzQcsg+NQgUHqGl/AduHl7IYTv8G5V8jW3cmOD3dm3dIxOw7tb+kcY/uFDNITsDwiOZWWAJ4drHPHoflN6Gtv6ZwYWV7PY1l60+UH69RxaB+sS29Cn4DlV3sKY8Od/GCdOg5Xemwm9eRXjalwIlERy/KUdgGwzngoDRYpDNaqO4ThaHTbEet40N5zkMaTDgXAIienR6/zaDJbV1vsMmB1kRHLePCuAFhnv6txsLYH6hPfylRjKjyCFX4SWhQH68RxaPuUzu5APUlrwn2tiFW4jZHLcWj7XOH+QD1PMrPolWosI0FFwDqGx6ZPQh8P1KuUZEimC60Kjc1Gi4B1dBxa7t1AjgfqadLOznQdH2sDFikP1gGJlrvNnFk1IiUZTpdx3l8O1uEZh4b7Y533hNQJOzvjRfYKvwGsQ2pquKPfeU9IlrCzM9YXscZGItbBcWi3B6mpm7uMfy3FUB9YQ46I9YLi/eA4NNs1mZr4SdjZGepLhUN8xHql3XB0HMqCRcv1eTd3c+fROzt9fRGrj49Y2gGWzgvWznH4rjdT8ESwuMWwijazuvrA6qIjlukoqSwF1taybPRdOtYXEpJ7ZDLs6kuFNDpiCdeBv9xgbZ9xaPTtX/YXEorYZDjVFrFsJ6FlzKI54aFwF1hbx6EkWLZ3N6e9r9D1QkIdmQzH2sCy9W6QcbVCljesOhKUeNUbVrX9QyRYWNz1q0XJTFU8FQ6xEcv8dmMWO/NOsNatt0q+E1pbE5JOOPrgfiGhjNvZ4bVFLB4ZsdZnw81vsc8N1hqZYmAxx7GZhLfYUzc1JG5np6sNrC4uYq2/1ObzX4FLGzdYa8dBFAJLuA768fgHXHxeSMjjdnamulLhWT9uNxZUWid/NTWS5AVrZSKVAYtr52ks6moQFmVhndEXsvoZ6opYEV2TKVeuc+Hrg9KCkYxgkZNOw3FgnaQxsjnibf5mqU2TMP+bT/xiEYk6wNrXBVZvi1iKczb3J/jdqpVSxoVUHo0vdo3qlJTiXCwUrGPbzliwBFu3XmDz0LRnT49dywXz8LjpsyvPwBaQDEldqZBYV8SbtjOGRkbO73RyGyPbTY0HK6VXjIxqY8S813sq5gDrWFPEOn2T/T198mnOxmsuZnkZsETQh/AAy/8gDo3Z2elrAqtPBEv4LNnzgsXc3c1ygKWtSYjocLBCjg7KiJ0dmmoz5QSLJoGlmFedkBesQ7Q4ZosMYElXI20VChYNYiVmZycoF479EKYxORP69iBVjucDVCGwmDMbJ4Ol3LeeyECwwsw9HrGzE37yr5j6+NJUumMpV0XA2vVXPClvmU/5Fd5mfH8pFQIWC6zHVxcvtC4sKRL3ZVSS+y1WmNQhq8KvysX7eR2DRanM91DYP5H2HdoyPKG8waKBRVPMvthYC1ejcVSzqyOXV+fojemgpOQsxEwnjMv9C3j0Yl/Mb+bZxwbCZwl3vw7x+9U+huDyuA7n1DC2r8GtSpllbDT0EAPlcj++x/Dm8Umx+T8f8i3GP8cQAHpXC1idx/DIqhVtdM9NsutpS0hy+84cIqvRkaTrVDK8qQ6upjfoWuJ1gMVxJ66mCQELKqG+Xq8BQshCwIIqDFkIWAhZCFhQM15Wh3twTX2z/T7iDlxU9HvBorgDqN9RuUON1O+o3FG/o3KHmkmGSIRYGWJFCIWLfEuZNRHMPMosFFhQI2UWCqw/QsOruRow5yjgUbhD8QX8S8kaUbhjaYgFIZQk+jKyJmw9gyxwBTVCFrhCBY+6HWqFLPgMf6gG+KJQERXd3cE+zh+srlgJP2HfGYUWynaokXSINAi9ddmD1og0CC1BK2ulNSFcQZ+VVkbjYUB1BeXPh8iC0E58BFZQlWiNaDAK5U+IiFaQRXSIWiFOA56PgRwrxG4MZGsaO6wEIZ+wxf3ZmkaOYAUFxK3eDdc09ohVUAxcg4muaRwAFZRCF+34/GLMcZymaRrHYRh63lEwBeVjDDRBEARBEARBEARBEARBEARBEARBEARBEARBEARZRBbRHyv9/PHTWz/mP+sfflwP8/pnwLNwM3PwPuvXrI9Z/130b2YtF12u/7H8quWXLhQu4OF+NM3SDNLM0ELPvxVpgW6mbQYNlLXE1Puvj7pYslH28esddLWhHx+NUPWbrQ8cTGyHrTkPPtJgtZFqTodzNsTdarXW+irbP2v2IhW7o47/LOI/S3jcmauaDE9z4bfe3x9rxmXd+Fg5uvX+6+tn3n++Pz2Ip/eAuYYgCIIgCIIgCIIgCIIgqKj+D1dhNp9i15dcAAAAAElFTkSuQmCC"
            height="{100}"
            width="{200}"
            alt=""
          />
        </div>
        <div class="flex flex-col">
          <span class="border-b text-center"> Formulaire</span>
          <div class="flex-grow flex items-center justify-center">F.E.C</div>
        </div>
        <div class="border-l flex flex-col">
          <span class="border-b text-center"> Version 1</span>
          <div class="flex-grow flex items-end">
            <span class="text-center w-full p-1 border-t">
              date : ${new Date().toISOString().slice(0, 10)}</span
            >
          </div>
        </div>
      </header>
      <span class="bg-blue-600 bg-opacity-60 w-full px-3 italic">
        Partie réservée au commercial
      </span>
      <section class="flex flex-col mx-3">
        <p class="my-3">Détail client :</p>
        <div class="grid grid-cols-3 my-3 border">
          <div class="p-2 border-r">
            <label htmlFor="">Nom du client : </label>
            <input
              type="text"
              required
              class="bg-gray-100 px-2 py-1"
              value="${document.client.toUpperCase()}"
            />
          </div>
          <div class="p-2 border-r">
            <p>Exonération :</p>
            <div class="flex gap-3 justify-center px-2 py-1">
              <label htmlFor="oui">
                <input id="oui" type="checkbox" ${
                  document.exoniration === EXONERATION.OUI ? 'checked' : ''
                }  /> oui
              </label>
              <label htmlFor="non">
                <input id="non" type="checkbox" ${
                  document.exoniration === EXONERATION.NON ? 'checked' : ''
                }  /> no
              </label>
              <label htmlFor="encours">
                <input id="encours" type="checkbox" ${
                  document.exoniration === EXONERATION.ENCOURS ? 'checked' : ''
                }  /> encours
              </label>
            </div>
          </div>
          <div class="border-l p-2">
            <label htmlFor="">Numéro d’exonération :</label>
            <input type="text" class="bg-gray-100 px-2 py-1" value="${
              document.exonirationNumber
            }" />
          </div>
        </div>
        <p class="my-3">Détail de paiement :</p>
        <div class="border">
          <section class="flex flex-col p-2">
            <div class="p-2 flex gap-4">
              <p>Mode de règlement :</p>
              <div class="flex gap-3">
                <input id="especes" type="checkbox"
                ${
                  document.modePaiment.typePaiment === TYPE_PAIMENT.ESPECE
                    ? 'checked'
                    : ''
                }
                />
                <label htmlFor="especes">Espèces</label>
                <input id="cheque" type="checkbox" ${
                  document.modePaiment.typePaiment === TYPE_PAIMENT.CHEQUE
                    ? 'checked'
                    : ''
                } />
                <label htmlFor="cheque">Chèque</label>
                <input id="Virement" type="checkbox" 
                ${
                  document.modePaiment.typePaiment === TYPE_PAIMENT.VIREMENT
                    ? 'checked'
                    : ''
                }
                />
                <label htmlFor="Virement">Virement</label>
                <input id="Effet" type="checkbox" ${
                  document.modePaiment.typePaiment === TYPE_PAIMENT.EFFET
                    ? 'checked'
                    : ''
                } />
                <label htmlFor="Effet">Effet</label>
              </div>
            </div>

            ${ChequeOuEspece ? NumeroDePaiment : ''}

            <div class="flex gap-4 p-2">
              <p>Montant HT:</p>
              <input type="text" class="bg-gray-100 px-2 py-1" value="${
                document.montantHT
              }" />
            </div>
            <div class="flex gap-4 p-2">
              <p>Montant TTC:</p>
              <input type="text" class="bg-gray-100 px-2 py-1" value="${
                document.montantTTC
              }" />
            </div>

            <div class="p-2">
              <p>Montant déjà encaissés :</p>
              <input class="bg-gray-100 resize-none w-full my-2 px-2 py-1" value="${
                document.montantPaie
              }" />
            </div>
          </section>
        </div>
        <div class="my-3">
          <p>Autre Commentaires :</p>
          <textarea
            rows="{3}"
            class="bg-gray-100 resize-none w-full my-2"
          >
          ${document.commentaire}
          </textarea>
        </div>
        <div class="w-full flex justify-between mb-5">
          <div>
            <p>Nom du commercial :</p>
            
            <input
              type="text"
              required
              class="bg-gray-100 px-2 py-1"
              value="${document.commercial.toUpperCase()}"
            />          </div>
        </div>
      </section>
      <div class="my-6 flex flex-col mx-3 border">
        <span class="bg-green-600 bg-opacity-60 w-full px-3 italic">
          Partie réservée à la comptabilité
        </span>
        <div class="p-4">
          <div class="flex gap-4">
            <p>Date réelle d’encaissement :</p>
            <input type="text" class="bg-gray-100 px-2 py-1" />
          </div>
          <div class="mt-3">
            <p>Observations :</p>
            <textarea
              disabled
              rows="{3}"
              class="bg-gray-100 resize-none w-full mt-2"
            >
            </textarea>
          </div>
        </div>
      </div>
    </article>
  </body>
</html>
`;

  printit(template, outputPath);

  return outputPath;
};

// ========the printing logic===========
const printit = async (
  htmlContent: string,
  outputPath: string
): Promise<string> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Set content of the page with the HTML content
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate PDF from the page
  await page.pdf({
    printBackground: true,
    path: outputPath,
    format: 'A4',
    margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
  });

  // Close the browser
  await browser.close();

  console.log(`PDF saved to ${outputPath}`);
  return outputPath;
};

const blank_template = `<html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Document</title> <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" /> </head> <body> <article id="thisbitch" class="border flex flex-col"> <header class="grid grid-cols-3 grid-rows-1 border-b"> <div class="border-r flex items-center justify-center p-3"> <image src="data:image/png;base64,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" height="{100}" width="{200}" alt="" /> </div> <div class="flex flex-col"> <span class="border-b text-center"> Formulaire</span> <div class="flex-grow flex items-center justify-center">F.E.C</div> </div> <div class="border-l flex flex-col"> <span class="border-b text-center"> Version 1</span> <div class="flex-grow flex items-end"> <span class="text-center w-full p-1 border-t"> date : ................</span> </div> </div> </header> <span class="bg-blue-600 bg-opacity-60 w-full px-3 italic"> Partie réservée au commercial </span> <section class="flex flex-col mx-3"> <p class="my-3">Détail client :</p> <div class="grid grid-cols-3 my-3 border"> <div class="p-2 border-r"> <label htmlFor="">Nom du client : </label> <input type="text" required class="bg-gray-100" value='' /> </div> <div class="p-2 border-r"> <p>Exonération :</p> <div class="flex gap-3 justify-center"> <label htmlFor="oui"> <input id="oui" type="checkbox"/> oui </label> <label htmlFor="non"> <input id="non" type="checkbox" /> no </label> <label htmlFor="encours"> <input id="encours" type="checkbox" /> encours </label> </div> </div> <div class="border-l p-2"> <label htmlFor="">Numéro d’exonération :</label> <input type="text" class="bg-gray-100"  /> </div> </div> <p class="my-3">Détail de paiement :</p> <div class="border"> <section class="flex flex-col p-2"> <div class="p-2 flex gap-4"> <p>Mode de règlement :</p> <div class="flex gap-3"> <input id="especes" type="checkbox"  /> <label htmlFor="especes" >Espèces</label> <input id="cheque" type="checkbox"  /> <label htmlFor="cheque">Chèque</label> <input id="Virement" type="checkbox" /> <label htmlFor="Virement">Virement</label> <input id="Effet" type="checkbox" /> <label htmlFor="Effet">Effet</label> </div> </div> 

  <div class="flex gap-4 p-2"> <p>Numéro :</p> <input type="text" class="bg-gray-100"  /> </div> 

<div class="flex gap-4 p-2"> <p>Montant HT:</p> <input type="text" class="bg-gray-100"  /> </div>
<div class="flex gap-4 p-2"> <p>Montant TTC:</p> <input type="text" class="bg-gray-100"  /> </div>

<div class="p-2"> <p>Montant déjà encaissés :</p> <input  class="bg-gray-100 resize-none w-full my-2"  /> </div> </section> </div> <div class="my-3"> <p>Autre Commentaires :</p> <textarea rows="{3}" class="bg-gray-100 resize-none w-full my-2" ></textarea> </div> <div class="w-full flex justify-between mb-5"> <div> <p>Nom du commercial :</p> <input type="text" class="bg-gray-100"   /> </div> </div> </section> <div class="my-6 flex flex-col mx-3 border"> <span class="bg-green-600 bg-opacity-60 w-full px-3 italic"> Partie réservée à la comptabilité </span> <div class="p-4"> <div class="flex gap-4"> <p>Date réelle d’encaissement :</p> <input type="text" class="bg-gray-100"  /> </div> <div class="mt-3"> <p>Observations :</p> <textarea disabled rows="{3}" class="bg-gray-100 resize-none w-full mt-2" > </textarea> </div> </div> </div> </article> </body> </html>`;
