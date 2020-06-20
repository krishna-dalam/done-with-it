import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppFormPicker from "../components/forms/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    backgroundColor: "#fc5c65",
    name: "floor-lamp",
  },
  { label: "Cars", value: 2, backgroundColor: "#fd9644", name: "car" },
  { label: "Cameras", value: 3, backgroundColor: "#fed330", name: "camera" },
  { label: "Games", value: 4, backgroundColor: "#26de81", name: "cards" },
  {
    label: "Clothing",
    value: 5,
    backgroundColor: "#2bcbba",
    name: "shoe-heel",
  },
  { label: "Sports", value: 6, backgroundColor: "#45aaf2", name: "basketball" },
  {
    label: "Movies & Musffffffic",
    value: 7,
    backgroundColor: "#4b7bec",
    name: "headphones",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "#bc13fe",
    name: "book-open-variant",
  },
  {
    label: "Other",
    value: 9,
    backgroundColor: "grey",
    name: "application",
  },
];

export default function ListingEditScreen() {
  const location = useLocation();

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          maxLength={8}
          keyboardType="numeric"
          name="price"
          placeholder="Price"
          width={120}
        />

        <AppFormPicker
          items={categories}
          name="category"
          placeholder="Category"
          width="50%"
        />

        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
