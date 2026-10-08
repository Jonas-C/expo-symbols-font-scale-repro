import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { PixelRatio, ScrollView, StyleSheet, Text, View } from 'react-native';

const SIZES = [16, 24, 32, 48];

export default function App() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Font scale: {PixelRatio.getFontScale()}</Text>
      <Text style={styles.hint}>
        Each red box is the SymbolView's own size × size frame. Raise the system font size: on iOS the symbol stays
        inside its frame, on Android the glyph grows past it.
      </Text>
      {SIZES.map(size => (
        <View key={size} style={styles.row}>
          <SymbolView
            name={{ ios: 'pause.circle', android: 'pause_circle', web: 'pause_circle' }}
            size={size}
            tintColor="black"
            style={styles.frame}
          />
          <Text>size={size}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 96,
    gap: 48,
  },
  heading: { fontWeight: 'bold' },
  hint: { color: '#555' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  frame: { borderWidth: 1, borderColor: 'red' },
});
