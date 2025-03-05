import { z } from "zod";

export const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
    required_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
    required_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter the customer's name.",
    required_error: "Please enter the customer's name.",
  }),
  email: z
    .string({
      invalid_type_error: "Please enter the customer's email.",
      required_error: "Please enter the customer's email.",
    })
    .email(),
  image_url: z.string({
    invalid_type_error: "Please enter the customer's image.",
    required_error: "Please enter the customer's image.",
  }),
});

export const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
export const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
export const CreateCustomer = CustomerFormSchema.omit({ id: true });
