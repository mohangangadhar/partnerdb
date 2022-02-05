import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart, registerables, ArcElement, Defaults } from "chart.js";

Chart.register(...registerables);

const AdminData = (props) => {
    const { newOrdersData, processingOrdersData, pendingOrdersData, completeOrdersData, cancelOrdersData } = props;
    return (
        <div>
            <Bar
                data={{
                    labels: [`NEW : ${newOrdersData}`, `PROCESSING : ${processingOrdersData}`,
                    `PENDING : ${pendingOrdersData}`, `COMPLETED : ${completeOrdersData}`,
                    `CANCELLED : ${cancelOrdersData}`],
                    datasets: [
                        {
                            label: 'Orders',
                            data: [newOrdersData, processingOrdersData, pendingOrdersData, completeOrdersData
                                , cancelOrdersData],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            hoverBackgroundColor: "green",
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {  // not 'yAxes: [{' anymore (not an array anymore)
                            ticks: {
                                color: "white",
                                // fontSize: 18,
                                font: {
                                    size: 14,
                                },

                                beginAtZero: true
                            }
                        },
                        x: {
                            ticks: {
                                color: "white",
                                font: {
                                    size: 14
                                },

                                beginAtZero: true
                            }
                        }
                    },
                    legend: {
                        labels: {
                            color: "blue",  // not 'fontColor:' anymore
                            // fontSize: 18  // not 'fontSize:' anymore
                            font: {
                                size: 18 // 'size' now within object 'font {}'
                            }
                        },
                    },
                }}
            />
        </div>
    )
}

export default AdminData