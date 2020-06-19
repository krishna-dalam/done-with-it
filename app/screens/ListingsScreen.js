import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";

export default function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await listingsApi.getListings();
    if (!response.ok) return setError(true);

    setError(false);
    setListings(response.data);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
