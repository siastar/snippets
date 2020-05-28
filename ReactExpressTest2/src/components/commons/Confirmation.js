import React from "react";
import Modal from "react-responsive-modal";
const Confirmation = props => {

  const {openModal,onCloseModal,handleDeleteRow} = props;
 
  return(
      <Modal open={openModal} onClose={() => {onCloseModal()}} center>
    <div className="modal-header">Delete Record</div>
    <div className="modal-body">Do you really want to delete this Record?</div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={()=>{onCloseModal()}}
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {handleDeleteRow()}}
      >
        Delete
      </button>
    </div>
  </Modal>
  );
};

export default Confirmation;
