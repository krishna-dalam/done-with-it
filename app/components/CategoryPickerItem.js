import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import AppText from "./AppText";

export default function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        backgroundColor={item.backgroundColor}
        name={item.name}
        size={80}
      />
      <AppText style={styles.label}>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    marginTop: 15,
  },
  label: {
    textAlign: "center",
    marginTop: 5,
  },
});
