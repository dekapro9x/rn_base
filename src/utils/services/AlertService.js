import * as React from 'react';
let modalRef = React.createRef();

function showModal(renderContent) {
  modalRef.current.setShowModal(renderContent);
}
function showToast(title, msg) {
  modalRef.current.showToast(title, msg);
}

function hideModal() {
  modalRef.current.closeModal();
}

const AlertService = {modalRef, showModal, showToast, hideModal};
export {AlertService};
