import { View, Text, TextInput } from "react-native";

function ReviewScreen({ route, navigation }) {
  const { place } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{place.name}</Text>
    </View>
  );
}
export default ReviewScreen;
