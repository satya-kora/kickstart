import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("/data/frontend-assignment.json")
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Error loading the JSON file:", error));
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Kickstarter Projects</h1>
      
      {/* Accessible Table */}
      <table aria-labelledby="tableTitle" role="table">
        <caption id="tableTitle" className="sr-only">Kickstarter Projects Table</caption>
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map(project => (
            <tr key={project['s.no']}>
              <td>{project['s.no']}</td>
              <td>{project['percentage.funded']}%</td>
              <td>{project['amt.pledged']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls with aria-labels */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(projects.length / projectsPerPage)}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
