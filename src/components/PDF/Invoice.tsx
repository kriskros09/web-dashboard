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

const INVOICE = 'pdf_invoice'
const PAGE_NAME = [INVOICE]

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
  },
  clientInfo: {
    fontSize: 10,
    paddingTop: 20,
    paddingBottom: 20,
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
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#112131',
    borderBottomStyle: 'solid',
    backgroundColor: '#BBBBBB',
    borderBottom: 0,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 11,
  },
  tableBody: {
    borderWidth: 1,
    borderTop: '0',
    borderColor: '#112131',
    borderStyle: 'solid',
    paddingBottom: 20,
    fontSize: 9,
  },
  sectionOne: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#112131',
    borderTopStyle: 'solid',
  },
  recap: {
    flexDirection: 'column',
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
    fontSize: 9,
  },
  moneyTotal: {
    textAlign: 'right',
    width: '30%',
  },
  subTotal: {
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

type InvoiceParams = {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TestPage: FC<InvoiceParams> = ({ id = '' }) => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAME })
  const { isMobile } = useDeviceDetect()
  const [accountingState, accountingActions] = useStore('Accounting')

  React.useEffect(() => {
    accountingActions.Invoice({
      invId: id,
    })
  }, [id])

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading || accountingState?.invoice === null) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const PDF = () => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            <Image src={image} style={styles.logo} />
            <Text>
              {accountingState?.invoice?.goAddress.streetNumber}{' '}
              {accountingState?.invoice?.goAddress.street}
            </Text>
            <Text>
              {accountingState?.invoice?.goAddress.apartment}{' '}
              {accountingState?.invoice?.goAddress.city}
            </Text>
            <Text>
              {accountingState?.invoice?.goAddress.region}{' '}
              {accountingState?.invoice?.goAddress.postalCode}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text>{content.page.pdf_invoice.header.title}</Text>
            <Text>
              {content.page.pdf_invoice.header.label_1} :{' '}
              {moment(accountingState?.invoice?.invoiceDate).format('DD-MM-YYYY')}
            </Text>
            <Text>
              {content.page.pdf_invoice.header.label_2} : {accountingState?.invoice?.invoiceNumber}
            </Text>
          </View>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.primaryColor}>{content.page.pdf_invoice.texts.title_1} :</Text>
          <Text>{accountingState?.invoice?.userCompany}</Text>
          <Text>
            {accountingState?.invoice?.userFirstName} {accountingState?.invoice?.userLastName}{' '}
          </Text>
          <Text>
            {accountingState?.invoice?.userAddress.streetNumber}{' '}
            {accountingState?.invoice?.userAddress.street}
          </Text>
          <Text>
            {accountingState?.invoice?.userAddress.city}{' '}
            {accountingState?.invoice?.userAddress.region}
          </Text>
          <Text>{accountingState?.invoice?.userAddress.postalCode}</Text>
        </View>
        <View style={styles.specialMentions}>
          <Text>{content.page.pdf_invoice.texts.text_1}</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={{ width: '40%' }}>{content.page.pdf_invoice.texts.col_1}</Text>
          <Text style={{ width: '25%', textAlign: 'center' }}>
            {content.page.pdf_invoice.texts.col_2}
          </Text>
          <Text style={{ width: '25%', textAlign: 'center' }}>
            {content.page.pdf_invoice.texts.col_3}
          </Text>
          <Text style={{ width: '10%', textAlign: 'right' }}>
            {content.page.pdf_invoice.texts.col_4}
          </Text>
        </View>
        <View style={styles.tableBody}>
          {accountingState?.invoice?.mandates.map((mandate) => (
            <View key={mandate.mandateReference} style={styles.sectionOne}>
              <View style={styles.recap}>
                <Text style={{ width: '40%' }}>
                  {content.page.pdf_invoice.texts.label_1} : {mandate.mandateReference}
                </Text>
                <Text style={{ width: '40%' }}>
                  {content.page.pdf_invoice.texts.label_2} : {mandate.proFirstName}{' '}
                  {mandate.proLastName}
                </Text>
                <Text style={{ width: '40%' }}>
                  {content.page.pdf_invoice.texts.label_3} : {mandate.internalReference}
                </Text>
              </View>
              {mandate.items.map((item) => (
                <View
                  key={item.lineId}
                  style={[
                    styles.details,
                    {
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'nowrap',
                    },
                  ]}
                >
                  <Text style={{ width: '40%' }}>{item.name}</Text>
                  <Text style={{ width: '25%', textAlign: 'center' }}>
                    {item.price.toFixed(2)}$
                  </Text>
                  <Text style={{ width: '25%', textAlign: 'center' }}>{item.fee.toFixed(2)}$</Text>
                  <Text style={{ width: '10%', textAlign: 'right' }}>
                    {item.subTotal.toFixed(2)}$
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.tableFooter}>
          <View style={styles.subTotal}>
            <Text style={styles.paddingText}>{content.page.pdf_invoice.texts.label_4}</Text>
            {accountingState?.invoice?.taxes?.map((tax) => (
              <Text key={tax.name} style={styles.paddingText}>
                {tax.name} ({tax.taxNumber}) %{tax.rate}
              </Text>
            ))}
            <Text style={styles.paddingText}>{content.page.pdf_invoice.texts.label_5}</Text>
          </View>
          <View style={styles.moneyTotal}>
            <Text style={styles.border}>{accountingState?.invoice?.subTotal.toFixed(2)}$</Text>
            {accountingState?.invoice?.taxes.map((tax) => (
              <Text key={tax.name} style={styles.border}>
                {tax.amount.toFixed(2)}$
              </Text>
            ))}
            <Text style={styles.border}>{accountingState?.invoice?.total}$</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.padding}>{content.page.pdf_invoice.texts.text_2}</Text>
          <Text style={styles.thxMention}>{content.page.pdf_invoice.texts.text_3}</Text>
          <Text style={styles.padding}>{content.page.pdf_invoice.texts.text_4}</Text>
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

export default TestPage
