package com.vita.task.controller;

import com.vita.task.model.Check;
import com.vita.task.model.CheckList;
import com.vita.task.model.CheckListStatus;
import com.vita.task.model.CheckStatus;
import com.vita.task.repository.CheckRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/check")
public class CheckController {

    CheckRepository checkRepository;

    public CheckController(CheckRepository checkRepository) {
        this.checkRepository = checkRepository;
    }

    @GetMapping("{id}")
    public Check findById(@PathVariable Long id) {
        return checkRepository.findCheckById(id);
    }

    @GetMapping
    public List<Check> findAll() {
        List<Check> checks = checkRepository.findAll();
        List<Check> collect = checks.stream().map(check -> {
            List<CheckList> checkLists = check.getCheckLists();
            check.setCheckStatus(CheckStatus.DONE);
            if (!checkLists.isEmpty()) {
                for (CheckList checkList : checkLists) {
                    if (checkList.getCheckListStatus().equals(CheckListStatus.NOT_OK)) {
                        check.setCheckStatus(CheckStatus.IN_PROGRESS);
                    }
                }
            }
            return check;
        }).collect(Collectors.toList());
        return collect;
    }


}
