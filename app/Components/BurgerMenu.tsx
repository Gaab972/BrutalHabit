import { useState } from "react";
import { View, Image, StyleSheet, Modal, Pressable, Text } from "react-native";
import Colors from "../Constants/Colors";
import Row from "./Row";

export default function BurgerMenu()
{
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
        <View style={styles.Container}>
            <Pressable onPress={() => setIsVisible((prev) => !prev)}>
                {!isVisible && <Image source={require("@/assets/images/burger-bar.png")} style={styles.BurgerMenuIcon}></Image>}
                {isVisible && <Image source={require("@/assets/images/CloseIcon.png")} style={styles.CloseIcon}></Image>}
                <View style={styles.ModalContainer}>
                    <Row style={styles.MenuRow} gap={5}>
                        <Image source={require("@/assets/images/Account.png")} style={styles.MenuIcon}></Image>
                        <Text style={styles.MenuText}>Account</Text>
                    </Row>
                    <Row style={styles.MenuRow} gap={5}>
                        <Image source={require("@/assets/images/padlock.png")} style={styles.MenuIcon}></Image>
                        <Text style={styles.MenuText}>Brutal Mode</Text>
                    </Row>
                </View>
            </Pressable>
            
        </View>
        {/* <Modal transparent visible={isVisible} onRequestClose={() => setIsVisible(false)} animationType="fade">
                <Pressable onPress={() => setIsVisible(false)}>
                    <View style={styles.CloseMenuView}>
                        
                    </View>
                </Pressable>
            </Modal> */}
        </>
    )
}

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    right: 20,
    marginTop: 10,
  },
  CloseMenuView: {
    flex: 1,
    backgroundColor: "red"
  },
  ModalContainer: {
    position: "absolute",
    right: 36,
    backgroundColor: Colors.lightWhite,
    width: 150,
    height: 100,
    borderRadius: 20,
    elevation: 5,
    justifyContent: "space-evenly",
  },
  BurgerMenuIcon: {
    width: 32,
    height: 32,
    opacity: 0.75,
  },
  CloseIcon: {
    width: 32,
    height: 32,
  },
  MenuRow: {
    paddingLeft: 10,
  },
  MenuIcon: {
    width: 28,
    height: 28,
  },
  MenuText: {
    fontSize: 14,
    fontFamily: "Teachers-SemiBold"
  }
});