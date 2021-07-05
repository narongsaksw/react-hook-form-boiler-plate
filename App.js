import React from 'react';
import {Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
});

export default function App() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {firstName: '', lastName: '', phoneNumber: ''},
  });

  const onSubmit = data => {
    console.log(data);
    reset();
  };
  console.log(errors);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value, ref}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={ref}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>{errors.firstName.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value, ref}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={ref}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>{errors.lastName.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phoneNumber"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    width: 300,
    height: 50,
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
