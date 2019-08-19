import React from 'react'
import { Button } from '@progress/kendo-react-buttons';
import Moment from 'react-moment';
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

class DateTimeCell extends React.Component {
    render() {
        const timestamp = this.props.dataItem.submitted * 1000;
        const dateTime = new Date(timestamp);

        return (
            <td>
                <Moment format="MMM. DD, YYYY" date={dateTime} />
            </td>
        );

    }
}

const dateTimeCell = (props) => <DateTimeCell {...props} />;

const columns = [
    {
        field: "id",
        hide: true,
        title: "Id"
    },
    {
        field: "status",
        title: "SLA",
        cell: statusCell,
        hide: false,
        width: "60px"
    },
    {
        field: "task",
        title: "Tasks",
        hide: false,
    },
    {
        field: "amount",
        hide: false,
        title: "Amount"
    },
    {
        field: "name",
        hide: false,
        title: "Beneficiary"
    },
    {
        field: "country",
        hide: false,
        title: "Company"
    },
    {
        field: "assistant",
        hide: false,
        title: "Assistant"
    },
    {
        field: "submitted",
        hide: false,
        title: "Date Due",
        cell: dateTimeCell
    }
];


const rows = generateRows(130, schema)
class KendoGrid extends React.Component {

    _export;
    updateColumnsState(column, checked) {

        const columns = this.state.columns;
        const selectedColumn = columns.filter(c => c.field == column)[0];
        const newValue = { ...selectedColumn, hide: !checked };

        const index = columns.indexOf(selectedColumn);
        columns.splice(index, 1, newValue);
        this.setState({
            columns: columns
        })

    }
    rowRender(trElement, props) {

        const isRed = props.dataItem.isRed;
        const red = { color: "red" };
        const trProps = { style: isRed ? red : {} };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
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
                                {/* <input
                                    style={{ padding: '3px' }}
                                    className="k-checkbox"
                                    id={'checkbox-'}
                                    type="checkbox"
                                />
                                <label
                                    htmlFor={'checkbox-'}
                                    className="k-checkbox-label"
                                    style={{ marginLeft: '3px' }}
                                >
                                    <span style={{ paddingLeft: '10px',  paddingRight: '10px'}}>Test</span>
                            </label> */}

                        </div>
                    </div>
                    <div className="row page-content">
                        <div className="col-12">
                            <ExcelExport
                                data={rows}
                                ref={(exporter) => { this._export = exporter; }}
                            >
                                <Grid
                                    rowRender={this.rowRender}
                                    style={{ maxWidth: '100%', overflow: 'auto', border: '0px', borderTop: 'solid 1px #cfcfcf' }}
                                    data={orderBy(rows, this.state.sort).slice(this.state.skip, this.state.take + this.state.skip)}
                                    sortable
                                    resizable
                                    scrollable={'none'}
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
                                    <GridToolbar style={{ backgroundColor: 'white' }}>
                                        <div style={{ float: 'right' }}>
                                            <Button
                                                title="Filter"
                                                icon='sort-desc'
                                            >
                                            </Button>
                                            <Button
                                                title="Refresh"
                                                iconClass='fa fa-sync-alt'
                                            >
                                            </Button>
                                            <ColumnsSelect
                                                columns={this.state.columns}
                                                icon='fa fa-sliders-h'
                                                updateColumnsState={this.updateColumnsState.bind(this)}
                                            >
                                            </ColumnsSelect>
                                            <Button
                                                title="Export PDF"
                                                iconClass='fa fa-download'
                                                onClick={this.export}
                                            >
                                            </Button>

                                        </div>

                                    </GridToolbar>
                                    {this.state.columns.map((column, idx) =>
                                        !column.hide && (<Column key={idx} {...column} />)
                                    )}
                                             <div class="k-loading-mask">
              <span class="k-loading-text">Loading</span>
              <div class="k-loading-image"></div>
              <div class="k-loading-color"></div>
          </div>
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