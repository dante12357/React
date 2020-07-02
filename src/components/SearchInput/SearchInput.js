import React, {Component} from 'react';
import {Input} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import './searchInput.css'

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: '8px',
    display: 'flex',
    flexBasis: 420,
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)'

  },
  icon: {
    marginRight: '8px',
    color: '#546e7a'
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));
const SearchInput = props => {
  const { value, onChange,className, ...rest} = props

  const classes = useStyles();
  return(
    <Paper
      {...rest}
      className={clsx(classes.root, className)}

    >

      <SearchIcon className="icon" />
      <Input
        className={classes.input}
        placeholder={'Введите имя'}
        value={value}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  )
}

SearchInput.propType ={
  onChange: PropTypes.func,
  value: PropTypes.func,

}

export default SearchInput;
