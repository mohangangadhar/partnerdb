import React, { useState, useEffect } from 'react';

import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import { COLORS } from "../constants/Constants";

const AdminData = ({ data }) => {
    const [vendorData, setVendorData] = useState([]);
    const [realData, setRealData] = useState([]);

    let checkData = [];
    const chartData = async (finData) => {
        console.log(finData);
        for (let i = 0; i < finData.length; i++) {
            // let tempColor = finData[i].deliveryStatus;
            // console.log(tempColor);
            let xyz = {
                status: finData[i].deliveryStatus,
                value: finData[i].noOfOrders,
                color: COLORS.accepted
            };
            checkData.push(xyz);
        }
        console.log(checkData);
        setRealData([...realData, checkData]);
    }

    console.log(data);
    const pushData = async () => {
        let xn =
            data.filter(data => data.vendorName == "Prachin");
        setVendorData(xn);
        await chartData(xn);
    }
    useEffect(async () => {
        await pushData();
    }, []);
    const labelContent = e => e.category;

    return (
        <>
            {realData.length > 3 ?
                <Chart>
                    <ChartTitle text="Applications status - this month" />
                    <ChartLegend visible={true} />
                    <ChartSeries>
                        <ChartSeriesItem
                            type="donut"
                            data={realData}
                            categoryField="status"
                            field="value"
                        >
                            <ChartSeriesLabels
                                color="#fff"
                                background="none"
                                content={labelContent}
                            />
                        </ChartSeriesItem>
                    </ChartSeries>
                </Chart> : <b>Hii</b>
            }
        </>
    )
};

export default AdminData;
