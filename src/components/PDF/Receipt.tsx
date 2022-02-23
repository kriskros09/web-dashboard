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

const RECEIPT = 'pdf_receipt'
const PAGE_NAME = [RECEIPT]

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
    fontSize: 9,
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

  specialMentions: {
    fontSize: 9,
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    lineHeight: '2',
  },

  recap: {
    fontSize: 9,
    lineHeight: 2,
    paddingTop: 30,
  },
  primaryColor: {
    color: '#8bd1e8',
  },
  padding: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  moneyTotal: {
    fontSize: 12,
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

type ReceiptParams = {
  id: string
}
// Create Document Component
export const Receipt: FC<ReceiptParams> = ({ id = '' }) => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAME })
  const { isMobile } = useDeviceDetect()
  const [accountingState, accountingActions] = useStore('Accounting')

  React.useEffect(() => {
    accountingActions.Deposit({
      depId: id,
    })
  }, [id])

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading || accountingState?.deposit === null) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const PDF = () => (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            <Image src={image} style={styles.logo} />
            <Text>
              {accountingState?.deposit?.goAddress?.texts[0]?.name}

              {/* {mandateState?.deposit?.goAddress.street}, */}
            </Text>
            {/* <Text>
                {mandateState?.purchaseOrder?.goAddress.apartment}
                {mandateState?.purchaseOrder?.goAddress.city},
              </Text>
              <Text>
                {mandateState?.purchaseOrder?.goAddress.region}
                {mandateState?.purchaseOrder?.goAddress.postalCode}
              </Text> */}
          </View>
          <View style={styles.invoiceInfo}>
            <Text>
              {content?.page?.pdf_receipt.Header.label_1} :{' '}
              {moment(accountingState?.deposit?.payDate).format('DD-MM-YYYY')}
            </Text>
            <Text>
              {content?.page?.pdf_receipt.Header.label_2} :{' '}
              {moment(accountingState?.deposit?.payDate).utc().format('HH:MM')}
            </Text>
            <Text>
              {content?.page?.pdf_receipt.Header.label_3} :{' '}
              {accountingState?.deposit?.depositNumber}
            </Text>
          </View>
        </View>
        <View style={styles.specialMentions}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {content.page.pdf_receipt.texts.main_title}
          </Text>
          <Text style={{ fontSize: 9 }}>{content.page.pdf_receipt.texts.article_qc}</Text>
        </View>
        <View style={styles.recap}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '20%' }}>{content.page.pdf_receipt.texts.label_1} :</Text>
            <Text>
              {accountingState?.deposit?.payMethod} {content.page.pdf_receipt.texts.label_2}{' '}
              {accountingState?.deposit?.userFirstName} {accountingState?.deposit?.userLastName}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '20%' }}>{content.page.pdf_receipt.texts.label_3} :</Text>
            <Text>{accountingState?.deposit?.amount.toFixed(2)}$</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '20%' }}>{content.page.pdf_receipt.texts.label_4} :</Text>
            <Text key={accountingState?.deposit?.mandates[0].mandateReference}>
              {accountingState?.deposit?.mandates[0].mandateReference}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '20%' }}>{content.page.pdf_receipt.texts.label_5} :</Text>
            <Text>
              {' '}
              {accountingState?.deposit?.userFirstName} {accountingState?.deposit?.userLastName}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '20%' }}>{content.page.pdf_receipt.texts.label_6} :</Text>
            <Text>
              {content.page.pdf_receipt.texts.text_1}{' '}
              {accountingState?.deposit?.mandates[0].proFirstName}{' '}
              {accountingState?.deposit?.mandates[0].proLastName}
            </Text>
          </View>
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

export default Receipt
