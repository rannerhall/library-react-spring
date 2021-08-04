package com.example.libraryreactspring.validator;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Set;

@Component
public class ValidatorMessage {

    private final Validator validator;

    public ValidatorMessage(Validator validator) {
        this.validator = validator;
    }

    public void errorMessage(String errorMessage, Object target) {
        Set<ConstraintViolation<Object>> violations = validator.validate(target);
        StringBuilder stringBuilder = new StringBuilder();
        for (ConstraintViolation<Object> constraintViolation : violations) {
            stringBuilder.append(constraintViolation.getMessage());
        }
        throw new ConstraintViolationException(errorMessage + stringBuilder, violations);
    }
}
