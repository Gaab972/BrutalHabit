import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, ViewProps } from "react-native";

type Props = ViewProps & {
    isChecked: boolean,
    onPress: () => void,
    disabled: boolean,
}

export default function Checkbox({style, isChecked, onPress, disabled}: Props)
{
    return  <View style={[styles.CheckboxView, style]}>
                <TouchableOpacity onPress={onPress} disabled={disabled}>
                {isChecked ? (
                    <Ionicons name="checkbox" size={25} color="#2F90EB" />
                ) : (
                    <Ionicons name="square-outline" size={25} color="#aaa" />
                )}
                </TouchableOpacity>
            </View>
}

const styles = StyleSheet.create({
    CheckboxView: {
      width: 32,
    },
})
