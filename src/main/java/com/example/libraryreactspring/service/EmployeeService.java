package com.example.libraryreactspring.service;

import com.example.libraryreactspring.employeeUtils.CalculateSalaryCoefficient;
import com.example.libraryreactspring.entity.Employee;
import com.example.libraryreactspring.repository.EmployeeRepository;
import com.example.libraryreactspring.validator.ValidatorMessage;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final CalculateSalaryCoefficient calculateSalaryCoefficient;
    private final ValidatorMessage validator;

    private static final String EMPLOYEE = "employee";
    private static final String MANAGER = "manager";
    private static final String CEO = "ceo";

    @Inject
    public EmployeeService(EmployeeRepository employeeRepository, CalculateSalaryCoefficient calculateSalaryCoefficient, ValidatorMessage validator) {
        this.employeeRepository = employeeRepository;
        this.calculateSalaryCoefficient = calculateSalaryCoefficient;

        this.validator = validator;
    }

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(RuntimeException::new);
    }

    public Employee createEmployee(@Valid Employee employee, String role, int rank, String managerId) {
        long parsedManagerId = Long.parseLong(managerId);
        employee.setSalary(calculateSalaryCoefficient.calculateSalary(employee, role, rank));
        if (role.equals(EMPLOYEE)) {
            if (parsedManagerId == 0) {
                validator.validate("Employee must have a manager", employee);
            } else {
                employee.setManagerId(parsedManagerId);
            }
        }
        if (role.equals(MANAGER)) {
            employee.setManager(true);
            employeeRepository.save(employee);
            employee.setManagerId(employee.getEmployeeId());
        }
        if (role.equals(CEO)) {
            for (Employee ceo : getEmployees()) {
                if (ceo.isCeo()) {
                    validator.validate("There can be only one!", employee);
                } else {
                    employee.setCeo(true);
                }
            }
        }
        employeeRepository.save(employee);
        return employee;
    }

    public Employee editEmployee(Long employeeId, Employee employee) {
        return null;
    }

    public void deleteEmployee(Long employeeId) {
        Employee libraryItemToDelete = getEmployeeById(employeeId);
        if (libraryItemToDelete != null) {
            employeeRepository.deleteById(employeeId);
        }
    }
}
