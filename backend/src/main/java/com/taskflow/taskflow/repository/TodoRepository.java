package com.taskflow.taskflow.repository;

import com.taskflow.taskflow.entity.Todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository
        extends JpaRepository<Todo, Long> {
}
