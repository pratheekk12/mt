import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 400
  }
}));

export default function DistSelect({ multipleDistributorDetails, ...props }) {
  const classes = useStyles();
  const {
    distrtbutorDetails,
    modalValue,
  } = multipleDistributorDetails;

  const [showModal, setShowModal] = useState(modalValue);
  const [showModalID, setShowModalID] = useState({ ID: "" });

  useEffect(() => {
    setShowModalID({
      ID: distrtbutorDetails[0].distributor_id
    });
  }, [])

  const handleChange = (e) => {
    setShowModalID({
      ...showModalID,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    setShowModal(false)
    props.get(showModalID.ID)
  }

  return (
    <div>
      {showModal && (
        <Dialog
          open
          onClose={() => setShowModal(false)}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>Select User Profile</DialogTitle>
          <Divider light />
          <DialogContent>
            <Typography variant="h6">
              <TextField
                fullWidth
                label="Select ID"
                name="ID"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={showModalID.ID}
                variant="outlined"
              >
                {distrtbutorDetails.map((option) => (
                  <option
                    key={option.distributor_id}
                    value={option.distributor_id}
                  >
                    {option.distributor_id}
                  </option>
                ))}
              </TextField>
              <Box style={{ flexBasis: '100%' }}>
                <br />
              </Box>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={
                handleSubmit}
            >
              Submit
              </Button>

          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
