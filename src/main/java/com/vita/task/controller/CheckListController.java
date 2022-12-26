package com.vita.task.controller;

import com.vita.task.repository.CheckListRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckListController {

    CheckListRepository checkListRepository;

    public CheckListController(CheckListRepository checkListRepository) {
        this.checkListRepository = checkListRepository;
    }

}
