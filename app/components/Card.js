import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Card({ title, subTitle, imageUrl, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "600",
    marginBottom: 7,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
