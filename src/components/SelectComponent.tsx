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
  selected?: string;
  title?: string;
}

export const SelectComponent = ({ title, data, handleSelectChange, selected }: selectProps) => {
  const classes = useStyles();
  let opt = Array.from(data);
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">{title}</InputLabel>
        <br />
        <br />
        <Select labelId="select-label" id="select" value={selected} onChange={event => handleSelectChange(event)}>
          {opt.map((option: any, index: any) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
