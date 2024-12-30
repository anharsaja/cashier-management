import LoadingScreen from '@/components/LoadingScreen';
import useReport from '@/hooks/useReport';
import { View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function ReportProductDayScreen() {
	const { report, status } = useReport();
	const tableHead = ['Barang', 'Terjual'];
	const tableData = report.map((item) => [item.name, item.count.toString()]);

	if (status == 'loading') {
		return <LoadingScreen message="Sabar" />;
	}

	return (
		<View style={styles.container}>
			<Table borderStyle={styles.tableBorder}>
				<Row
					data={tableHead}
					style={styles.head}
					textStyle={styles.headText}
				/>
				<Rows
					data={tableData}
					textStyle={styles.text}
				/>
			</Table>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 30,
		backgroundColor: '#ffffff',
	},
	head: {
		height: 40,
		backgroundColor: '#f1f8ff',
	},
	text: {
		margin: 6,
		textAlign: 'center',
	},
	headText: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	tableBorder: {
		borderWidth: 1,
		borderColor: '#c8e1ff',
	},
});
