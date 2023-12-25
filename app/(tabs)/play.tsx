import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

const Play = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Play content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Play;
