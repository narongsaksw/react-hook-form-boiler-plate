import React from 'react';
import {Button} from 'react-native';
import PropTypes from 'prop-types';
import {useFormContext, useForm} from 'react-hook-form';
import {Item} from './components';
// import Button from 'components/Button'

const SubmitButton = ({
  title,
  style,
  testID,
  disable = false,
  onSubmit,
  ...rest
}) => {
  //   const {handleSubmit, onSubmit, reset} = useFormContext();
  const {handleSubmit, reset} = useForm();
  return (
    <Item>
      <Button
        testID={testID}
        style={style}
        title={title}
        // onPress={handleSubmit((data, e) => onSubmit(data, e, reset))}
        disable={disable}
        {...rest}
      />
    </Item>
  );
};

SubmitButton.propTypes = {
  title: PropTypes.string,
  disable: PropTypes.bool,
  modal: PropTypes.bool,
  style: PropTypes.object,
  fontSize: PropTypes.string,
  testID: PropTypes.string.isRequired,
};

export default SubmitButton;
