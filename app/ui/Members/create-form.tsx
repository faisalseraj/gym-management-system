'use client'

import {
  PhoneIcon,
  PlusCircleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { SelectField } from '../Shared/SelectField';
import { TextField } from '../Shared/TextField';
import Toast from '../Shared/Toast';
import { createMember } from '@/app/lib/customer/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMember, initialState);
  const [show, setShow] = useState(false)
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];

useEffect(() => {
  if(state?.message ){
    setShow(true)
  }

}, [state])
    return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        
<Toast show={show} message={state?.message} status={state?.code === 400 ?  "error" :  "success"}  onClose={()  => setShow(false)}/>
        {/* Invoice Amount */}
        <div className='grid grid-rows grid-flow-col gap-2'>

        <div className="mb-4">
         <TextField
         name='firstName'
         icon={
           <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
           
          }
          label='First Name'
          state={state}
          placeholder={"Enter First name"}
          />
        </div>
        <div className="mb-4">
         <TextField
         name='lastName'
         icon={
           <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
           
          }
          label='Last Name'
          state={state}
          placeholder={"Enter Last name"}
          />
        </div>
          </div>
          <div className="mb-4">
         <TextField
         name='phoneNumber'
         icon={
           <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          label='Phone Number'
          state={state}
          placeholder={"Enter phone number"}
          />
        </div>

        <div className="mb-4">
        <SelectField
        state={state}
        icon={<PlusCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> }
          name="bloodGroup" label={"Blood group"} options={bloodGroups.map(
            (bloodgroup) => ({id: bloodgroup, label:bloodgroup, value: bloodgroup})
          )}        />
        </div>

        {/* Invoice Status
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/members"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add member</Button>
      </div>
    </form>
  );
}
