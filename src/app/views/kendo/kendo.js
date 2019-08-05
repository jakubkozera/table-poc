import React from 'react'
import { Button } from '@progress/kendo-react-buttons';

import { orderBy } from '@progress/kendo-data-query';
import { Grid, GridToolbar, GridColumn as Column } from '@progress/kendo-react-grid';
import { generateRows } from '../../components/helpers'
import { ExcelExport } from '@progress/kendo-react-excel-export';
import ColumnsSelect from './columnSelect'

import '@progress/kendo-theme-default/dist/all.css';

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
class CustomCell extends React.Component {
    render() {

        const status = this.props.dataItem.status;
        return (
            <td>
                <i style={{ marginLeft: 'auto', marginRight: 'auto' }} className={status + ' icon-status'}></i>
            </td>
        );
    }
}

const statusCell = (props) => <CustomCell {...props} />;

const columns = [{
        field: "id",
        hide: true,
        title: "Id"
    }, {
        field: "status",
        title: "Status",
        cell: statusCell,
        hide: false,
        width: "90px"
    },
    {
        field:"amount",
        hide: false,
        title:"Amount" 
    },
    {
        field:"name",
        hide: false,
        title:"Beneficiary"
    },
    {
        field:"country",
        hide: false,
        title:"Company"
    },
    {
        field:"submitted",
        hide: false,
        title:"Submited"
    }
];


const rows = generateRows(130, schema)
class KendoGrid extends React.Component {

    _export;
    updateColumnsState(column, checked) {

        const columns = this.state.columns;
        const selectedColumn = columns.filter(c => c.field == column)[0];
        const newValue = {...selectedColumn, hide: !checked};
        console.log('newValue');
        console.log(newValue);
        const index = columns.indexOf(selectedColumn);
        columns.splice(index, 1, newValue);
        this.setState({
            columns: columns
        })

    }

    export = () => {
        this._export.save();
    }
    state = {
        columns: columns,
        sort: [
            { field: 'status', dir: 'asc' }
        ],
        skip: 0,
        take: 10,
        pageable: this.state ? this.state.pageable : {
            buttonCount: 5,
            info: true,
            type: 'input',
            pageSizes: true,
            previousNext: true
        }
    }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    StatusCell = (props) => <CustomCell {...props} myProp={this.customData} />

    render() {


        return (

            <div className="row main">
                <div className="col">
                    <div className="row page-title">
                        <div className="col-12">
                            <h3 className="text-center">Kendo Grid Demo</h3>
                        </div>
                    </div>
                    <div className="row page-content">
                        <div className="col-12">
                            <ExcelExport
                                data={rows}
                                ref={(exporter) => { this._export = exporter; }}
                            >
                                <Grid
                                    style={{ height: '600px' }}
                                    data={orderBy(rows, this.state.sort).slice(this.state.skip, this.state.take + this.state.skip)}
                                    sortable
                                    resizable
                                    reorderable
                                    sort={this.state.sort}
                                    skip={this.state.skip}
                                    take={this.state.take}
                                    total={rows.length}
                                    pageable={this.state.pageable}
                                    pageSize={this.state.pageSize}
                                    onPageChange={this.pageChange}
                                    onSortChange={(e) => {
                                        this.setState({
                                            sort: e.sort
                                        });
                                    }}
                                >
                                    <GridToolbar>
                                        <div style={{ float: 'right'}}>
                                            <Button
                                                title="Export PDF"
                                                icon={'file-excel'}
                                                onClick={this.export}
                                            >
                                            </Button>
                                            <ColumnsSelect 
                                                columns={this.state.columns}
                                                updateColumnsState={this.updateColumnsState.bind(this)}
                                            >
                                            </ColumnsSelect>
                                        </div>

                                    </GridToolbar>
                                    {this.state.columns.map((column, idx) =>
                                        !column.hide && (<Column key={idx} {...column} />)
                                    )}
                                </Grid>
                            </ExcelExport>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default KendoGrid;