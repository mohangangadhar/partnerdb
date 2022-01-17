import React from 'react';
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
// import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import Jeevamrut from '../assets/jeevamrut_logo.png'
import QrCodeDisplay from './QrCodeDisplay';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        marginTop: 10,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 150,
        height: 60,
        marginTop: -16,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const Invoice = ({ order, orderProductList, userData, userId }) => (
    < Document >
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={Jeevamrut} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <InvoiceNo invoice={order} />
                {userId == "GHS5sVHoRShSE2KmLtvVCGue8X82" &&
                    <BillTo invoice={userData} />
                }
            </View>
            <InvoiceItemsTable invoice={orderProductList} order={order} />
            <QrCodeDisplay />
            <InvoiceThankYouMsg />
        </Page>
    </Document >
);

export default Invoice;