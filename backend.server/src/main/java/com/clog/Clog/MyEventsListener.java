package com.clog.Clog;

import com.clog.Clog.BusinessProcess.BusinessTreeRepository;
import com.clog.Clog.LogEventFiles.LogEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MyEventsListener {

    @Autowired
    LogEventRepository logEventRepo;
    @Autowired
    BusinessTreeRepository busTree;

    @EventListener
    public void onApplicationReady(ApplicationReadyEvent ready) {
        logEventRepo.findDistinctEAI_Domains();
        logEventRepo.findDistinctServices();
        logEventRepo.findDistinctApplications();
        logEventRepo.findDistinctBusinessSubDomains();
        logEventRepo.findDistinctBusinessDomains();
        busTree.findDistinctPublishingBusinessDomains();
        
    }
}