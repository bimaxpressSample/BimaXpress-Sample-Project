import React from "react";
import { Row } from "react-table";
import PaginationButton from "../PaginationButton/PaginationButton";
import styles from "./ReactTable.module.css";
import { FiCheckSquare } from "react-icons/fi";
import download from "../../../assets/icon/download.svg";

interface ColumnDetails {
	[key: string]: any;
}

const ReactTable = (props: any) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		selected,
	} = props;
	return (
		<>
			<table {...getTableProps()} className="w-full mt-8">
				<thead>
					{headerGroups.map(
						(headerGroup: {
							getHeaderGroupProps: () => JSX.IntrinsicAttributes &
								React.ClassAttributes<HTMLTableRowElement> &
								React.HTMLAttributes<HTMLTableRowElement>;
							headers: any[];
						}) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps()}
										className={`bg-secondary py-3 px-4 text-sm font-semibold text-fontColor text-left ${styles.tableHeader}`}
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						)
					)}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row: Row<ColumnDetails>) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											className="px-4 pt-5 pb-12 border-b border-fontColor-darkGray text-sm text-fontColor font-thin last:border-b-0"
										>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="flex items-center justify-between pt-7">
				<p className="text-sm text-fontColor text-semibold">
					Results:{" "}
					<span className="text-sm text-fontColor pl-1">{page?.length}</span>{" "}
				</p>
				{selected ? (
					<div className="flex items-center">
						<div className="flex items-center text-xs text-fontColor mr-6">
							<FiCheckSquare className="text-fontColor text-lg mr-2 " />
							Selected
						</div>
						<button className={`${styles.downloadBtn}`}>
							<img src={download} alt="icon" className="mr-2" />
							Download
						</button>
					</div>
				) : null}
				<div className="flex">
					<div className="pr-2">
						<PaginationButton
							leftIcon={true}
							handleClick={() => previousPage()}
							disability={!canPreviousPage}
						/>
					</div>
					<PaginationButton
						rightIcon={true}
						handleClick={() => nextPage()}
						disability={!canNextPage}
					/>
				</div>
			</div>
		</>
	);
};

export default ReactTable;
