import { useMemo } from "react";
import { View, Text } from "./Themed";
import {
  ImageSourcePropType,
  Button as NativeButton,
  StyleSheet,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { RegionOrWorldwide, regions } from "../services/countries";
import RegionChip from "./RegionChip";

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
  const regionIcons: Record<RegionOrWorldwide, ImageSourcePropType> = {
    Asia: require("../assets/images/asia.png"),
    Africa: require("../assets/images/africa.png"),
    Americas: require("../assets/images/americas.png"),
    Europe: require("../assets/images/europe.png"),
    Oceania: require("../assets/images/oceania.png"),
    WORLDWIDE: require("../assets/images/worldwide.png"),
  };

  const regionOptions: {
    value: RegionOrWorldwide;
    icon: ImageSourcePropType;
  }[] = useMemo(
    () => [
      {
        value: "WORLDWIDE" as RegionOrWorldwide,
        icon: regionIcons["WORLDWIDE"],
      },
      ...regions.map((r) => ({
        value: r,
        icon: regionIcons[r],
      })),
    ],
    [regions, regionIcons],
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
          <View style={styles.regionContainer}>
            <Text style={styles.title}>Filter by region</Text>
            <View style={styles.radioGroup}>
              {regionOptions.map(({ value, icon }, i) => (
                <RegionChip
                  key={i}
                  value={value}
                  isChecked={regionFilter === value}
                  onSelect={(value) =>
                    setRegionFilter(value as RegionOrWorldwide)
                  }
                  icon={icon}
                />
              ))}
            </View>
          </View>
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
  regionContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
  },
});

export default Filters;
