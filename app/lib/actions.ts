"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { CreateCustomer, CreateInvoice, UpdateInvoice } from "./schemas";
import { randomUUID } from "crypto";
import { CustomerState, InvoiceState } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
});

export async function createInvoice(
  _prevState: InvoiceState,
  formData: FormData
) {
  const validatedFields = CreateInvoice.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  _prevState: InvoiceState,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
}

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createCustomer(
  _prevState: CustomerState,
  imageUrl: string,
  formData: FormData
) {
  formData.append("image_url", imageUrl);

  const validatedFields = CreateCustomer.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Customer.",
    };
  }
  const customerId = randomUUID();
  const { name, email, image_url } = validatedFields.data;

  try {
    await sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${customerId}, ${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Customer.",
    };
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}
