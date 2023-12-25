import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../../services/countries";

const Index = () => {
  const { data } = useQuery({
    queryKey: ["all_countries"],
    queryFn: getAllCountries,
  });
  console.log(data?.map((c) => c.flag));

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
