import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

const Index = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Explore content</Text>
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

export default Index;
