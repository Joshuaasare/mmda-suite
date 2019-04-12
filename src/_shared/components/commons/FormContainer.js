// @flow
import React from 'react';
import { View } from 'react-native';
import { ListHeader } from '.';
import { FormDetails } from '../../../Shops';

type Props = {
  sectionHeaderTextStyle: Object,
  sectionHeaderIconName: string,
  sectionHeaderIconSize: number,
  sectionHeaderText: string,
  data: Array<{ title: string, subtitle: string }>,
};
const FormContainer = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.sectionHeaderViewStyle}>
      <ListHeader
        style={{ ...props.sectionHeaderTextStyle }}
        iconName={props.sectionHeaderIconName}
        iconSize={props.sectionHeaderIconSize}
        headerText={props.sectionHeaderText}
      />
    </View>
    <FormDetails data={props.data} />
  </View>
);

const styles = {
  container: {
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 7,
    backgroundColor: 'white',
  },
  sectionHeaderViewStyle: {
    marginBottom: 10,
  },
};

export { FormContainer };
