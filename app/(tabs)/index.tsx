import { useMemo, useState } from "react";
import { Image, StyleSheet, Dimensions, FlatList } from "react-native";

import { Text, View } from "../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getCountryList, RegionOrWorldwide } from "../../services/countries";
import Filters from "../../components/Filters";
import { Link } from "../../components/Link";

const screenWidth = Dimensions.get("window").width;

type RenderItemProps = {
  png: string;
  cca2: string;
};

const Index = () => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [regionFilter, setRegionFilter] =
    useState<RegionOrWorldwide>("WORLDWIDE");

  const handleFilters = () => setAreFiltersOpen((prev) => !prev);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["COUNTRY_LIST"],
    queryFn: getCountryList,
  });

  const countryList = useMemo(
    () =>
      data
        ? data
            .sort((a, b) => {
              if (a.name.common > b.name.common) return 1;
              if (a.name.common < b.name.common) return -1;
              return 0;
            })
            .filter((c) => c.name.common.includes(nameFilter))
            .filter((c) =>
              regionFilter === "WORLDWIDE" ? true : c.region === regionFilter,
            )
        : [],
    [data, nameFilter, regionFilter],
  );

  const renderItem = ({ png, cca2 }: RenderItemProps) => {
    return (
      <Link to="modal" params={{ cca2 }}>
        <View style={styles.card}>
          <Image source={{ uri: png }} style={styles.image} />
        </View>
      </Link>
    );
  };

  return (
    <View
      style={[isLoading || isError ? styles.containerStatus : styles.container]}
    >
      <Filters
        areFiltersOpen={areFiltersOpen}
        onPress={() => handleFilters()}
        nameFilter={nameFilter}
        setNameFilter={(name) => setNameFilter(name)}
        regionFilter={regionFilter}
        setRegionFilter={(region) => setRegionFilter(region)}
      />
      {isLoading && <Text style={styles.statusMessage}>{"Loading..."}</Text>}
      {isError && (
        <Text style={styles.statusMessage}>{"Something went wrong"}</Text>
      )}
      {!!countryList.length && (
        <FlatList
          data={countryList}
          keyExtractor={(item) => item.cca2}
          renderItem={({ item }) =>
            renderItem({ png: item.flags.png, cca2: item.cca2 })
          }
          numColumns={3}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStatus: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  statusMessage: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    margin: 5,
  },
  card: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: screenWidth / 3 - 20, // Divide screen width by the number of columns - 20 for the margin
    height: ((screenWidth / 3 - 20) * 3) / 5, // Height is 3/5 of the width
    resizeMode: "cover",
    borderRadius: 5,
  },
});

export default Index;
