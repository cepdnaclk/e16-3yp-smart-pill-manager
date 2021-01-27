import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getPatients } from "../../services/patientService";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: "100%",
  },
}));

export default function PatientSelect({ onChange, value }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function getP() {
      const response = await getPatients();
      setPatients(response.data);
    }
    getP();
  }, []);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Patient Name...
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {patients.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
