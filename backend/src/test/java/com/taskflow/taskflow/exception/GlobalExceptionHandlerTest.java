package com.taskflow.taskflow.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    @Test
    void shouldCreateException() {

        ResourceNotFoundException ex =
                new ResourceNotFoundException(
                        "Todo not found");

        assertEquals(
                "Todo not found",
                ex.getMessage()
        );
    }
}
