import React, { useState } from 'react';

const TextEditor = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    setShowModal(true);
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button type="button" className="btn bg-primary text-white" onClick={handleOpenModal}>
        <i className="fas fa-info-circle text-white pr-2"></i>HTML Formatting
        </button>

      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
          <div className="modal-dialog" role="document" >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">HTML Text Formatting</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>To format the description, you can use basic HTML tags. For example:</p>
                <ul>
                  <li>&lt;br/&gt;: Adds a line break.</li>
                  <li>&lt;b&gt;...&lt;/b&gt;: Makes the text bold.</li>
                  <li>&lt;strong&gt;...&lt;/strong&gt;: Makes the text important.</li>
                  <li>&lt;i&gt;...&lt;/i&gt;: Makes the text italic.</li>
                  <li>&lt;mark&gt;...&lt;/mark&gt;: Highlights the text.</li>
                </ul>
                <p>For more examples, you can also check W3Schools's <a href="https://www.w3schools.com/html/html_formatting.asp">tutorial</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextEditor;
