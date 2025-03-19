"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  CreateCustomer,
  CreateInvoice,
  SignUpSchema,
  UpdateCustomer,
  UpdateInvoice,
} from "./schemas";
import { randomUUID } from "crypto";
import { CustomerState, InvoiceState, SignUpState } from "./definitions";
import { hash } from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: process.env.POSTGRES_URL?.includes("sslmode=disable")
    ? false
    : "require",
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
    console.error("Database Error: Failed to Create Invoice:", error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
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
    console.error("Database Error: Failed to Update Invoice:", error);
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error: Failed to Delete Invoice:", error);
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
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

export async function registerUser(
  _prevState: SignUpState,
  formData: FormData
) {
  const validatedFields = SignUpSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to register user.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return {
        message: "User with this email already exists.",
      };
    }

    const hashedPassword = await hash(password, 10);

    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${randomUUID()}, ${name}, ${email}, ${hashedPassword})
    `;

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    console.error("Database Error: Failed to Register User:", error);
    return {
      message: "Database Error: Failed to Register User.",
    };
  }
  redirect("/dashboard");
}

export async function createCustomer(
  _prevState: CustomerState,
  imageUrl: string,
  formData: FormData
) {
  if (imageUrl) {
    formData.append("image_url", imageUrl);
  } else {
    formData.append("image_url", "/customers/placeholder.png");
  }

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
    console.error("Database Error: Failed to Create Customer:", error);
    return {
      message: "Database Error: Failed to Create Customer.",
    };
  }

  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
  redirect("/dashboard/customers");
}

export async function updateCustomer(
  id: string,
  _prevState: CustomerState,
  formData: FormData
) {
  const existingCustomer = await sql`
  SELECT image_url FROM customers WHERE id = ${id}`;

  formData.append("image_url", existingCustomer[0].image_url);
  const validatedFields = UpdateCustomer.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Customer",
    };
  }

  const { name, email } = validatedFields.data;

  try {
    await sql`
    UPDATE customers
    SET name = ${name}, email = ${email}
    WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error: Failed to Update Customer", error);
    return {
      message: "Database Error: Failed to Update Customer",
    };
  }
  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error: Failed to Delete Customer:", error);
    return {
      message: "Database Error: Failed to Delete Customer.",
    };
  }

  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}
