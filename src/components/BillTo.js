import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20
    },
    billTo: {
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});


const BillTo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.name}</Text>
        <Text>{invoice.mobileNumber}</Text>
        <Text>{invoice.email}</Text>
    </View>
);

export default BillTo