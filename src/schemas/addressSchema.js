import { z } from 'zod'

const REQUIRED = 'This field is required.'

function too_long(count = 255) {
  return `Ensure this field has no more than ${count} characters.`
}

export const addressSchema = z.object({
  name: z.string().trim().min(1, REQUIRED).max(255, too_long()),
  attention: z.string().trim().min(1, REQUIRED).max(255, too_long()),
  phone: z.string().trim().max(32, too_long(32)),
  address_code: z.string().trim().max(255, too_long()),
  street1: z.string().trim().min(1, REQUIRED).max(255, too_long()),
  street2: z.string().trim().max(255, too_long()),
  city: z.string().trim().min(1, REQUIRED).max(255, too_long()),
  state: z.string().trim().min(1, REQUIRED).max(64, too_long(64)),
  zip_code: z.string().trim().min(1, REQUIRED).max(64, too_long(64)),
  country: z.string().trim().min(1, REQUIRED).max(64, too_long(64)),
  description: z.string().trim().max(2000, too_long(2000)),
  delivery_instructions: z.string().trim().max(2000, too_long(2000)),
})
