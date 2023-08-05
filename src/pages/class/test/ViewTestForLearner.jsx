import React from "react";
import { useNavigate } from "react-router-dom";

function ViewTest() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h3 className="text-center mt-4 fw-bold">Test Online</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Test Name</th>
            <th scope="col">Questions</th>
            <th scope="col">Time</th>
            <th scope="col">Deadline</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={{ verticalAlign: "middle" }}>
              1
            </th>
            <td style={{ verticalAlign: "middle" }}>
              Vocabulary - Grammar Lesson 3
            </td>
            <td style={{ verticalAlign: "middle" }}>20</td>
            <td style={{ verticalAlign: "middle" }}>15 minutes</td>
            <td style={{ verticalAlign: "middle" }}>9/7/2023</td>
            <td>
              <button
                type="submit"
                className="bg-primary text-white border border-primary rounded-3 py-2 px-2"
                onClick={() => {
                  navigate("/dotest");
                }}
              >
                Do Test
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ verticalAlign: "middle" }}>
              2
            </th>
            <td style={{ verticalAlign: "middle" }}>
              Vocabulary - Grammar Lesson 5
            </td>
            <td style={{ verticalAlign: "middle" }}>30</td>
            <td style={{ verticalAlign: "middle" }}>25 minutes</td>
            <td style={{ verticalAlign: "middle" }}>9/7/2023</td>
            <td>
              <button
                type="submit"
                className="bg-primary text-white border border-primary rounded-3 py-2 px-2"
                onClick={() => {
                  navigate("/dotest");
                }}
              >
                Do Test
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewTest;
