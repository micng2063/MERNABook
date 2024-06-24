import React, { useState } from 'react';

const TextPreview = ({ form }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getFormattedDescription = () => {
    return { __html: form.description };
  };

  return (
    <div>
      <button type="button" className="btn bg-primary text-white" onClick={handleOpenModal}>
        <i className="fas fa-eye text-white pr-2"></i>Preview
      </button>

      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Text Preview</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={getFormattedDescription()}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextPreview;
