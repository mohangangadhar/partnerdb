import React from 'react'
import { setstatusvalue } from './Actions';
import Store from "./Store";
import { connect } from 'react-redux';

const CheckRedux = ({ status, setstatusvalue }) => {
    console.log(Store.status);
    const submitHandler = async e => {
        e.preventDefault();
        await setstatusvalue(2);
    }
    return (
        <div style={{ "margin": "80px 0px 10px 0px" }}>
            <center>
                <button type="button" class="btn btn-primary position-relative" onClick={submitHandler}>
                    Total Products
                    <span style={{ color: 'white' }} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {status}
                    </span>
                </button>
                <h1 style={{ color: 'white' }}>{status}</h1>
            </center>
        </div>
    )
}
const mapStateToProps = (state) => ({
    status: state.status
})
export default connect(mapStateToProps, { setstatusvalue })(CheckRedux);
