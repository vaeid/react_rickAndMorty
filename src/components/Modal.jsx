import { XCircleIcon } from '@heroicons/react/16/solid';
import React from 'react';

export default function Modal({ title, isOpen, children, onOpen }) {
  if (!isOpen) return;
  return (
    <div>
      <div className='backdrop' onClick={() => onOpen(false)}>
        {' '}
      </div>
      <div className='modal'>
        <div className='modal__header'>
          <h2 className='title'>{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className='icon close' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
