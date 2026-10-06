package com.taskflow.taskflow.validation;

import jakarta.validation.ConstraintViolation;
import com.taskflow.taskflow.dto.TodoRequest;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class TodoRequestValidationTest {

    private Validator validator;

    @BeforeEach
    void setUp() {

        ValidatorFactory factory =
                Validation.buildDefaultValidatorFactory();

        validator = factory.getValidator();
    }

    @Test
    void shouldFailWhenTitleIsNull() {

        TodoRequest request = new TodoRequest();

        Set<ConstraintViolation<TodoRequest>> violations =
                validator.validate(request);

        assertFalse(violations.isEmpty());
    }

    @Test
    void shouldFailWhenTitleIsBlank() {

        TodoRequest request = new TodoRequest();

        request.setTitle("");

        Set<ConstraintViolation<TodoRequest>> violations =
                validator.validate(request);

        assertFalse(violations.isEmpty());
    }

    @Test
    void shouldPassWhenTitleIsValid() {

        TodoRequest request = new TodoRequest();

        request.setTitle("Learn Spring Boot");

        Set<ConstraintViolation<TodoRequest>> violations =
                validator.validate(request);

        assertTrue(violations.isEmpty());
    }
}
