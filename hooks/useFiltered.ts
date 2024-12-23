import { useCallback, useEffect, useMemo, useState } from 'react';
import useDebounce from './useDebounce';

// ini ga tau best practice atau ndak tolong dibetulkan jika belum pas dan optimal
type DataQuery = {
	name?: string;
};

export default function useFiltered<T extends DataQuery>(data: T[]) {
	const [query, setQuery] = useState<string>('');

	const debounceQuery = useDebounce(query, 300);

	const filteredData = useMemo(() => {
		if (!query) return data;
		return data.filter((item) =>
			item.name?.toLowerCase().includes(debounceQuery.toLowerCase())
		);
	}, [data, debounceQuery]);

	const handleSearch = useCallback((term: string) => {
		setQuery(term);
	}, []);

	return {
		query,
		handleSearch,
		filteredData,
	};
}
