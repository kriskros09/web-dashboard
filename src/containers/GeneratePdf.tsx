import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

// Store
import { getState } from '../store/models'
// Components
import { Container } from '../components/core/Container'
import Invoice from '../components/PDF/Invoice'
import ProfCharges from '../components/PDF/ProfCharges'
import PurchaseOrder from '../components/PDF/PurchaseOrder'
import Receipt from '../components/PDF/Receipt'

const GeneratePdf: React.FC = (): ReactElement<'Container'> => {
  const userId = getState('User').userId
  const search = useLocation().search
  const PO = 'purchase-order'
  const INV = 'invoice'
  const PC = 'prof-charges'
  const REC = 'receipt'

  const DocTypeParam = new URLSearchParams(search).get('pdfType')
  const UserParam = new URLSearchParams(search).get('userId')
  const DocIdParam = new URLSearchParams(search).get('docId')

  return (
    <Container center>
      {(() => {
        if (DocTypeParam === PO && DocIdParam && DocIdParam !== '' && UserParam === userId) {
          return <PurchaseOrder id={DocIdParam} />
        }

        if (DocTypeParam === INV && DocIdParam && DocIdParam !== '' && UserParam === userId) {
          return <Invoice id={DocIdParam} />
        }

        if (DocTypeParam === PC && DocIdParam && DocIdParam !== '' && UserParam === userId) {
          return <ProfCharges id={DocIdParam} />
        }

        if (DocTypeParam === REC && DocIdParam && DocIdParam !== '' && UserParam === userId) {
          return <Receipt id={DocIdParam} />
        }

        return 'No pdf'
      })()}
    </Container>
  )
}

export default GeneratePdf
