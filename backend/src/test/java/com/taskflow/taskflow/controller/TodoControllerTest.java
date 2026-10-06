package com.taskflow.taskflow.controller;

import com.taskflow.taskflow.service.TodoService;
import com.taskflow.taskflow.dto.TodoRequest;
import com.taskflow.taskflow.entity.Priority;
import com.taskflow.taskflow.entity.Status;
import tools.jackson.databind.ObjectMapper;
import com.taskflow.taskflow.entity.Todo;

import org.junit.jupiter.api.Test;

import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.test.context.bean.override.mockito.MockitoBean;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    TodoService service;

    @Test
    void shouldReturnAllTodos() throws Exception {

        when(service.getAllTodos())
            .thenReturn(
                    List.of(
                        Todo.builder()
                        .id(1L)
                        .title("Task")
                        .build()
                        )
                    );

        mockMvc.perform(get("/api/todos"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title")
                    .value("Task"));
    }

    @Test
    void shouldReturnTodoById() throws Exception {

        when(service.getTodoById(1L))
            .thenReturn(
                    Todo.builder()
                    .id(1L)
                    .title("Task")
                    .build()
                    );

        mockMvc.perform(get("/api/todos/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title")
                    .value("Task"));
    }

    @Test
    void shouldCreateTodo() throws Exception {

        TodoRequest request = new TodoRequest();

        request.setTitle("Learn Testing");
        request.setPriority(Priority.HIGH);
        request.setStatus(Status.PENDING);

        Todo todo = Todo.builder()
            .id(1L)
            .title("Learn Testing")
            .build();

        when(service.createTodo(org.mockito.ArgumentMatchers.any()))
            .thenReturn(todo);

        mockMvc.perform(
                post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(request)
                    )
                )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title")
                    .value("Learn Testing"));
    }
}
