import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import auth from './features/auth';
import dialog from './features/dialogs';
import DIALOG_COMPONENTS from './common/dialog-components';
import app from './features/app';

const { MainContent } = app.containers;

import './app.css';

const App = () => {
  const { AuthContainer } = auth.containers;
  const { DialogRoot } = dialog.containers;
  return (
    <Router>
      <div style={styles.fullHeight}>
        <AuthContainer mainComponent={MainContent} />
        <DialogRoot DIALOG_COMPONENTS={DIALOG_COMPONENTS} />
      </div>
    </Router>
  );
};

const styles = {
  fullHeight: {
    height: '100%',
  },
};
export default App;
