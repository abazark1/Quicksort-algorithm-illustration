import React from "react";

const Problems = ({ problems }) => (
  <div>
    <h2>Problems Page</h2>
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>Name</th>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>
            Difficulty
          </th>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>
            Success Rate
          </th>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>Link</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ccc", padding: "10px" }}>
              {problem.name}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "10px" }}>
              {problem.difficulty}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "10px" }}>
              {problem.successRate}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "10px" }}>
              <button onClick={() => window.open(problem.link, "_blank")}>
                Solve
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Problems;
