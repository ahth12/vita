package com.vita.task.controller;

import com.vita.task.model.Check;
import com.vita.task.repository.CheckRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/check")
public class CheckController {

    CheckRepository checkRepository;

    public CheckController(CheckRepository checkRepository) {
        this.checkRepository = checkRepository;
    }

    @GetMapping("{id}")
    public Check findById(@PathVariable Long id){
        return checkRepository.findCheckById(id);
    }

    @GetMapping
    public List<Check> findAll(){
        return checkRepository.findAll();
    }


}
