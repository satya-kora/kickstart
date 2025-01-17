export const fetchProjects = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  };
  