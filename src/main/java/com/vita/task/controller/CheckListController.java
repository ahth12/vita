package com.vita.task.controller;

import com.vita.task.model.CheckList;
import com.vita.task.repository.CheckListRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checklist")
public class CheckListController {

    CheckListRepository checkListRepository;

    public CheckListController(CheckListRepository checkListRepository) {
        this.checkListRepository = checkListRepository;
    }

    @GetMapping("check/{id}")
    public List<CheckList> findByCheckId(@PathVariable Long id) {
        return checkListRepository.findCheckListByCheckId(id);
    }

    @GetMapping("{id}")
    public CheckList findByCheckListId(@PathVariable Long id) {
        return checkListRepository.findById(id).get();
    }

    @PatchMapping(value = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public CheckList update(@PathVariable Long id, @RequestBody CheckList checkList) {
        CheckList checkListFromDb = checkListRepository.findById(id).get();
        if (checkList.getCheckListStatus() != null) checkListFromDb.setCheckListStatus(checkList.getCheckListStatus());
        if (checkList.getComment() != null) {
            checkListFromDb.setComment((checkList.getComment()));
        }
        checkListRepository.save(checkListFromDb);
        return checkListFromDb;
    }

}
