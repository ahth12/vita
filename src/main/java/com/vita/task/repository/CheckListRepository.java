package com.vita.task.repository;

import com.vita.task.model.CheckList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckListRepository extends JpaRepository<CheckList, Long> {
    List<CheckList> findCheckListByCheckId(Long id);
}
