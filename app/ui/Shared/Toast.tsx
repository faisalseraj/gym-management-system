'use client'

import clsx from 'clsx';
import { useEffect } from 'react';

const Toast = ({ message, show, onClose, time = 3000, status }:any) => {
    
    const handleShowToast = () => {
        setTimeout(() => {
            onClose()
        }, time); // Hide toast after 3 seconds
    };
    
    useEffect(() => {
        if(show){
            handleShowToast()
        }
    }, [show])
    if (!show) return null;
    return (
    <div className={clsx(`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg z-50`, {
        'bg-red-500': status === "error" ,
        'bg-green-500': status === "success"})}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586 6.707 4.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
