package com.taskflow.taskflow.service;

import com.taskflow.taskflow.exception.ResourceNotFoundException;
import com.taskflow.taskflow.repository.TodoRepository;
import com.taskflow.taskflow.dto.TodoRequest;
import com.taskflow.taskflow.entity.Todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
// Service.java
public class TodoService {

    private final TodoRepository repository;

    public Todo createTodo(TodoRequest request) {

        Todo todo = Todo.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .priority(request.getPriority())
            .status(request.getStatus())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        return repository.save(todo);
    }

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public Todo getTodoById(Long id) {

        return repository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Todo not found with id: " + id));
    }

    public Todo updateTodo(Long id, TodoRequest request) {

        Todo todo = getTodoById(id);

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setStatus(request.getStatus());
        todo.setUpdatedAt(LocalDateTime.now());

        return repository.save(todo);
    }

    public void deleteTodo(Long id) {

        Todo todo = getTodoById(id);

        repository.delete(todo);
    }
}
