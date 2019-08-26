import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { generateRows, paginate, Paginator, VisibilityToggles } from '../../components/helpers'


import moment from 'moment'
import Toolbar from './toolbar'

class AgGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: columns,
            rowData: rows,
            defaultColDef: {
                resizable: true,
                sortable: true,
                rowHeight: 50
            },
            pagination: { // initial pagination settings
                page: 1,
                perPage: 10
            }
        }

        this.onSelect = this.onSelect.bind(this);
        this.onPerPage = this.onPerPage.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.onToggleColumn = this.onToggleColumn.bind(this);
    }



    render() {

        const { pagination, columnDefs } = this.state;
        const toggle = <VisibilityToggles
            columns={columns}
            onToggleColumn={this.onToggleColumn}
        />

        return (
            <div className="row main" style={{ height: '850px' }}>
                <div className="col">
                    <div className="row page-headerName">
                        <div className="col-12">
                            <h3 className="text-center">ag-Grid Demo</h3>
                        </div>
                        <div className="col-12">
                            <h3>Features:</h3>
                            <ul>
                                <li>Sorting</li>
                                <li>Custom pagination</li>
                                <li>Export to CSV</li>
                                <li>Show/hide columns</li>
                                <li>Data 'refresh'</li>
                                <li>Column reorder</li>
                                <li>Column resize</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row page-content">
                        <div className="col-12">
                            <div
                                className="ag-theme-balham"
                                style={{
                                    height: '500px',
                                    width: '100%'
                                }}
                            >
                                <Toolbar toggle={toggle} 
                                         columns={this.state.columnDefs}
                                         export={this.export}
                                         refresh={this.refresh}
                                         updateColumnsState={this.onToggleColumn.bind(this)}>

                                </Toolbar>
                                <AgGridReact
                                    columnDefs={this.state.columnDefs.filter(c => c.isVisible)}
                                    rowData={this.state.rowData}
                                    defaultColDef={this.state.defaultColDef}
                                    pagination={true}
                                    paginationPageSize={pagination.perPage}
                                    onGridReady={this.onGridReady}
                                    rowHeight={42}
                                    headerHeight={42}

                                >
                                </AgGridReact>
                                <Paginator
                                    pagination={pagination}
                                    pages={parseInt(rows.length / pagination.perPage)}
                                    perPage={pagination.perPage}
                                    onSelect={this.onSelect}
                                    onPerPage={this.onPerPage}
                                    goToLastPage={this.goToLastPage}
                                    goToFirstPage={this.goToFirstPage}
                                    goToPage={this.goToPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    refresh = () => {
        const rows = generateRows(130, schema);
        this.setState({
            rowData: rows
        });
    }

    onToggleColumn(selected, event) {

        const columnDefs = this.state.columnDefs;
        const selectedColumn = columnDefs.filter(c => c.field == selected)[0];
        const { isVisible } = selectedColumn;
        const newValue = { ...selectedColumn, isVisible: !isVisible };

        const index = columnDefs.indexOf(selectedColumn);
        columnDefs.splice(index, 1, newValue);
        this.setState({
            columnDefs: columnDefs
        })

        const columnsToDisplay = columnDefs.filter(c => c.isVisible)
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(columnsToDisplay);
        this.sizeToFit();

    }

    export = () => {
        this.gridApi.exportDataAsCsv();
    }

    sizeToFit() {
        this.gridApi.sizeColumnsToFit();
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();

    }

    goToLastPage() {
        const state = this.state;
        const pagination = state.pagination || {};
        const pages = Math.ceil(state.rowData.length / pagination.perPage);
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
            this.state.rowData.length / this.state.pagination.perPage
        );
        const selectedPage = Math.min(Math.max(page, 1), pages);

        this.setState({
            pagination: {
                ...this.state.pagination,
                page: selectedPage
            }
        });
        this.gridApi.paginationGoToPage(selectedPage - 1);
        this.sizeToFit();

    }
    onPerPage(value) {

        this.gridApi.paginationSetPageSize(parseInt(value));
        this.gridApi.paginationGoToPage(0);


        this.setState({
            pagination: {
                page: 1,
                perPage: parseInt(value, 10)
            }
        });
        this.sizeToFit();

    }
}

const idColumn = {
    field: "id",
    headerName: "Id",
    isVisible: false,
};

const statusColumn = {
    field: "status",
    headerName: "SLA",
    cellRenderer: renderStatus,
    isVisible: true,
    width: 90

};

const taskColumn = {
    field: "task",
    headerName: "Tasks",
    isVisible: true
};
const amountColumn = {
    field: "amount",
    headerName: "Amount",
    isVisible: true
};
const nameColumn = {
    field: "name",
    headerName: "Beneficiary",
    isVisible: true
};
const countryColumn = {
    field: "country",
    filter: true,
    headerName: "Company",
    isVisible: true
};
const assistantColumn = {
    field: "assistant",
    filter: true,
    headerName: "Assistant",
    isVisible: true
};
const submittedColumn = {
    field: "submitted",
    headerName: "Date Due",
    cellRenderer: renderDate,
    isVisible: true
};

const columns = [
    idColumn,
    statusColumn,
    taskColumn,
    amountColumn,
    nameColumn,
    countryColumn,
    assistantColumn,
    submittedColumn
];


const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        isRed: {
            type: 'bool'
        },
        task: {
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
        assistant: {
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
        }

    }
}

function renderStatus(status) {

    let td = " <i style='margin:auto; margin-top: 5px;' class='" + status.value + " icon-status'></i>"
    return td;

}

function renderDate(cell) {

    let date = moment(cell.value * 1000).format("MMM. DD, YYYY")

    return date;

}



const rows = generateRows(130, schema)


export default AgGrid;