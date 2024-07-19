import React from 'react';

function TableEmployes() {
  return (
    <div className='flex flex-col bg-white w-full p-8 rounded-xl shadow-md border border-neutral-200'>
      <ul className='flex '>
        <li className='mr-auto'>
          <h1 className='font-bold text-xl'>Empolyes</h1>
          <p>40 employes en total</p>
        </li>

        <li className='mr-4'>
          <h2 className='font-bold text-xl'>94</h2>
          <p className='text-xs'>Done</p>
        </li>
        <li>
          <h2 className='font-bold text-xl'>23</h2>
          <p className='text-xs'>in Progrss</p>
        </li>
      </ul>
      <div className='divide-y space-y-3'>
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}

export default TableEmployes;

function Row() {
  return (
    <div className='grid grid-cols-8 pt-3'>
      <input type='checkbox' name='' id='' />
      <p>name</p>
      <p>admin</p>
      <p>members</p>
      <p>status</p>
      <p>status</p>
      <p>run time</p>
      <p>finish date</p>
    </div>
  );
}
