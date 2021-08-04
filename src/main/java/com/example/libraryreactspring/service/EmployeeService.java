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

    private Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee createEmployee(@Valid Employee employee, String role, int rank, String managerId) {
        long parsedManagerId = Long.parseLong(managerId);
        employee.setSalary(calculateSalaryCoefficient.calculateSalary(employee, role, rank));
        switch (role) {
            case EMPLOYEE:
                setAndValidateEmployee(employee, parsedManagerId);
                break;
            case MANAGER:
                setAndValidateManager(employee);
                break;
            case CEO:
                setAndValidateCeo(employee);
                break;
            default:
                validator.errorMessage("Please choose a role", employee);
        }
        saveEmployee(employee);
        return employee;
    }

    private void setAndValidateCeo(Employee employee) {
        for (Employee ceo : getEmployees()) {
            if (ceo.isCeo()) {
                validator.errorMessage("There can be only one!", employee);
            }
        }
        saveEmployee(employee);
        employee.setCeo(true);
        employee.setManagerId(employee.getEmployeeId());
    }

    private void setAndValidateManager(Employee employee) {
        saveEmployee(employee);
        employee.setManager(true);
        employee.setManagerId(employee.getEmployeeId());
    }

    private void setAndValidateEmployee(Employee employee, long parsedManagerId) {
        if (parsedManagerId == 0) {
            validator.errorMessage("Employee must have a manager", employee);
        }
        for (Employee ceo : getEmployees()) {
            if (ceo.isCeo() && ceo.getEmployeeId().equals(parsedManagerId)) {
                validator.errorMessage("Employee cannot have CEO as manager.", employee);
            }
        }
        employee.setManagerId(parsedManagerId);
    }

    public Employee editEmployee(Long employeeId, Employee employee) {
        Employee employeeToUpdate = getEmployeeById(employeeId);
        employeeToUpdate.setFirstName(employee.getFirstName());
        employeeToUpdate.setLastName(employee.getLastName());
        employeeToUpdate.setSalary(employee.getSalary());
        employeeToUpdate = saveEmployee(employee);
        return employeeToUpdate;
    }

    public void deleteEmployee(Long employeeId) {
        Employee libraryItemToDelete = getEmployeeById(employeeId);
        if (libraryItemToDelete != null) {
            employeeRepository.deleteById(employeeId);
        }
    }
}
