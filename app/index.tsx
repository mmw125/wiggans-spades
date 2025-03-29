import { Text, View } from "react-native";
import { NameInput, Spades } from "./spades";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spades />
      
    </View>
  );
}
