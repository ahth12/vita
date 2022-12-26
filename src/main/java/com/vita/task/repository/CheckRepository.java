package com.vita.task.repository;

import com.vita.task.model.Check;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CheckRepository extends JpaRepository<Check, Long> {
    Check findCheckById(Long id);
}
