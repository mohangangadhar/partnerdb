import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SpanningTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    "desc": "Paperclips (Box)",
                    "qty": 100,
                    "unit": 5,
                    "price": 1.15
                },
                {
                    "desc": "Paper (Case)",
                    "qty": 120,
                    "unit": 3,
                    "price": 1.15
                },
                {
                    "desc": "Waste Basket",
                    "qty": 1010,
                    "unit": 5,
                    "price": 11.15
                }


            ]
        }
        // createRow('Paperclips (Box)', 100, 1.15),
        //     createRow('Paper (Case)', 10, 45.99),
        //     createRow('Waste Basket', 2, 17.99),

    }

    componentDidMount() {
        this.setState()
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }));

        return (
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{120}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(0.5 * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{100}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{130}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default SpanningTable;