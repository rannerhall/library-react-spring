package com.example.libraryreactspring.employeeUtils;

import com.example.libraryreactspring.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class CalculateSalaryCoefficient {

    private static final String EMPLOYEE = "employee";
    private static final String MANAGER = "manager";
    private static final String CEO = "ceo";
    private static final double EMPLOYEE_SALARY_COEFFICIENT = 1.125;
    private static final double MANAGER_SALARY_COEFFICIENT = 1.725;
    private static final double CEO_SALARY_COEFFICIENT = 2.725;

    public double calculateSalary(Employee employee, String role, int rank) {
        double salary = 0.0;

        if (EMPLOYEE.equals(role)) {
            salary = employee.getSalary() * (EMPLOYEE_SALARY_COEFFICIENT * rank);
        }
        if (MANAGER.equals(role)) {
            salary = employee.getSalary() * (MANAGER_SALARY_COEFFICIENT * rank);
        }
        if (CEO.equals(role)) {
            salary = employee.getSalary() * (CEO_SALARY_COEFFICIENT * rank);
        }

        return salary;
    }
}
