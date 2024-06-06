
'use server';

import { AuthError } from 'next-auth';
import { call } from '..';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

const FormSchema = z.object({

  id: z.string(),
  _id: z.string(),

  firstName: z.string({
    invalid_type_error: 'Please enter first name of member.',
  }).min(1),
  lastName: z.string({
    invalid_type_error: 'Please enter last name of member.',
  }).min(1),
  phoneNumber: z.string({
    invalid_type_error: 'Please enter phone number of member.',
  }).min(1),
  bloodGroup: z.string({
    invalid_type_error: 'Please select a blood group type',
  }),

});

const CreateMember = FormSchema.omit({ id: true, _id: true });

export async function createMember(prevState: any, formData: FormData) {

  const validatedFields = CreateMember.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber'),
    bloodGroup: formData.get('bloodGroup'),
  });
console.log(validatedFields.success, "validatedFields.success")
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log( validatedFields.error.flatten().fieldErrors, " validatedFields.error.flatten().fieldErrors")
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add member.',
    };
  }

  // Prepare data for insertion into the database
  const { firstName,
    lastName,
    phoneNumber,
    bloodGroup, } = validatedFields.data;
  const payload = {
    firstName,
    lastName,
    phoneNumber,
    "password": "Pass@123",
    "userType": "manager",
    "isVerified": false,
    bloodGroup
  }
  try {
   const user:any = await call({
      method: "POST",
      path: "v1/users",
      data: payload
    })


    if(user){
      return {message: "Member  added successfully", status: 200,...user}
    }

  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/members');
  redirect('/dashboard/members');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true });

// ...
export async function updateInvoice(
  id: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;

  try {
    // await sql`
    //   UPDATE invoices
    //   SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //   WHERE id = ${id}
    // `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Invalid credentials.';
      }
    }
    throw error;
  }
}