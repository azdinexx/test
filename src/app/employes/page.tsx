import Header from '@/components/header';
import TableEmployes from '@/components/table/table-employes';
import React from 'react';

function page() {
  return (
    <div className='bg-neutral-50 w-full p-4 flex flex-col gap-8'>
      <Header />
      <TableEmployes />
    </div>
  );
}

export default page;
