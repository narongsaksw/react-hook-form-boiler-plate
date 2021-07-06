import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '@react-native-community/datetimepicker';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import {Form, Input, Select, AnimatedList, SubmitButton} from './components';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  province: yup.string().required(),
  date: yup.string().required(),
});

const HEIGHT = Dimensions.get('window').height;
export default function App() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      province: '',
      date: new Date(),
    },
  });

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  const animated = new Animated.Value(HEIGHT);
  console.log('errors', errors);
  const d = new Date();
  let hh = +dayjs().format('HH') || 0;

  let MIN_DATE =
    hh >= 22
      ? dayjs().add(
          dayjs.duration({
            days: 1,
            hours: 7,
          }),
        )
      : dayjs().add(7, 'h');
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Input
          testID="firstName"
          control={control}
          name="firstName"
          style={styles.input}
        />
        <Input
          testID="lastName"
          control={control}
          name="lastName"
          style={styles.input}
        />
        <Input
          testID="phoneNumber"
          control={control}
          name="phoneNumber"
          style={styles.input}
        />
        <Select
          testID="province"
          control={control}
          name="province"
          animated={animated}
          style={styles.input}
        />

        <Controller
          name="date"
          control={control}
          render={({field: {onBlur, onChange, value}}) => {
            return (
              <DatePicker
                testID="date"
                mode="date"
                display="spinner"
                value={value}
                minimumDate={MIN_DATE}
                maximumDate={MIN_DATE.add(90, 'd')}
                onChange={(e, date) => onChange(date)}
                onBlur={onBlur}
                // ref={ref}
                style={styles.input}
              />
            );
          }}
        />
        <SubmitButton
          testID="submitButton"
          title="Submit"
          style={{marginTop: 55}}
          onSubmit={handleSubmit(onSubmit)}
        />
      </SafeAreaView>
    </>
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
  inputIOS: {
    marginTop: 15,
    fontSize: 14,
    paddingTop: 7,
    borderColor: '#CBCDCF',
    borderRadius: 10,
    color: '#000',
    borderWidth: 1,
  },
});
