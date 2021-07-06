import React from 'react';
import {TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';

import {Item, Label} from './components';

const Input = ({
  name,
  label,
  style,
  testID,
  itemStyle = {},
  defaultValue,
  control,
  ...props
}) => {
  return (
    <Item style={{...itemStyle}}>
      {name && <Label>{name}</Label>}
      <Controller
        name={name}
        control={control}
        render={({
          field: {onBlur, onChange, value, ref},
          fieldState: {error},
        }) => {
          return (
            <>
              <Item style={itemStyle}>
                <TextInput
                  testID={testID}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  ref={ref}
                  style={style}
                />
              </Item>
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </>
          );
        }}
      />
    </Item>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  line: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  errorInside: PropTypes.bool,
  defaultValue: PropTypes.any,
  testID: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
};
export default Input;
