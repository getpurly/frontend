import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { useCreateAddress } from '../hooks/addresses'
import { addressSchema } from '../schemas/addressSchema'
import { useFlashStore } from '../stores/flashStore'
import { AlertError } from './shared/AlertError'
import { Breadcrumb } from './shared/Breadcrumb'

export function AddressCreateView() {
  const navigate = useNavigate()
  const createAddress = useCreateAddress()
  const { setFlash } = useFlashStore.getState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      attention: '',
      phone: '',
      address_code: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      description: '',
      delivery_instructions: '',
    },
  })

  const onSubmit = (payload) => {
    createAddress.mutate(payload, {
      onSuccess: (data) => {
        reset()
        setFlash('Address created successfully.', data.id)
        navigate({
          to: '/addresses/$id',
          params: { id: String(data.id) },
        })
      },
    })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumb id="" object="address" />
      {createAddress.isError && <AlertError message={createAddress.error.message} />}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Create Address</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <section className="space-y-4">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                    Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Name *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="mt-3 text-xs text-error">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Attention *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('attention')}
                      />
                      {errors.attention && (
                        <p className="mt-3 text-xs text-error">{errors.attention.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Phone</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="mt-3 text-xs text-error">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Address Code</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('address_code')}
                      />
                    </div>
                  </div>
                </section>
                <section className="space-y-4">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                    Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control md:col-span-2">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Street 1 *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('street1')}
                      />
                      {errors.street1 && (
                        <p className="mt-3 text-xs text-error">{errors.street1.message}</p>
                      )}
                    </div>
                    <div className="form-control md:col-span-2">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Street 2</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('street2')}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">City *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('city')}
                      />
                      {errors.city && (
                        <p className="mt-3 text-xs text-error">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">State *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('state')}
                      />
                      {errors.state && (
                        <p className="mt-3 text-xs text-error">{errors.state.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">ZIP Code *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('zip_code')}
                      />
                      {errors.zip_code && (
                        <p className="mt-3 text-xs text-error">{errors.zip_code.message}</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text text-sm">Country *</span>
                      </label>
                      <input
                        className="input input-bordered rounded-field w-full"
                        {...register('country')}
                      />
                      {errors.country && (
                        <p className="mt-3 text-xs text-error">{errors.country.message}</p>
                      )}
                    </div>
                  </div>
                </section>
                <section className="space-y-4">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                    Description
                  </h2>
                  <textarea
                    className="textarea textarea-bordered rounded-field w-full"
                    rows={3}
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="mt-3 text-xs text-error">{errors.description.message}</p>
                  )}
                </section>
                <section className="space-y-4">
                  <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                    Delivery Instructions
                  </h2>
                  <textarea
                    className="textarea textarea-bordered rounded-field w-full"
                    rows={3}
                    {...register('delivery_instructions')}
                  />
                  {errors.delivery_instructions && (
                    <p className="mt-3 text-xs text-error">
                      {errors.delivery_instructions.message}
                    </p>
                  )}
                </section>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={createAddress.isPending}
                    className="btn btn-primary rounded-field font-semibold"
                  >
                    Create Address
                  </button>
                  <button
                    type="button"
                    disabled={createAddress.isPending}
                    className="btn btn-outline rounded-field"
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
