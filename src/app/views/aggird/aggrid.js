import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { generateRows } from '../../components/helpers'

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
        },

    }
}

const columns = [
    {
        field: "id",
        headerName: "Id"
    },
    {
        field: "status",
        headerName: "SLA",
    },
    {
        field: "task",
        headerName: "Tasks",
    },
    {
        field: "amount",
        headerName: "Amount"
    },
    {
        field: "name",
        headerName: "Beneficiary"
    },
    {
        field: "country",
        filter: true,
        headerName: "Company"
    },
    {
        field: "assistant",
        filter: true,
        headerName: "Assistant"
    },
    {
        field: "submitted",
        headerName: "Date Due",
    }
];

const rows = generateRows(130, schema)

class AgGrid extends Component {
    constructor(props) {
        super(props);
        console.log(rows);
        this.state = {
            columnDefs: columns,
            rowData: rows,
            defaultColDef: { resizable: true,
            sortable: true,
        },
        }
    }

    render() {
        return (
            <div className="row main">
                <div className="col">
                    <div className="row page-headerName">
                        <div className="col-12">
                            <h3 className="text-center">ag-Grid Demo</h3>
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
                                <AgGridReact
                                    columnDefs={this.state.columnDefs}
                                    rowData={this.state.rowData}
                                    defaultColDef={this.state.defaultColDef}
                                    pagination={true}
                                    >
                                </AgGridReact>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default AgGrid;