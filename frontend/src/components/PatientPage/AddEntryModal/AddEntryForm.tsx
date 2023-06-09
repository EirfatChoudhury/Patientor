import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent, Input  } from '@mui/material';

import { Discharge, EntryFormValues, EntryType, HealthCheckRating, SickLeave, Diagnosis } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: EntryType
  diagnoses: Diagnosis[]
}

const AddEntryForm = ({ onCancel, onSubmit, type, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [discharge, setDischarge] = useState<Discharge>( { date: undefined, criteria: undefined } );
  const [sickLeave, setSickLeave] = useState<SickLeave>( {startDate: undefined, endDate: undefined} );
  const [employerName, setEmployerName] = useState('');

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case EntryType.Hospital:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge,
          type: "Hospital"
        });
      case EntryType.HealthCheck:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
          type: "HealthCheck"
        });
      case EntryType.OccupationalHealthcare:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave,
          type: "OccupationalHealthcare"
        });
      default:
        assertNever(type)
    }
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      console.log(Object.values(HealthCheckRating))
      const rating = Object.values(HealthCheckRating).find(g => g.toString() === value);
      if (rating) {
        setHealthCheckRating(rating);
      }
    }
  };

  const onCodeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setCodes([value]);
    }
  };

  switch (type) {
    case EntryType.Hospital:
      return (
        <div>
          <form onSubmit={addEntry}>
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={date || ""}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel>Discharge date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={discharge.date || ""}
              onChange={({ target }) => setDischarge( { date: target.value, criteria: discharge.criteria } )}
            />
            <TextField style={{ marginTop: 20 }}
              label="Discharge Criteria"
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) => setDischarge( { date: discharge.date, criteria: target.value } )}
            />
            <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
            <Select
              label="Codes"
              fullWidth
              value={`${diagnosisCodes}` || ""}
              onChange={onCodeChange}
              defaultValue=""
            >
            {Object.values(diagnoses).map(d =>
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            )}
            </Select>
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    case EntryType.HealthCheck:
      return (
        <div>
          <form onSubmit={addEntry}>
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={date || ""}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
            <Select
              label="Rating"
              fullWidth
              value={healthCheckRating || ""}
              onChange={onRatingChange}
              defaultValue=""
            >
            {Object.values(HealthCheckRating).map(option =>
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
            <Select
              label="Codes"
              fullWidth
              value={`${diagnosisCodes}` || ""}
              onChange={onCodeChange}
              defaultValue=""
            >
            {Object.values(diagnoses).map(d =>
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            )}
            </Select>
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <form onSubmit={addEntry}>
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={date || ""}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick leave start date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={sickLeave?.startDate || ""}
              onChange={({ target }) => setSickLeave( { startDate: target.value, endDate: sickLeave?.endDate } )}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick leave end date</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={sickLeave?.endDate || ""}
              onChange={({ target }) => setSickLeave( { endDate: target.value, startDate: sickLeave?.startDate } )}
            />
            <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
            <Select
              label="Codes"
              fullWidth
              value={`${diagnosisCodes}` || ""}
              onChange={onCodeChange}
              defaultValue=""
            >
            {Object.values(diagnoses).map(d =>
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            )}
            </Select>
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    default:
      assertNever(type)
      return(
        <div>

        </div>
      );
  }
};

export default AddEntryForm;