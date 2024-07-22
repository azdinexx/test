import React from 'react';
import { DashboardIcon } from '../icones/dashboard';
import { DevisIcon } from '../icones/devis';
import { DemandeIcon } from '../icones/demande';
import { title } from 'process';
import { ReglementIcon } from '../icones/reglement';
import Item from './item';
import { FournisseurIcon } from '../icones/fournisseur';
import { EmployesIcon } from '../icones/employes';
import { SociteIcon } from '../icones/societe';
import { logout } from '@/actions/auth';
import Logoutbtn from '../logout-btn';

function Aside() {
  return (
    <aside className='w-full max-w-[250px] border-r shadow-sm bg-white flex flex-col'>
      <div className='p-5 pt-10 text-center font-bold text-xl'>
        Gestion d&apos;Achats
      </div>
      <ul className='divide-y py-5'>
        {navigation.map((item, index) => (
          <Item key={index} {...item} />
        ))}

      </ul>
      <Logoutbtn/>
    </aside>
  );
}
export default Aside;

const navigation = [
  {
    title: 'tableau de bord',
    href: '/agent/',
    icon: <DashboardIcon width={20} height={20} />,
  },
  {
    title: 'Demandes de material',
    href: '/agent/demander',
    icon: <DemandeIcon width={20} height={20} />,
  },
  {
    title: 'devis',
    href: '/devis',
    icon: <DevisIcon width={20} height={20} />,
  },
  {
    title: 'demandes de reglement',
    href: '/demandes-de-reglement',
    icon: <ReglementIcon width={20} height={20} />,
  },
  {
    title: 'employes',
    href: '/employes',
    icon: <EmployesIcon width={20} height={20} />,
  },
  {
    title: 'fournisseurs',
    href: '/fournisseurs',
    icon: <FournisseurIcon width={20} height={20} />,
  },
  {
    title: 'societes',
    href: '/societes',
    icon: <SociteIcon width={20} height={20} />,
  },
];
