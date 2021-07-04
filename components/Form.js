import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const Form = ({defaultValues = {}, children, onSubmit, schema}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods} onSubmit={onSubmit}>
      <View>{children}</View>
    </FormProvider>
  );
};

Form.propTypes = {
  defaultValues: PropTypes.object,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object,
};

export default Form;
