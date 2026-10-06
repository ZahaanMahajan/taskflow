package com.taskflow.taskflow.integration;

import com.taskflow.taskflow.dto.TodoRequest;
import com.taskflow.taskflow.entity.Priority;
import tools.jackson.databind.ObjectMapper;
import com.taskflow.taskflow.entity.Status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TodoIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private TodoRequest request;

    @BeforeEach
    void setUp() {

        request = new TodoRequest();

        request.setTitle("Integration Test Todo");
        request.setDescription("Testing Full Flow");
        request.setPriority(Priority.HIGH);
        request.setStatus(Status.PENDING);
    }

    @Test
    void shouldCreateTodo() throws Exception {

        mockMvc.perform(
                        post("/api/todos")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(request)
                                )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title")
                        .value("Integration Test Todo"));
    }

    @Test
    void shouldGetAllTodos() throws Exception {

        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn404ForInvalidId() throws Exception {

        mockMvc.perform(get("/api/todos/999999"))
                .andExpect(status().isNotFound());
    }
}
