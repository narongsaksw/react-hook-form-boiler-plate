import React from 'react';
import {
  Animated,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Label} from './components';
import {Controller} from 'react-hook-form';

const data = [
  {
    id: 1,
    name: 'Thailand',
  },
  {
    id: 2,
    name: 'USA',
  },
  {
    id: 3,
    name: 'China',
  },
];

const Item = ({item, onChange, onClose}) => {
  const onSelected = () => {
    onChange(item.name);
    onClose();
  };
  return (
    <View>
      <TouchableOpacity onPress={onSelected}>
        {/* <TouchableOpacity onPress={() => console.log(item)}> */}
        <View>
          <View
            style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}>
            <Text>{item.name}</Text>
          </View>
          <View>
            {/* {selected && (
              <Image
                source={Images.checkbox_right_circle}
                style={styles.image}
              />
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const List = ({testID, animated, onChange}) => {
  const onClose = () => {
    Animated.timing(animated, {
      toValue: HEIGHT,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{backgroundColor: 'green'}}>
      <Animated.View
        style={[
          {
            // position: 'absolute',
            transform: [{translateY: animated}],
          },
        ]}>
        <View style={styles.containerHeader}>
          <TouchableOpacity onPress={onClose} style={styles.touchOpacity}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapFlatlist}>
          <FlatList
            testID={testID}
            data={data}
            //   extraData={extraData}
            keyExtractor={item => item.id}
            renderItem={({item}) => Item({item, onChange, onClose})}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const Select = ({label, name, control, itemStyle, testID, style, animated}) => {
  const onOpen = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{...itemStyle}}>
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
              <TouchableOpacity onPress={onOpen}>
                <TextInput
                  testID={testID}
                  editable={false}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="select"
                  style={{
                    ...style,
                  }}
                />
                <List onChange={onChange} animated={animated} />
                {/* {List({onChange, animated})} */}
              </TouchableOpacity>
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    height: WIDTH * 0.166,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  touchOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WIDTH * 0.05,
    height: WIDTH * 0.05,
  },
  wrapTitle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 23,
    //   fontFamily: FONTS.BOLD,
  },
  wrapFlatlist: {
    // flex: 1,
    // backgroundColor: '#ffffff',
    backgroundColor: 'red',
  },
});

export default Select;
