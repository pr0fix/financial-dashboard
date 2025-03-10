"use client";

import { updateCustomer } from "@/app/lib/actions";
import { CustomerForm, CustomerState } from "@/app/lib/definitions";
import { EnvelopeOpenIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { startTransition, useActionState, useRef } from "react";
import ConfirmDialog from "./confirm-dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function EditCustomerForm({
  customer,
}: {
  customer: CustomerForm;
}) {
  const initialState: CustomerState = { message: null, errors: {} };
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, formAction] = useActionState(
    updateCustomerWithId,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleConfirmEdit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(() => {
        formAction(formData);
      });
    }
  };

  return (
    <>
      <form aria-describedby="edit-form-error" ref={formRef}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Edit name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={customer.name}
                  placeholder="Enter name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
              </div>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Edit email address
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={customer.email}
                  placeholder="Enter email"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="email-error"
                />
              </div>
              <EnvelopeOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="add-form-error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>
      </form>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <AlertDialog>
          <AlertDialogTrigger className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            Edit Customer
          </AlertDialogTrigger>

          <ConfirmDialog
            onConfirm={handleConfirmEdit}
            message="This action will modify the existing customer's data."
          />
        </AlertDialog>
      </div>
    </>
  );
}
