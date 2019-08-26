import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridToolbar, GridColumn as Column } from '@progress/kendo-react-grid';
import ColumnsSelect from './columnSelect'

import '@progress/kendo-theme-default/dist/all.css';


const Toolbar = (props) =>
    <div className="row toolbar">
        { console.log(props) }
        <div className="col-12">
            <GridToolbar style={{ backgroundColor: 'white' }}>
                <div style={{ float: 'right' }}>
                    <Button
                        title="Filter"
                        icon='sort-desc'
                        onClick={ () => { alert('ag-Grid default filtering button on hover for columns: Company, Assistant')}}
                    >
                    </Button>
                    <Button
                        title="Refresh"
                        iconClass='fa fa-sync-alt'
                        onClick={props.refresh}
                    >
                    </Button>
                    <ColumnsSelect
                        columns={props.columns}
                        icon='fa fa-sliders-h'
                        updateColumnsState={props.updateColumnsState}
                    >
                    </ColumnsSelect>
                    <Button
                        title="Export PDF"
                        iconClass='fa fa-download'
                        onClick={props.export}
                    >
                    </Button>

                </div>

            </GridToolbar>
        </div>
    </div>
export default Toolbar;