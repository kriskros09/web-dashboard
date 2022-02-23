import React, { FC } from 'react'
import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import moment from 'moment'
//Component
import { Button } from 'components/shared/Button'

import { FullViewLoader } from '../../components/Loader/FullViewLoader'
// Hooks
import { useContent } from '../../hooks'
import useDeviceDetect from '../../hooks/useDeviceDetect'
//Store
import { useStore } from '../../store'
import image from '../../assets/img/logo-pdf.png'

const PO = 'pdf_po'
const PAGE_NAME = [PO]

const ViewerStyle = StyleSheet.create({
  body: {
    width: '100%',
    height: '100vh',
  },
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    fontSize: 10,
    paddingBottom: 10,
  },
  logo: {
    width: '110px',
    height: 'auto',
    paddingBottom: 10,
  },
  businessInfo: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  invoiceInfo: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 1.5,
  },
  clientInfo: {
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },

  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  specialMentions: {
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },

  footer: {
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },

  thxMention: {
    color: '#8bd1e8',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    paddingBottom: 40,
    fontSize: 12,
  },
  primaryColor: {
    color: '#8bd1e8',
  },
  padding: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  tableBody: {
    borderWidth: 1,
    borderColor: '#112131',
    borderStyle: 'solid',
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionOne: {
    fontSize: 9,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
  },
  recap: {
    flexDirection: 'column',
  },
  sectionTwo: {
    fontSize: 9,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  sectionAmount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  tableFooter: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  moneyTotal: {
    fontSize: 9,
    textAlign: 'right',
    width: '30%',
  },
  subTotal: {
    fontSize: 9,
    textAlign: 'right',
    width: '70%',
  },
  border: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#112131',
    borderTop: 0,
  },
  paddingText: {
    padding: 5,
  },
})

type PurchaseOrderparams = {
  id: string
}

// Create Document Component
export const PurchaseOrder: FC<PurchaseOrderparams> = ({ id = '' }) => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAME })
  const { isMobile } = useDeviceDetect()
  const [mandateState, mandateActions] = useStore('Mandates')

  React.useEffect(() => {
    mandateActions.PurchaseOrder({
      poId: id,
    })
  }, [id])

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading || mandateState?.purchaseOrder === null) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const PDF = () => (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            <Image src={image} style={styles.logo} />
            <Text>
              {mandateState?.purchaseOrder?.goAddress.streetNumber}{' '}
              {mandateState?.purchaseOrder?.goAddress.street}
            </Text>
            <Text>
              {mandateState?.purchaseOrder?.goAddress.apartment}{' '}
              {mandateState?.purchaseOrder?.goAddress.city}
            </Text>
            <Text>
              {mandateState?.purchaseOrder?.goAddress.region}{' '}
              {mandateState?.purchaseOrder?.goAddress.postalCode}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text>{content.page.pdf_po.header.title}</Text>
            <Text>
              {content.page.pdf_po.header.label_1} :{' '}
              {moment(mandateState?.purchaseOrder?.orderDate).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.clientInfo}>
          <View style={styles.clientInfo}>
            <Text style={styles.primaryColor}>{content.page.pdf_po.texts.title_1}</Text>
            <Text>{mandateState?.purchaseOrder?.mandateReference}</Text>
          </View>
          <View style={styles.servicesContainer}>
            <View>
              <Text style={styles.primaryColor}>{content.page.pdf_po.texts.title_2} :</Text>
              <Text>
                {mandateState?.purchaseOrder?.userFirstName}{' '}
                {mandateState?.purchaseOrder?.userLastName}
              </Text>
              <Text>
                {mandateState?.purchaseOrder?.userAddress?.streetNumber}{' '}
                {mandateState?.purchaseOrder?.userAddress?.street}
                {mandateState?.purchaseOrder?.userAddress?.apartment}
              </Text>
              <Text>
                {mandateState?.purchaseOrder?.userAddress?.city}{' '}
                {mandateState?.purchaseOrder?.userAddress?.region}
              </Text>
              <Text>{mandateState?.purchaseOrder?.userAddress?.postalCode}</Text>
            </View>
            <View>
              <Text style={[styles.primaryColor]}>{content.page.pdf_po.texts.title_3} :</Text>
              <Text>
                {mandateState?.purchaseOrder?.proLastName} {mandateState?.purchaseOrder?.firmName}
              </Text>
              <Text>
                {mandateState?.purchaseOrder?.proFirstName}{' '}
                {mandateState?.purchaseOrder?.proLastName}
              </Text>
              <Text>
                {mandateState?.purchaseOrder?.firmAddress.streetNumber}{' '}
                {mandateState?.purchaseOrder?.firmAddress.street}
              </Text>

              <Text>
                {' '}
                {mandateState?.purchaseOrder?.firmAddress.city}{' '}
                {mandateState?.purchaseOrder?.firmAddress.region}
              </Text>
              <Text>{mandateState?.purchaseOrder?.firmAddress.postalCode}</Text>
            </View>
          </View>
        </View>
        <View style={styles.specialMentions}>
          <Text>{content.page.pdf_po.texts.text_1}</Text>
        </View>
        <Text style={[styles.specialMentions, { paddingBottom: 15 }]}>
          {content.page.pdf_po.texts.text_2}
        </Text>
        <View style={styles.tableBody}>
          <View style={styles.sectionOne}>
            <View style={styles.recap}>
              <Text>
                {content.page.pdf_po.texts.label_1} :{' '}
                {mandateState?.purchaseOrder?.mandateReference}
              </Text>
            </View>
            {/* Items */}
            {mandateState?.purchaseOrder?.items.map((item) => (
              <View
                key={item.lineId}
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap',
                  },
                ]}
              >
                <Text>{item.name}</Text>
                <Text>{item.price.toFixed(2)}$</Text>
              </View>
            ))}
          </View>
          <View style={styles.sectionTwo}>
            <View style={styles.recap}>
              <Text>{content.page.pdf_po.texts.label_2}</Text>
            </View>
            <Text>{mandateState?.purchaseOrder?.custFeePrice.toFixed(2)}$</Text>
          </View>
        </View>
        <View style={styles.tableFooter}>
          <View style={styles.subTotal}>
            <Text style={styles.paddingText}>{content.page.pdf_po.texts.label_3}</Text>
            {mandateState?.purchaseOrder?.taxes?.map((tax) => (
              <Text key={tax.name} style={styles.paddingText}>
                {tax.name} {content.page.pdf_po.texts.label_4}
              </Text>
            ))}
            <Text style={styles.paddingText}>{content.page.pdf_po.texts.label_5}</Text>
          </View>
          <View style={styles.moneyTotal}>
            <Text style={styles.border}>
              {mandateState?.purchaseOrder?.custSubTotal.toFixed(2)}$
            </Text>
            {mandateState?.purchaseOrder?.taxes.map((tax) => (
              <Text key={tax.name} style={styles.border}>
                {tax.custAmount.toFixed(2)}$
              </Text>
            ))}
            <Text style={styles.border}>{mandateState?.purchaseOrder?.custTotal.toFixed(2)}$</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.padding}>{content.page.pdf_po.texts.text_3}</Text>
          <Text style={styles.thxMention}>{content.page.pdf_po.texts.text_4}</Text>
          <Text style={styles.padding}>{content.page.pdf_po.texts.text_5}</Text>
        </View>
      </Page>
    </Document>
  )

  return (
    <>
      {!isMobile ? (
        <PDFViewer style={ViewerStyle.body}>
          <PDF />
        </PDFViewer>
      ) : (
        <div className="h-screen w-full bg-gray-400 flex">
          <div className="w-9/12 mx-auto text-center text-white self-center	">
            <p className="font-bold mb-20">
              La prévisualisation live du PDF n'est pas supporté par votre navigateur, utilisez le
              lien ci-dessous pour voir votre document
            </p>
            <PDFDownloadLink document={<PDF />} fileName="purchaseOrder.pdf">
              {({ loading }) =>
                loading ? (
                  <Button
                    className="text-primary-dark bg-white"
                    label="Chargement du document..."
                    disabled
                  />
                ) : (
                  <Button className="text-primary-dark bg-white" label="Télécharger" />
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </>
  )
}

export default PurchaseOrder
