import React from "react";

function ReplyFeedback() {
  return (
    <div className="modal" tabindex="-1" role="dialog" id="replyModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reply Feedback</h5>
            <button
              type="button"
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
          <p className="mb-3 text-info fs-5">Message </p>
            <textarea
              id="content"
              className= "form-control"
              placeholder="message"
              style={{ height: "6rem" }}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success">
              Send
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyFeedback;
