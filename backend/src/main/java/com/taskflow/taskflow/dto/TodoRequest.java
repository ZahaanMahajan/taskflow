package com.taskflow.taskflow.dto;

import com.taskflow.taskflow.entity.Priority;
import com.taskflow.taskflow.entity.Status;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TodoRequest {

    @NotBlank
    private String title;

    private String description;

    private Priority priority;

    private Status status;
}
