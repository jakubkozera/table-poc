import React from 'react'
import * as Table from 'reactabular-table';
import Metrics from './home.metrics'
const Home = (props) =>
  <div className="row main">
    <div className="col">
      <div className="row page-title">
        <div className="col-12">
          <h3 className="text-center">E-Billing Management</h3>
        </div>
      </div>
      <Metrics ></Metrics>
      <div className="row page-content">
        <div className="col-12">

          <Table.Provider
            className="table table-striped"
            columns={props.columns}>
            <Table.Header className="" 
              headerRows={props.headerRows}/>
            <Table.Body rows={props.paginated.rows} rowKey="id" />
          </Table.Provider>
          {props.paginator}
        </div>
      </div>
    </div>
  </div>
export default Home;