package com.taskflow.taskflow.controller;

import com.taskflow.taskflow.service.TodoService;
import com.taskflow.taskflow.dto.TodoRequest;
import com.taskflow.taskflow.entity.Todo;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService service;

    @PostMapping
    public Todo createTodo(
            @Valid @RequestBody TodoRequest request) {

            return service.createTodo(request);
            }

    @GetMapping
    public List<Todo> getAllTodos() {
        return service.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return service.getTodoById(id);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoRequest request) {

            return service.updateTodo(id, request);
            }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        service.deleteTodo(id);
    }
}
