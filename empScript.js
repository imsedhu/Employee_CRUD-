document.addEventListener('DOMContentLoaded', () => {
  const employeeForm = document.getElementById('employeeForm');
  const employeeTable = document.getElementById('employeeTable');

  employeeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const salary = document.getElementById('salary').value;
    const department = document.getElementById('department').value;

    if (!name || !email || !salary || !department) {
      alert('Please fill in all fields.');
      return;
    }

    const employee = {
      name,
      email,
      salary,
      department
    };

    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    displayEmployees();
    employeeForm.reset();
  });

  function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const tableRows = employees.map((employee, index) => {
      return `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.salary}</td>
          <td>${employee.department}</td>
          <td>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    employeeTable.innerHTML = `
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
        ${tableRows}
      </table>
    `;

    // Attach event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        editEmployee(event.target.dataset.index);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        deleteEmployee(event.target.dataset.index);
      });
    });
  }

  function editEmployee(index) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[index];
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('department').value = employee.department;
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees();
  }

  function deleteEmployee(index) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees();
  }

  displayEmployees();
});
