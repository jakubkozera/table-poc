import React from 'react'
import { compose } from 'redux';
import * as sort from 'sortabular';
import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import { Home } from './index'
import { generateRows, paginate, Paginator } from '../../components/helpers'

const schema = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		status: {
			type: 'string'
		},
		amount: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		country: {
			type: 'string'
		},
		submitted: {
			type: 'string'
		},
		company: {
			type: 'string'
		},

	}
}

const rows = generateRows(100, schema)// initial rows

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})




class homeController extends React.Component {

	constructor(props) {
		super(props)
		const getSortingColumns = () => this.state.sortingColumns || {};

		const sortable = sort.sort({
			getSortingColumns,
			onSort: selectedColumn => {

				this.setState({
					sortingColumns: sort.byColumn({
						sortingColumns: this.state.sortingColumns,
						selectedColumn
					})
				});
			},

			strategy: sort.strategies.byProperty
		});

		const resetable = sort.reset({
			event: 'onDoubleClick',
			getSortingColumns,
			onReset: ({ sortingColumns }) => { this.setState({ sortingColumns })},
			strategy: sort.strategies.byProperty
		});

		const columns = [
			{
				property: 'status',
				header: {
					label: 'status',
					transforms: [resetable, sortable],
					formatters: [
						sort.header({
							sortable,
							getSortingColumns,
							strategy: sort.strategies.byProperty
						})
					]
				},
				cell: {
					formatters: [
						status => <i className={status + ' icon-status'}></i>
					],
					props: {
						style: {
							width: 15
						}
					}
				}
			},
			{
				property: 'amount',
				header: {
					label: 'amount',
					transforms: [resetable, sortable],
					formatters: [
						sort.header({
							sortable,
							getSortingColumns,
							strategy: sort.strategies.byProperty
						})
					]
				},
				cell: {
					formatters: [
						amount => formatter.format(amount)
					]
				},
				props: {
					style: {
						textAlign: 'right',
						width: 50
					}
				}
			},
			{
				property: 'name',
				header: {
					label: 'beneficiary',
					transforms: [resetable, sortable],
					formatters: [
						sort.header({
							sortable,
							getSortingColumns,
							strategy: sort.strategies.byProperty
						})
					]
				}
			},
			{
				property: 'company',
				header: {
					label: 'company',
					transforms: [resetable, sortable],
					formatters: [
						sort.header({
							sortable,
							getSortingColumns,
							strategy: sort.strategies.byProperty
						})
					]
				}
			},
			{
				property: 'submitted',
				header: {
					label: 'submited',
					transforms: [resetable, sortable],
					formatters: [
						sort.header({
							sortable,
							getSortingColumns,
							strategy: sort.strategies.byProperty
						})
					]
				}
			}
		];

		this.state = {
			searchColumn: 'all',
			query: {}, // Search query
			sortingColumns: {
				'name': {
					direction: 'asc',
					position: 0
				}
			},
			columns,
			rows,
			pagination: { // initial pagination settings
				page: 1,
				perPage: 10
			}
		};
		this.onSelect = this.onSelect.bind(this);
		this.onPerPage = this.onPerPage.bind(this);
		this.goToLastPage = this.goToLastPage.bind(this);
		this.goToFirstPage = this.goToFirstPage.bind(this);
		this.goToPage = this.goToPage.bind(this);
	}

	render() {
		const { rows, columns, sortingColumns, pagination } = this.state;
		const resolvedColumns = resolve.columnChildren({ columns });

		const paginated = compose(
			paginate(pagination),
			sort.sorter({
				columns: resolvedColumns,
				sortingColumns,
				sort: orderBy,
				strategy: sort.strategies.byProperty
			  }),
			  resolve.resolve({
				columns: resolvedColumns,
				method: resolve.nested
			  })
		)(rows);

		const headerRows = resolve.headerRows({ columns });

		const childComp = <Paginator
			pagination={pagination}
			pages={paginated.amount}
			perPage={pagination.perPage}
			onSelect={this.onSelect}
			onPerPage={this.onPerPage}
			goToLastPage={this.goToLastPage}
			goToFirstPage={this.goToFirstPage}
			goToPage={this.goToPage}
		/>

		return (
			<div>
				<Home
					columns={resolvedColumns}
					paginated={paginated}
					paginator={childComp}
					headerRows= {headerRows}
				/>
			</div>
		)
	}
	goToLastPage() {
		const state = this.state;
		const pagination = state.pagination || {};
		const pages = Math.ceil(state.rows.length / pagination.perPage);
		this.onSelect(pages);
	}
	goToPage(page) {
		if (page) this.onSelect(page);
	}
	goToFirstPage() {
		this.onSelect(1);
	}
	onSelect(page) {
		const pages = Math.ceil(
			this.state.rows.length / this.state.pagination.perPage
		);
		this.setState({
			pagination: {
				...this.state.pagination,
				page: Math.min(Math.max(page, 1), pages)
			}
		});
	}
	onPerPage(value) {
		this.setState({
			pagination: {
				...this.state.pagination,
				perPage: parseInt(value, 10)
			}
		});
	}

}


export default homeController;