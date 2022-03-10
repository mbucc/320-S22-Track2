package com.clog.Clog;

import java.util.List;
import java.util.Optional;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ch.qos.logback.core.filter.Filter;


@Controller
@RequestMapping(path="/clog")
public class MainController {
    @Autowired
    private LogDetailRepository logRepo;
    @Autowired
    private LogEventRepository logEventRepo;
    @GetMapping(path="/logDetail")
    public @ResponseBody Optional<LogDetail> getAllLogDetails(@RequestParam String id) {
        return logRepo.findById(id);
    }
    @GetMapping(path="/logEvents")
    public @ResponseBody List<LogEvent> getLogEvents(@RequestParam String businessDomain, @RequestParam String eaiDomain, @RequestParam String startTime,
    @RequestParam String endTime,@RequestParam String businessSubDomain,@RequestParam String process, @RequestParam String[] priorities, @RequestParam String[] categories,
    @RequestParam String[] severities, @RequestParam String application) {
        LogEventsSearchCriteria filt = new LogEventsSearchCriteria();
        filt.setBusinessDomain(businessDomain);
        filt.setEaiDomain(eaiDomain);
        filt.setStartTime(Timestamp.valueOf(startTime));
        filt.setEndTime(Timestamp.valueOf(endTime));
        filt.setBusinessSubDomain(businessSubDomain);
        filt.setProcess(process);
        filt.setPriorities(priorities);
        filt.setCategories(categories);
        filt.setSeverities(severities);
        filt.setApplication(application);
        FilterSpecification test = new FilterSpecification(filt);
        return logEventRepo.findAll(test);
        //return businessDomain + eaiDomain + " " + startTime + endTime +" " + businessSubDomain + " " + process;
    }
}
