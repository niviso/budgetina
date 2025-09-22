import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const DropdownMenu = ({ children, options, direction = 'down' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const blurIntensity = useSharedValue(0);

  // Animate blur intensity when dropdown is visible
  useEffect(() => {
    if (isVisible) {
      blurIntensity.value = withRepeat(
        withTiming(20, {
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
        1,
        true
      );
    } else {
        blurIntensity.value = 0
    }
  }, [isVisible]);

  const animatedProps = useAnimatedProps(() => ({
    intensity: blurIntensity.value,
  }));

  const handlePress = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPosition({
        top: direction === 'down' ? pageY + height : pageY - 200,
        left: pageX,
        width,
      });
      setIsVisible(true);
    });
  };

  const handleSelect = (option) => {
    setIsVisible(false);
    option.trigger?.();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={buttonRef} onPress={handlePress}>
        {children}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={isVisible}
        transparent
        onRequestClose={() => setIsVisible(false)}
      >
                  <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsVisible(false)}
            style={styles.modalOverlay}
          >
        <AnimatedBlurView
          animatedProps={animatedProps}
          tint="systemChromeMaterial"
          style={styles.modalOverlay}
        >
            <View
              style={[
                styles.dropdown,
                {
                  top: position.top,
                  left: position.left,
                  minWidth: position.width,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
                    </AnimatedBlurView>
          </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 22,
  },
});

export default DropdownMenu;
