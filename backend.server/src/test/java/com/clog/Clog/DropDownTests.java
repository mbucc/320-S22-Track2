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
    public void testGetBusinessSubDomains() {
        List<String> subDomains = Arrays.asList(new String[]{"Customer","BUSINESS"});
        List<String> response = logEventRepo.findDistinctBusinessSubDomains();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    @Test
    public void testGetBusinessSubDomainsNotEmpty() {
        List<String> subDomains = Arrays.asList(new String[]{});
        List<String> response = logEventRepo.findDistinctBusinessSubDomains();
        Assert.assertFalse(subDomains.size() == response.size());
        Assert.assertFalse(subDomains.containsAll(response));
        Assert.assertFalse(response.isEmpty());
    }

    @Test
    public void testgetApplications() {
        List<String> subDomains = Arrays.asList(new String[]{"CRM_Adapter"});
        List<String> response = logEventRepo.findDistinctApplications();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    @Test
    public void testGetApplicationsNotEmpty() {
        List<String> subDomains = Arrays.asList(new String[]{});
        List<String> response = logEventRepo.findDistinctApplications();
        Assert.assertFalse(subDomains.size() == response.size());
        Assert.assertFalse(subDomains.containsAll(response));
        Assert.assertFalse(response.isEmpty());
    }

    @Test
    public void testGetServices() {
        List<String> subDomains = Arrays.asList(new String[]{"Business_Update","Publish_Customer_Update"});
        List<String> response = logEventRepo.findDistinctServices();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    @Test
    public void testGetServicesNotEmpty() {
        List<String> subDomains = Arrays.asList(new String[]{});
        List<String> response = logEventRepo.findDistinctServices();
        Assert.assertFalse(subDomains.size() == response.size());
        Assert.assertFalse(subDomains.containsAll(response));
        Assert.assertFalse(response.isEmpty());
    }
}