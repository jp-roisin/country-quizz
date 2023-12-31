import { View, Text } from "./Themed";
import { Button as NativeButton, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

type FiltersProps = {
  areFiltersOpen: boolean;
  onPress: () => void;
  nameFilter: string;
  setNameFilter: (name: string) => void;
};

const Filters = ({
  areFiltersOpen,
  onPress,
  nameFilter,
  setNameFilter,
}: FiltersProps) => {
  return (
    <View>
      <View style={styles.header}>
        <NativeButton
          title={areFiltersOpen ? "Close filters" : "Open filters"} // TODO: change text to icon
          onPress={onPress}
        />
      </View>
      {areFiltersOpen && (
        <View style={styles.body}>
          <Text style={styles.title}>Filters</Text>
          <Searchbar
            placeholder="Filter by coyntry name"
            style={styles.searchbar}
            onChangeText={setNameFilter}
            value={nameFilter}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  searchbar: {
    marginHorizontal: 20,
  },
  body: {
    backgroundColor: "#282929",
    height: 200,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
});

export default Filters;
