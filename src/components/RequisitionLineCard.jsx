import { useState } from 'react'

import { useAddress } from '../hooks/addresses'
import { formatAmount, formatPaymentTerm } from '../utils/formatters'
import { ErrorAlert } from './shared/ErrorAlert'
import { Label } from './shared/Label'

export function RequisitionLineCard({ line, currency }) {
  const [activeTab, setActiveTab] = useState('detail')
  const { data: address, isLoading, error } = useAddress(line.ship_to.id)

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-dots loading-xs"></span>
      </div>
    )
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <div className="rounded-md bg-base-200 border border-base-400 p-2 space-y-4 relative">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Line {line.line_number}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-white">{formatAmount(line.line_total)}</div>
          <div className="text-xs text-neutral-500 uppercase">{currency}</div>
        </div>
      </div>
      {activeTab === 'detail' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <Label name="Description" value={line.description} />
          <Label name="Line Type" value={line.line_type} valueClassName="capitalize" />
          <Label name="Category" value={line.category} valueClassName="capitalize" />
          <Label name="Manufacturer" value={line.manufacturer || '-'} />
          <Label name="Part Number" value={line.manufacturer_part_number || '-'} />
          {line.line_type === 'goods' ? (
            <>
              <Label name="Quantity" value={line.quantity ?? '-'} />
              <Label name="Unit Price" value={formatAmount(line.unit_price)} />
              <Label
                name="Unit of Measure"
                value={line.unit_of_measure}
                valueClassName="capitalize"
              />
            </>
          ) : null}
          <Label name="Payment Term" value={formatPaymentTerm(line.payment_term)} />
          <Label name="Need By" value={line.need_by} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <Label name="Name" value={address.name} />
          <Label name="Address Code" value={address.address_code} />
          <Label name="Attention" value={address.attention} />
          <Label name="Phone" value={address.phone} />
          <Label name="Street 1" value={address.street1} />
          <Label name="Street 2" value={address.street2} />
          <Label name="City" value={address.city} />
          <Label name="State" value={address.state} />
          <Label name="Postal Code" value={address.zip_code} />
          <Label name="Country" value={address.country} />
          <Label name="Delivery Instructions" value={address.delivery_instructions} />
        </div>
      )}
      <div className="flex justify-end pt-4">
        <div className="join">
          <button
            className={`btn btn-xs join-item ${
              activeTab === 'detail' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setActiveTab('detail')}
          >
            Details
          </button>
          <button
            className={`btn btn-xs join-item ${
              activeTab === 'ship_to' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setActiveTab('ship_to')}
          >
            Ship To
          </button>
        </div>
      </div>
    </div>
  )
}
