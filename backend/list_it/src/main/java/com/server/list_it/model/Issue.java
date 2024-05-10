package com.server.list_it.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "issues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Issue {
    @Id
    @Column(name = "issue_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "issue_type")
    private IssueType issueType;

    @Column(name = "issue_state")
    private IssueState issueState;
    private String description;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
