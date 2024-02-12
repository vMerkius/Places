import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions, Text } from "react-native";
const SearchList = ({
  searchResults,
  setSelectedPlace,
  setSearchResults,
  setSearchQuery,
}) => {
  return (
    <FlatList
      data={searchResults}
      keyExtractor={(item, index) => item.place_id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            setSelectedPlace({
              name: item.display_name,
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lon),
            });
            console.log(item);
            setSearchQuery(`${item.display_name}`);
            setSearchResults([]);
          }}
        >
          <Text style={styles.listItemText}>{item.display_name}</Text>
        </TouchableOpacity>
      )}
      style={styles.resultsList}
    />
  );
};
const styles = StyleSheet.create({
  resultsList: {
    width: Dimensions.get("window").width * 0.9,
    maxHeight: 200,
    backgroundColor: "white",
    position: "absolute",
    top: 80,
    zIndex: 2,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 16,
  },
});
export default SearchList;
