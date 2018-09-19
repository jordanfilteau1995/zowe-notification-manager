import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ReactMVDResources } from 'pluginlib/react-inject-resources';
import { MVDResources } from './mvd-resources';

export function renderPlugin(domElement: HTMLElement, resources: ReactMVDResources): void {
  ReactDOM.render(
    <MVDResources.Provider value={resources}>
      <App />
    </MVDResources.Provider>,
    domElement
  );
}

export function unmountPlugin(domElement: HTMLElement): void {
  ReactDOM.unmountComponentAtNode(domElement);
}