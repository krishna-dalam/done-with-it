import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Image } from "react-native";
import Screen from "./app/components/Screen";
import ImageInputList from "./app/components/ImageInputList";
import ListingEditScreen from "./app/screens/ListingEditScreen";

export default function App() {
  return <ListingEditScreen />;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#f8f4f4",
  },
});
