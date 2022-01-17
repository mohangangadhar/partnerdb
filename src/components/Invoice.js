import React from 'react';
import { Page, Document, Image, StyleSheet, Text } from '@react-pdf/renderer';
// import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import Jeevamrut from '../assets/jeevamrut_logo.png'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 300,
        height: 150,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const Invoice = ({ order, orderProductList, userData }) => (
    < Document >
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={Jeevamrut} />
            <InvoiceNo invoice={order} />
            <BillTo invoice={userData} />
            <InvoiceItemsTable invoice={orderProductList} order={order} />
            <InvoiceThankYouMsg />
        </Page>
    </Document >
);

export default Invoice;