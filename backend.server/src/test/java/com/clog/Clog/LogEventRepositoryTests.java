package com.clog.Clog;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import com.clog.Clog.LogDetailFiles.LogDetail;
import com.clog.Clog.LogDetailFiles.LogDetailRepository;
import com.clog.Clog.LogEventFiles.LogEvent;
import com.clog.Clog.LogEventFiles.LogEventFilterSpecification;
import com.clog.Clog.LogEventFiles.LogEventRepository;
import com.clog.Clog.LogEventFiles.LogEventsSearchCriteria;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
public class LogEventRepositoryTests {
    @Autowired
    private LogEventRepository logEventsRepo;

    @Test
    @DatabaseSetup("sample_data.xml")
    public void testSearchByBusinessDomain1() {
        String businessDomain = "CRM";
        LogEventsSearchCriteria filt = new LogEventsSearchCriteria();
        //filt.setBusinessDomain(businessDomain);

        LogEventFilterSpecification test = new LogEventFilterSpecification(filt);
        List<LogEvent> response = logEventsRepo.findAll(test);
        Assert.assertEquals(response, 1);
    }
}
