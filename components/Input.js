import React from 'react';
import {View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useFormContext, Controller, useFormState} from 'react-hook-form';

import {Item, Label, ErrorMessage} from './components';

const ErrorBox = styled.View`
  position: ${props => props.errorInside && 'absolute'};
  bottom: ${props => props.errorInside && '5px'};
  padding: ${props => props.errorInside && '8px'};
`;

const Input = ({
  name,
  line = false,
  label,
  style,
  testID,
  itemStyle = {},
  defaultValue,
  isEnabled = true,
  errorInside = false,
  ...props
}) => {
  const {control} = useFormContext();
  const {errors} = useFormState();
  console.log(`errors`, errors);
  return (
    <Item style={{...itemStyle}}>
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        render={({field: {onBlur, onChange, value}}) => {
          return (
            <>
              <Item style={itemStyle}>
                <TextInput
                  editable={isEnabled}
                  testID={testID}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value && value.toString()}
                  defaultValue={defaultValue}
                  style={style}
                  line={line}
                  {...props}
                />
              </Item>
              {errors[name] && (
                <ErrorBox errorInside={errorInside}>
                  {errors[name].type === 'required' ? (
                    <ErrorMessage>* Required</ErrorMessage>
                  ) : (
                    <ErrorMessage>{errors[name].message}</ErrorMessage>
                  )}
                </ErrorBox>
              )}
            </>
          );
        }}
        name={name}
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
