package com.server.list_it.controller;

import com.server.list_it.dto.EventDto;
import com.server.list_it.model.Event;
import com.server.list_it.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody EventDto eventDto) {
        Event event = eventService.createEvent(eventDto);
        if (event != null) {
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long eventId, @RequestBody EventDto eventDto) {
        Event event = eventService.updateEvent(eventId, eventDto);
        if (event != null) {
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/user/{creatorId}")
    public ResponseEntity<List<Event>> getEventsByCreatorId(@PathVariable Long creatorId) {
        List<Event> events = eventService.getEventsByCreatorId(creatorId);
        return ResponseEntity.ok(events);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}
