import { View, Text, Switch } from "react-native";
import { useState } from "react";
import Colors from "../Constants/Colors";

type Props = {
    enabled: boolean,
    onToggleSwitch: (enabled: boolean) => void;
    canInteract: boolean;
}

export default function SwitchButton({enabled, onToggleSwitch, canInteract} : Props) 
{
  return <Switch

        trackColor={{ false: Colors.tintLight, true: Colors.tint }}
        thumbColor={enabled ? Colors.tint : Colors.greyWhite}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggleSwitch}
        value={enabled}
        style={{height: 20, marginTop: 2}}
        disabled={!canInteract}
      />
}