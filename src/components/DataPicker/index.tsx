import React, { useRef, useEffect, useState, forwardRef } from 'react';

import { useField } from '@unform/core';

import DateTimePickerModal, {DateTimePickerProps} from "react-native-modal-datetime-picker";

import { Button, StyleSheet } from 'react-native';

import { Input } from './styles';

import moment from 'moment';

interface Props extends Omit<DateTimePickerProps, 'onChange'> {
  // interface Props extends Picker {
  name: string;
  label: string;
}

const DataPicker: React.FC<Props> = ({
  name,
  label,
  ...rest
}) => {
  const pickerRef = useRef<any>(new Date(2020,11,20));
  const { fieldName, registerField, defaultValue = new Date(2020,11,10), error } = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  var dt = new Date()

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleDateConfirm = (date: Date) => {
    console.log(date)
    setSelectedValue(moment(date).format('YYYY-MM-DD'));

    dt = moment(date).format('YYYY-MM-DD')
    console.log('log' + dt)
    hideDatePicker();
  };

  useEffect(() => {  
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        console.log('ref' + selectedValue)
        return selectedValue;
      },
      setValue: (_, value: Date) => {
        console.log('value' + selectedValue)
        setSelectedValue(moment(value).format('YYYY-MM-DD'));
      },
    });
  }, [fieldName, registerField]);
  
  return (
    <>
    
    <Input
                name="date"
                value={selectedValue}
                placeholder="Data"
                onFocus={showDatePicker} />

      {show && (
        <DateTimePickerModal
        ref={pickerRef}
        isVisible={show}
          testID="dateTimePicker"
          mode={mode}
          display="default"   
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker} 
          {...rest}>

        </DateTimePickerModal>
        
      )}
      
      { error && <Text>{error}</Text>}
    </>
  );
};


const styles = StyleSheet.create({
    picker: {
      height: 50, 
      width: '100%',
      color: '#aaaaaa',
      fontFamily: 'Poppins_400Regular',
      fontSize: 16
    }
});

export default DataPicker;