import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from '@material-ui/pickers';
import {Field} from "formik";


const DatePickerField = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];

    return (
        <DatePicker

            name={field.name}
            value={field.value}
            autoOk
            inputVariant="outlined"
            fullWidth
            label={field.label}
            margin="dense"
            variant="inline"
            format="dd-MM-yyyy"

            // if you are using custom validation schema you probably want to pass `true` as third argument
            onChange={date => form.setFieldValue(field.name, date, false)}
            {...other}
        />
    );
};

export default DatePickerField
