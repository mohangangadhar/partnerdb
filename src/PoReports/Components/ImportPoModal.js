import React from 'react'
import { Box, DialogTitle, Grid, Modal, TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Picker from "../../components/Picker";
import "./PoReports.css"
const ImportPoModal = ({ setPoCreatedBy, setPoCreatedDate, open, handleClose, readUploadFile, sendTotalPoData, importData }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" align={"center"} gutterBottom>
                        Import PO
                    </Typography>
                    <Picker dateChange={(e) => setPoCreatedDate(e.target.value)} label={"Created Date"} />
                    <div className='createdBy'>
                        <label htmlFor="upload">Po created By: </label>
                        <input type="text" placeholder='Enter Po Created By' name="createdBy" onChange={(e) => setPoCreatedBy(e.target.value)} />
                    </div>

                    <div className='newPostForm'>
                        <label htmlFor="upload">Import File</label>
                        <input
                            type="file"
                            name="upload"
                            id="upload"

                            onChange={readUploadFile}
                        />
                    </div>

                    <Box m={2} />
                    <Box textAlign='center'>
                        <Button variant='contained' color="success" onClick={() => sendTotalPoData(importData, "import")}>
                            Submit
                        </Button>
                    </Box>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please check once before submitting the expense.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default ImportPoModal