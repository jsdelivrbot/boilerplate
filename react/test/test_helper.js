import { JSDOM } from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser but in the command line
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = global.window.document;

const $ = jquery(global.window); // bind jquery to global.window

// build 'renderComponent' helper that should render a given react ComponentClass
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <StaticRouter context={{}}>
        <ComponentClass {...props} />
      </StaticRouter>
    </Provider>
  );

  // HTML is produced and wraped into jquery in order to make jquery matcher
  // available on the object
  return $(ReactDOM.findDOMNode(componentInstance));
}

// Build heler for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value); // .val -> jquery method to set value
  }
  // [] ref object prop --> like .
  TestUtils.Simulate[eventName](this[0]); // [0] to ref the 1st in case of Array
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
