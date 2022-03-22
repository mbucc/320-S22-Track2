package com.clog.Clog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.clog.Clog.BusinessProcess.BusinessProcessTreeMap;
import com.clog.Clog.BusinessProcess.BusinessProcessTreeNode;
import com.clog.Clog.BusinessProcess.BusinessTreeRepository;
import com.clog.Clog.BusinessProcess.EAIdomain;
import com.clog.Clog.LogDetailFiles.LogDetail;
import com.clog.Clog.LogDetailFiles.LogDetailRepository;
import com.clog.Clog.LogEventFiles.LogEvent;
import com.clog.Clog.LogEventFiles.LogEventFilterSpecification;
import com.clog.Clog.LogEventFiles.LogEventRepository;
import com.clog.Clog.LogEventFiles.LogEventsSearchCriteria;

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
    @Autowired
    private BusinessTreeRepository busTree;


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
        LogEventFilterSpecification test = new LogEventFilterSpecification(filt);
        return logEventRepo.findAll(test);
        //return businessDomain + eaiDomain + " " + startTime + endTime +" " + businessSubDomain + " " + process;
    }
    @GetMapping(path="/test")
    public @ResponseBody Map<String, Map<String, Map<String, List<BusinessProcessTreeNode>>>> getBusinessTree() {
        //TODO Create specification
        
        List<EAIdomain> test =  busTree.findAll();
        BusinessProcessTreeMap wtf = new BusinessProcessTreeMap();
        for(EAIdomain x : test) {
            wtf.addObj(x);
        }
        return wtf.getMap();
    }
}
