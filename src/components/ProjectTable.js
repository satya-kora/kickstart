import React from 'react';
import '../styles/Table.css';

const ProjectTable = ({ projects }) => {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project['s.no']}</td>
            <td>{project['percentage.funded']}</td>
            <td>{project['amt.pledged']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
