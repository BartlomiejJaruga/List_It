package com.server.list_it.dto;

import com.server.list_it.model.EventStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventDto {
    private String name;
    private LocalDate date;
    private LocalTime time;
    private EventStatus status;
    private String description;
    private Long creatorId;
}
