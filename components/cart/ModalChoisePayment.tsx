import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function ModalChoisePayment({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const CustomRadioButton = ({
    label,
    selected,
    onSelect,
  }: {
    label: string;
    selected: boolean;
    onSelect: any;
  }) => (
    <TouchableOpacity
      style={[
        styles.radioButton,
        { backgroundColor: selected ? Colors.primary.base : '#FFF' },
      ]}
      onPress={onSelect}
    >
      <Text
        style={[
          styles.radioButtonText,
          { color: selected ? '#FFF' : Colors.primary.base },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nganggo?</Text>
          <CustomRadioButton
            label='ARTO'
            selected={selectedValue === 'cash'}
            onSelect={() => setSelectedValue('cash')}
          />
          <CustomRadioButton
            label='ALQRIS'
            selected={selectedValue === 'qris'}
            onSelect={() => setSelectedValue('qris')}
          />

          <View style={styles.modalButtons}>
            <Button
              color={Colors.primary.base}
              title='Batal'
              onPress={() => onClose()}
            />
            <Button
              title='Tambah'
              color={Colors.primary.base}
              onPress={() => {
                // setModalVisible(false);
                onClose();
                router.push('/(cart)/payment');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },

  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primary.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
  },
  radioButtonText: {
    fontSize: 16,
  },
});
