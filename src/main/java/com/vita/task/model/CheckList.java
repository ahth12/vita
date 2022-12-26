package com.vita.task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="checkLists")
public class CheckList {
    @Id
    private Long id;
    @Column
    private String name;
    @Column
    private String comment;
    @Column
    private CheckListStatus checkListStatus;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="check_id")
    private Check check;
}
