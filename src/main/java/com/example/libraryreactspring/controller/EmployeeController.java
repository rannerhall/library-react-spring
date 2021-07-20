package com.example.libraryreactspring.controller;

import com.example.libraryreactspring.entity.Employee;
import com.example.libraryreactspring.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("api/library")
public class EmployeeController {

    private final EmployeeService employeeService;
    private static final String EMPLOYEE = "/employee";
    private static final String EMPLOYEE_ID = "/{employeeId}";

    @Inject
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(EMPLOYEE)
    public Iterable<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping(EMPLOYEE + EMPLOYEE_ID)
    public Employee getEmployeeById(@PathVariable Long employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    @PostMapping(EMPLOYEE + "/{role}/{rank}/{managerId}")
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee, @PathVariable String role, @PathVariable int rank, @PathVariable String managerId) throws URISyntaxException {
        Employee savedEmployee = employeeService.createEmployee(employee, role, rank, managerId);
        String url = "/employees/" + savedEmployee;
        url = URLEncoder.encode(url, StandardCharsets.UTF_8);
        return ResponseEntity.created(new URI(url)).body(savedEmployee);
    }

    @PutMapping(EMPLOYEE + EMPLOYEE_ID)
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long employeeId, @RequestBody Employee employee) {
        Employee currentEmployee = employeeService.editEmployee(employeeId, employee);
        return ResponseEntity.ok(currentEmployee);
    }

    @DeleteMapping(EMPLOYEE + EMPLOYEE_ID)
    public ResponseEntity<Employee> deleteEmployeeById(@PathVariable Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok().build();
    }
}
