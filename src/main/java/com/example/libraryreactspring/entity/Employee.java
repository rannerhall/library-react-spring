package com.example.libraryreactspring.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@Table(name = "EMPLOYEE")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employeeId")
    private Long employeeId;
    @Column(name = "firstName")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "salary")
    private double salary;
    @Column(name = "IsCeo")
    private boolean isCeo;
    @Column(name = "isManager")
    private boolean isManager;
    @Column(name = "managerId")
    private Long managerId;
}
