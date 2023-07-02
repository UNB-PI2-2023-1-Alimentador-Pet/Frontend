import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectPicker = props => {
  return (
    <DropDownPicker
      placeholder={props.placeholder}
      open={props.open}
      value={props.value}
      items={props.items}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={props.setItems}
      multiple={props.multiple}
      min={props.min}
      max={props.max}
      showBadgeDot={props.showBadgeDot}
      badgeDotColors={props.badgeDotColors}
      mode={props.mode}
      textStyle={{
        fontSize: 16,
        fontFamily: 'Inter-Regular',
      }}
      style={{
        borderWidth: 0,
        maxWidth: 200,
      }}
      dropDownContainerStyle={{
        borderWidth: 0,
        maxWidth: 200,
      }}
      dropDownDirection="BOTTOM"
    />
  );
};

export default SelectPicker;
