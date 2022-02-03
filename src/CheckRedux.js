import React from 'react'
import { setstatusvalue } from './Actions';
import { connect } from 'react-redux';

const CheckRedux = ({ status, setstatusvalue }) => {
    console.log(status);
    return (
        <div style={{ "margin": "80px 0px 10px 0px" }}>
            <center>
                <button type="button" class="btn btn-primary position-relative" onClick={() => setstatusvalue(1)}>
                    Total Products
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {status}
                    </span>
                </button>
            </center>
        </div>
    )
}
const mapStateToProps = state => ({
    status: state.status
})
export default connect(mapStateToProps, { setstatusvalue })(CheckRedux);
