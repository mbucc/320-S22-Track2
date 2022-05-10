package com.clog.Clog;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import com.clog.Clog.LogDetailFiles.LogDetail;
import com.clog.Clog.LogDetailFiles.LogDetailRepository;
import com.clog.Clog.LogEventFiles.LogEventRepository;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
//@DatabaseSetup("sample_data.xml")
// @ContextConfiguration
// @TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
// DbUnitTestExecutionListener.class })
public class DropDownTests {
    @Autowired
    private LogEventRepository logEventRepo;

    @Test
    public void testCorrectSubDomains() {
        List<String> subDomains = Arrays.asList(new String[]{"Customer","BUSINESS"});
        List<String> response = logEventRepo.findDistinctBusinessSubDomains();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    // @Test
    // public void testCorrectApplications() {
    //     String[] apps = {"CRM_Adapter","OPER_Adapter","ACCOUNT_Adapter","ACCOUNT_application","OPER_application","CRM_application"};
    //     Optional<LogDetail> response = logDetail.findById(id);
    //     Assert.assertEquals(response.isPresent(), false);
    // }

    // @Test
    // public void testFindIdEmptyString() {
    //     String id = "";
    //     Optional<LogDetail> response = logRepo.findById(id);
    //     Assert.assertEquals(response.isPresent(), false);
    // }
}