import React, { useState } from "react";
import axios from "axios";

const SalaryPage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Janith Perera", position: "Web Site Developer", workDays: 0, salary: 0 },
    { id: 2, name: "Jayantha Adikari", position: "Manager", workDays: 0, salary: 0 },
    { id: 3, name: "Kasun Rajitha", position: "Senior Trainer", workDays: 0, salary: 0 },
    { id: 10, name: "Samantha Perera", position: "Senior Trainer", workDays: 0, salary: 0 },
    { id: 4, name: "Sanka Bandara", position: "Junior Trainer", workDays: 0, salary: 0 },
    { id: 8, name: "Ranil Gunawardana", position: "Junior Trainer", workDays: 0, salary: 0 },
    { id: 9, name: "Ajantha Silva", position: "Junior Trainer", workDays: 0, salary: 0 },
    { id: 5, name: "Nimal Bandara", position: "Minor Staff", workDays: 0, salary: 0 },
    { id: 6, name: "Kamal Perera", position: "Minor Staff", workDays: 0, salary: 0 },
    { id: 7, name: "Sunil Fernando", position: "Minor Staff", workDays: 0, salary: 0 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const calculateSalary = (position, workDays) => {
    switch (position) {
      case "Web Site Developer":
        return workDays * 8000;
      case "Manager":
        return workDays * 10000;
      case "Senior Trainer":
        return workDays * 6000;
      case "Junior Trainer":
        return workDays * 4000;
      case "Minor Staff":
        return workDays * 2000;
      default:
        return 0;
    }
  };

  const handleSaveSalary = async (employeeId, salary) => {
    try {
      const response = await axios.put(`http://localhost:8070/Salary/update/${employeeId}`, {
        name: employees.find(emp => emp.id === employeeId).name,
        position: employees.find(emp => emp.id === employeeId).position,
        workDays: employees.find(emp => emp.id === employeeId).workDays,
        salary: employees.find(emp => emp.id === employeeId).salary
         
      });

      if (response.status === 200) {
        console.log(`Updated salary ${salary} for employee with ID ${employeeId}`);
        // Update the local state to reflect the changes
        setEmployees(prevEmployees =>
          prevEmployees.map(employee =>
            employee.id === employeeId ? { ...employee, salary } : employee
          )
        );
      } else {
        console.error("Failed to update salary:", response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error updating salary:', error);
      // Handle error
    }
  };

  const handleViewSalaryHistory = async (employeeId) => {
    try {
      // Simulating view salary history functionality for now
      console.log(`Viewing salary history for employee with ID ${employeeId}`);
    } catch (error) {
      console.error('Error viewing salary history:', error);
      // Handle error
    }
  };

  const handleIncreaseWorkDays = (employeeId) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === employeeId ? { ...employee, workDays: employee.workDays + 1 } : employee
      )
    );
  };

  const handleDecreaseWorkDays = (employeeId) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === employeeId && employee.workDays > 0 ? { ...employee, workDays: employee.workDays - 1 } : employee
      )
    );
  };

  // Function to handle search by employee name
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-full mx-auto mt-8 px-4 overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-4">Salary Page (Admin)</h1>
        <div className="overflow-x-auto">
          <div className="relative mx-auto font-bold flex justify-center mt-6 mb-4">
            <input
              type="text"
              placeholder="Search by employee name..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
            />
          </div>
          <table className="table-auto border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-800">Employee Name</th>
                <th className="px-4 py-2 border border-gray-800">Position</th>
                <th className="px-4 py-2 border border-gray-800">Work Days</th>
                <th className="px-4 py-2 border border-gray-800">Actions</th>
                <th className="px-4 py-2 border border-gray-800">Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-4 py-2 border border-gray-800">{employee.name}</td>
                  <td className="px-4 py-2 border border-gray-800">{employee.position}</td>
                  <td className="px-4 py-2 border border-gray-800">{employee.workDays}</td>
                  <td className="px-4 py-2 border border-gray-800 flex items-center space-x-2">
                    <button
                      className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onClick={() => handleIncreaseWorkDays(employee.id)}
                    >
                      +
                    </button>
                    <button
                      className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onClick={() => handleDecreaseWorkDays(employee.id)}
                    >
                      -
                    </button>
                    <button
                      className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onClick={() => handleSaveSalary(employee.id, calculateSalary(employee.position, employee.workDays))}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onClick={() => handleViewSalaryHistory(employee.id)}
                    >
                      View History
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-800">{calculateSalary(employee.position, employee.workDays)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );slp.jsx
};

export default SalaryPage;
