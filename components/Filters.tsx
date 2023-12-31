import { useMemo } from "react";
import { View, Text } from "./Themed";
import {
  Button as NativeButton,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Searchbar, RadioButton } from "react-native-paper";
import { Region, RegionOrWorldwide, regions } from "../services/countries";

type FiltersProps = {
  areFiltersOpen: boolean;
  onPress: () => void;
  nameFilter: string;
  setNameFilter: (name: string) => void;
  regionFilter: RegionOrWorldwide;
  setRegionFilter: (region: RegionOrWorldwide) => void;
};

const Filters = ({
  areFiltersOpen,
  onPress,
  nameFilter,
  setNameFilter,
  regionFilter,
  setRegionFilter,
}: FiltersProps) => {
  const colorScheme = useColorScheme();
  const regionOptions: { label: string; value: RegionOrWorldwide }[] = useMemo(
    () => [
      { label: "Worldwide", value: "WORLDWIDE" as RegionOrWorldwide },
      ...regions.map((r) => ({ label: r, value: r })),
    ],
    [regions],
  );

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
          <RadioButton.Group
            onValueChange={(newValue) =>
              setRegionFilter(newValue as RegionOrWorldwide)
            }
            value={regionFilter}
          >
            <View style={styles.radioGroup}>
              {regionOptions.map(({ label, value }, i) => (
                <RadioButton.Item
                  key={i}
                  label={label}
                  value={value}
                  labelStyle={{
                    ...styles.radioItem,
                    color: colorScheme === "light" ? "#000" : "#fff",
                  }}
                />
              ))}
            </View>
          </RadioButton.Group>
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
  body: {
    backgroundColor: "#282929",
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    minHeight: 300,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  searchbar: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  radioGroup: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  radioItem: {
    flexBasis: "30%",
    flexShrink: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
});

export default Filters;
