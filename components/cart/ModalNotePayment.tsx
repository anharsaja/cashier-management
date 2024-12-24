import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, View, Button, StyleSheet, Text, TextInput } from 'react-native';

export default function ModalNotePayment({
	visible,
	onClose,
	catatan,
	submit
}: {
	visible: boolean;
	onClose: () => void;
	catatan: (type: string, text: string) => void;
	submit :() => void
}) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => onClose()}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Catatan</Text>

					<TextInput
						editable
						multiline
						numberOfLines={10}
						style={styles.input}
						placeholder="Tambah Catatan"
						onChangeText={(text) => catatan('catatan', text)}
					/>

					<View style={styles.modalButtons}>
						<Button
							color={Colors.primary.base}
							title="Batal"
							onPress={() => onClose()}
						/>
						<Button
							title="Lanjut"
							color={Colors.primary.base}
							onPress={() => {
								onClose();
								submit();
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
		padding:10,
		marginBottom: 10,
		height: 100,
    justifyContent: "center",
		textAlignVertical:'top',
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 10,
	},
});
