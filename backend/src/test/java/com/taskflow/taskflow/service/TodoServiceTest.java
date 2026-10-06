package com.taskflow.taskflow.service;

import com.taskflow.taskflow.entity.Priority;
import com.taskflow.taskflow.dto.TodoRequest;
import com.taskflow.taskflow.entity.Status;
import com.taskflow.taskflow.entity.Todo;

import com.taskflow.taskflow.exception.ResourceNotFoundException;
import com.taskflow.taskflow.repository.TodoRepository;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Test;

import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository repository;

    @InjectMocks
    private TodoService service;

    @Test
    void shouldCreateTodo() {

        TodoRequest request = new TodoRequest();

        request.setTitle("Learn Spring");
        request.setDescription("Service Layer");
        request.setPriority(Priority.HIGH);
        request.setStatus(Status.PENDING);

        Todo savedTodo = Todo.builder()
            .id(1L)
            .title(request.getTitle())
            .description(request.getDescription())
            .priority(request.getPriority())
            .status(request.getStatus())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        when(repository.save(any(Todo.class)))
            .thenReturn(savedTodo);

        Todo result = service.createTodo(request);

        assertNotNull(result);
        assertEquals("Learn Spring", result.getTitle());

        verify(repository, times(1))
            .save(any(Todo.class));
    }

    @Test
    void shouldReturnAllTodos() {

        List<Todo> todos = List.of(
                Todo.builder().id(1L).title("Task 1").build(),
                Todo.builder().id(2L).title("Task 2").build()
                );

        when(repository.findAll()).thenReturn(todos);

        List<Todo> result = service.getAllTodos();

        assertEquals(2, result.size());
    }

    @Test
    void shouldReturnTodoById() {

        Todo todo = Todo.builder()
            .id(1L)
            .title("Task")
            .build();

        when(repository.findById(1L))
            .thenReturn(Optional.of(todo));

        Todo result = service.getTodoById(1L);

        assertEquals("Task", result.getTitle());
    }

    @Test
    void shouldThrowExceptionWhenTodoNotFound() {

        when(repository.findById(99L))
            .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.getTodoById(99L)
                );
    }

    @Test
    void shouldDeleteTodo() {

        Todo todo = Todo.builder()
            .id(1L)
            .build();

        when(repository.findById(1L))
            .thenReturn(Optional.of(todo));

        service.deleteTodo(1L);

        verify(repository).delete(todo);
    }

    @Test
    void shouldUpdateTodo() {

        Todo existing = Todo.builder()
            .id(1L)
            .title("Old")
            .build();

        TodoRequest request = new TodoRequest();

        request.setTitle("New");
        request.setDescription("Updated");
        request.setPriority(Priority.HIGH);
        request.setStatus(Status.IN_PROGRESS);

        when(repository.findById(1L))
            .thenReturn(Optional.of(existing));

        when(repository.save(any(Todo.class)))
            .thenReturn(existing);

        Todo result = service.updateTodo(1L, request);

        assertEquals("New", result.getTitle());
    }
}
