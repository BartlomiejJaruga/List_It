package com.server.list_it.service;

import com.server.list_it.dto.EventDto;
import com.server.list_it.model.Event;
import com.server.list_it.model.EventStatus;
import com.server.list_it.model.User;
import com.server.list_it.repo.EventRepository;
import com.server.list_it.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createEvent(EventDto eventDto) {
        Optional<User> userOptional = userRepository.findById(eventDto.getCreatorId());
        if (userOptional.isPresent()) {
            Event event = Event.builder()
                    .name(eventDto.getName())
                    .date(eventDto.getDate())
                    .time(eventDto.getTime())
                    .status(EventStatus.NEW)
                    .description(eventDto.getDescription())
                    .likes(0)
                    .creator(userOptional.get())
                    .build();
            return eventRepository.save(event);
        }
        return null;
    }

    public Event updateEvent(Long eventId, EventDto eventDto) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            event.setName(eventDto.getName());
            event.setDate(eventDto.getDate());
            event.setTime(eventDto.getTime());
            event.setDescription(eventDto.getDescription());
            return eventRepository.save(event);
        }
        return null;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByCreatorId(Long creatorId) {
        return eventRepository.findByCreatorId(creatorId);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
