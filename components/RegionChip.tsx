import { ImageSourcePropType } from "react-native";
import { Card, Chip } from "react-native-paper";

type MyRadioButtonProps = {
  value: string;
  onSelect: (value: string) => void;
  isChecked: boolean;
  icon: ImageSourcePropType;
};

const RegionChip = ({
  value,
  isChecked,
  onSelect,
  icon,
}: MyRadioButtonProps) => {
  return (
    <Chip
      onPress={() => onSelect(value)}
      style={{
        ...styles.card,
        backgroundColor: isChecked ? "#31672F" : "transparent",
      }}
    >
      <Card.Cover source={icon} style={styles.icon} />
    </Chip>
  );
};

const styles = {
  card: {
    padding: 10,
  },
  icon: {
    width: 100,
    height: 100,
    backgroundColor: "transparent",
  },
};

export default RegionChip;
