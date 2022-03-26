import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import WebsiteQr from '../assets/website_qr.jpeg';
import PaymentQr from '../assets/payment_qr.jpeg';
const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '33%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '33%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '33%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    qrcode: {
        width: '33%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        padding: 10,
    }
});

const detail = (val) => {
    let jsonVal = JSON.parse(val)
    return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
}
const QrCodeDisplay = () => {
    const rows = (
        <View>
            <View style={styles.row}>
                <Text style={styles.description}>Payment QR Code</Text>
                <Text style={styles.qty}>App QR Code</Text>
                <Text style={styles.rate}>FeedBack QR Code</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.qrcode} src='../assets/payment_qr.jpeg' />
                <Image style={styles.qrcode} src={WebsiteQr} />
                <Image style={styles.qrcode} src={WebsiteQr} />
            </View>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default QrCodeDisplay