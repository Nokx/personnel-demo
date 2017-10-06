import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  dialog: state.dialogs,
}))
class DialogRoot extends React.Component {
  render() {
    const { dialog: { dialogsById }, DIALOG_COMPONENTS } = this.props;
    return <div>{prepareDialogs(dialogsById, DIALOG_COMPONENTS)}</div>;
  }
}

const prepareDialogs = (dialogs, DIALOG_COMPONENTS) => {
  const rows = [];
  Object.values(dialogs).forEach(dialog => {
    if (!dialog.dialogType) {
      rows.push(<span key="no_dialog" />);
    } else {
      const SpecificDialog = DIALOG_COMPONENTS[dialog.dialogType];
      rows.push(<SpecificDialog key={dialog.id} dialogId={dialog.id} {...dialog.dialogProps} />);
    }
  });

  return rows;
};

export { DialogRoot };
