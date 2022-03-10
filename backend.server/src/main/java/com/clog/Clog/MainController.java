package com.clog.Clog;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(path="/clog")
public class MainController {
    @Autowired
    private LogDetailRepository logRepo;
    @GetMapping(path="/logDetail")
    public @ResponseBody Optional<LogDetail> getAllLogDetails(@RequestParam String id) {
        return logRepo.findById(id);
    }
}
