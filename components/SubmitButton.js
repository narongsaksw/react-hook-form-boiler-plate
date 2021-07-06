import React from 'react';
import {Button} from 'react-native';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
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
  // const {handleSubmit, reset} = useForm();
  // const onPress = () => {
  //   onSubmit();
  //   reset();
  // };
  return (
    // <Item style={{...style}}>
    <Button
      testID={testID}
      // style={style}
      title={title}
      onPress={onSubmit}
      disable={disable}
      {...rest}
    />
    // </Item>
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
