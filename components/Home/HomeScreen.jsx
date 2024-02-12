import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Dimensions,
  Text,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SearchList from "./SearchList";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        setSearchResults(response.data);
        const places = response.data;
        if (places.length > 0) {
          const place = places[0];
          setSelectedPlace({
            name: place.display_name,
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
          });
        } else {
          console.log("Nie znaleziono miejsc.");
        }
      } catch (error) {
        console.error("Błąd wyszukiwania miejsc:", error);
      }
    }
  };

  const handleReviewSubmit = () => {
    if (selectedPlace) {
      console.log(`Opinia dla miejsca: ${selectedPlace.name}`);
      navigation.navigate("Review", { place: selectedPlace });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Wyszukaj miejsce..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <SearchList
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSelectedPlace={setSelectedPlace}
        setSearchQuery={setSearchQuery}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          selectedPlace
            ? {
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
                latitudeDelta: 0.0075,
                longitudeDelta: 0.0075,
              }
            : undefined
        }
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
          />
        )}
      </MapView>
      <Button title="Dodaj opinię" onPress={handleReviewSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: "absolute",
    top: 40,
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 1,
  },
  calloutView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
  },
  calloutText: {
    fontWeight: "bold",
  },
});

export default HomeScreen;
