import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export interface selectProps {
  data?: any;
  handleSelectChange?: any;
}

export const SelectComponent = ({ data, handleSelectChange }: selectProps) => {
  let index = 1;
  const classes = useStyles();
  const options = data.data;
  console.log({ options });
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Metrics</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={'Select Metrics'}
          onChange={event => handleSelectChange(event)}
        ></Select>
      </FormControl>
    </>
  );
};
