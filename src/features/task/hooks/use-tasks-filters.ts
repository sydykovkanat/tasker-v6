import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Filters {
	projectId?: string;
	performerId?: string;
	statusId?: string;
	departmentId?: string;
	query: string;
}

export function useTasksFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const projectId = searchParams.get('projectId') || 'all';
	const performerId = searchParams.get('performerId') || 'all';
	const statusId = searchParams.get('statusId') || 'all';
	const departmentId = searchParams.get('departmentId') || 'all';
	const query = searchParams.get('query') || '';

	const [filters, setFilters] = useState<Filters>({
		statusId,
		projectId,
		performerId,
		departmentId,
		query,
	});

	const handleProjectChange = (newProjectId: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (newProjectId && newProjectId !== 'all') {
			newSearchParams.set('projectId', newProjectId);
			setFilters((prev) => ({
				...prev,
				projectId: newProjectId,
			}));
		} else {
			newSearchParams.delete('projectId');
			setFilters((prev) => ({
				...prev,
				projectId: 'all',
			}));
		}
		setSearchParams(newSearchParams);
	};

	const handleSubordinateChange = (newPerformerId: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (newPerformerId && newPerformerId !== 'all') {
			newSearchParams.set('performerId', newPerformerId);
			setFilters((prev) => ({
				...prev,
				performerId: newPerformerId,
			}));
		} else {
			newSearchParams.delete('performerId');
			setFilters((prev) => ({
				...prev,
				performerId: 'all',
			}));
		}
		setSearchParams(newSearchParams);
	};

	const handleStatusChange = (newStatusId: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (newStatusId && newStatusId !== 'all') {
			newSearchParams.set('statusId', newStatusId);
			setFilters((prev) => ({
				...prev,
				statusId: newStatusId,
			}));
		} else {
			newSearchParams.delete('statusId');
			setFilters((prev) => ({
				...prev,
				statusId: 'all',
			}));
		}
		setSearchParams(newSearchParams);
	};

	const handleQueryChange = (newQuery: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (newQuery && newQuery !== '') {
			setFilters((prev) => ({
				...prev,
				query: newQuery,
			}));
			newSearchParams.set('query', newQuery);
		} else {
			setFilters((prev) => ({
				...prev,
				query: '',
			}));
			newSearchParams.delete('query');
		}
		setSearchParams(newSearchParams);
	};

	const handleDepartmentChange = (newDepartmentId: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (newDepartmentId && newDepartmentId !== 'all') {
			newSearchParams.set('departmentId', newDepartmentId);
			setFilters((prev) => ({
				...prev,
				departmentId: newDepartmentId,
			}));
		} else {
			newSearchParams.delete('departmentId');
			setFilters((prev) => ({
				...prev,
				departmentId: 'all',
			}));
		}
		setSearchParams(newSearchParams);
	};

	return {
		handleProjectChange,
		handleSubordinateChange,
		handleStatusChange,
		handleQueryChange,
		handleDepartmentChange,
		projectId: filters.projectId,
		performerId: filters.performerId,
		statusId: filters.statusId,
		query: filters.query,
		departmentId: filters.departmentId,
	};
}
