package com.example.libraryreactspring.employeeUtils;

import com.example.libraryreactspring.EmployeeEnum;
import com.example.libraryreactspring.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class CalculateSalaryCoefficient {

    private static final double EMPLOYEE_SALARY_COEFFICIENT = 1.125;
    private static final double MANAGER_SALARY_COEFFICIENT = 1.725;
    private static final double CEO_SALARY_COEFFICIENT = 2.725;

    public double calculateSalary(Employee employee, String role, int rank) {
        double salary = 0.0;
        EmployeeEnum employeeRole = EmployeeEnum.valueOf(role.toUpperCase());
        switch (employeeRole) {
            case EMPLOYEE:
                salary = employee.getSalary() * (EMPLOYEE_SALARY_COEFFICIENT * rank);
                break;
            case MANAGER:
                salary = employee.getSalary() * (MANAGER_SALARY_COEFFICIENT * rank);
                break;
            case CEO:
                salary = employee.getSalary() * (CEO_SALARY_COEFFICIENT * rank);
                break;
        }
        return salary;
    }
}
