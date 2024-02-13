import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
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

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const placeName = response.data.display_name;
      if (placeName) {
        setSearchQuery(placeName);
        setSelectedPlace({
          name: placeName,
          latitude,
          longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
    }
  };

  const handleReviewSubmit = () => {
    if (selectedPlace) {
      console.log(`Opinia dla miejsca: ${selectedPlace.name}`);
      navigation.navigate("Review", { place: selectedPlace });
    }
  };
  const clearSearchResults = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Wyszukaj miejsce..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSearchResults}
        >
          <Text style={styles.clearButtonText}>X</Text>
        </TouchableOpacity>
      </View>
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
        onPress={handleMapPress}
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
  searchContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "black",
    fontWeight: "bold",
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
