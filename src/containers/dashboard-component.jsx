import React from 'react';

import {connect} from 'react-redux';

import {ActivityChartComponent} from '../components';
import {SpendingByCategoryComponent} from '../components';

const formatMoney = (n) => {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

const DashboardComponent = (props) => {
  const {settings, entries: {spendings, incomes}} = props;

  const summary = {
    incomes: incomes.reduce((acc, item) => acc + item.amount, 0),
    spendings: spendings.reduce((acc, item) => acc + item.amount, 0)
  };

  summary.saving = summary.incomes - summary.spendings;

  return (
    <div>
      <div className="row">
        <h3 className="col-xs-12">Current period</h3>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="block-grid block-grid-upto-3 text-center-sm">
            <div className="block-grid-item">
              <h4>Income</h4>
              <span className="text-lg">
                <i className="fa fa-arrow-up text-success"></i>&nbsp;{formatMoney(summary.incomes)}
              </span>
            </div>

            <div className="block-grid-item">
              <h4>Spending</h4>
              <span className="text-lg">
                <i className="fa fa-arrow-down text-danger"></i>&nbsp;{formatMoney(summary.spendings)}
              </span>
            </div>

            <div className="block-grid-item">
              <h4>Saving</h4>
              <span className="text-lg">
                {summary.saving < 0 ?
                  <i className="fa fa-arrow-down text-danger"></i>
                  :
                  <i className="fa fa-arrow-up text-success"></i>
                }&nbsp;{formatMoney(summary.saving)}
              </span>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-4">
          <SpendingByCategoryComponent {...{settings, spendings}} />
        </div>
        <div className="col-xs-12 col-sm-8">
          <ActivityChartComponent {...{settings, entries: incomes.concat(spendings)}} />
        </div>
      </div>
    </div>
  );
};

DashboardComponent.componentWillReceiveProps = (nextProps) => {
  debugger;
}

const mapStateToProps = (state) => {
  const {entries, settings} = state;

  return {entries, settings};
};

export default connect(mapStateToProps)(DashboardComponent);