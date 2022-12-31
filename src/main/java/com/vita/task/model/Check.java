package com.vita.task.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "checks")
public class Check {
    @Id
    private Long id;

    @Column
    private String checkerName;

    @Column
    private String checkTarget;

    @Column
    private CheckStatus checkStatus;

    @OneToMany(mappedBy = "check", fetch = FetchType.EAGER)
    private List<CheckList> checkLists;


    @Override
    public String toString() {
        return "Check{" +
                "id=" + id +
                ", checkerName='" + checkerName + '\'' +
                ", checkTarget='" + checkTarget + '\'' +
                ", checkStatus=" + checkStatus +
                ", checkLists="+
                '}';
    }
}
