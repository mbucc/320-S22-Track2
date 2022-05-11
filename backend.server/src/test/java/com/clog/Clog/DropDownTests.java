package com.clog.Clog;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.clog.Clog.BusinessProcess.BusinessTreeRepository;
import com.clog.Clog.LogEventFiles.LogEventRepository;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
public class DropDownTests {
    @Autowired
    private LogEventRepository logEventRepo;
    @Autowired
    private BusinessTreeRepository busTree;

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

    @Test
    public void testGetPublishingBusinessDomains() {
        List<String> subDomains = Arrays.asList(new String[]{"CRM_SERVER"});
        List<String> response = busTree.findDistinctPublishingBusinessDomains();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    @Test
    public void testGetPublishingBusinessDomainsNotEmpty() {
        List<String> subDomains = Arrays.asList(new String[]{});
        List<String> response = busTree.findDistinctPublishingBusinessDomains();
        Assert.assertFalse(subDomains.size() == response.size());
        Assert.assertFalse(subDomains.containsAll(response));
        Assert.assertFalse(response.isEmpty());
    }

    @Test
    public void testGetEAIDomain() {
        List<String> subDomains = Arrays.asList(new String[]{"EAI_DOMAIN_1","EAI_DOMAIN_2"});
        List<String> response = logEventRepo.findDistinctEAI_Domains();
        Assert.assertTrue(subDomains.size() == response.size());
        Assert.assertTrue(response.containsAll(subDomains));
        Assert.assertTrue(subDomains.containsAll(response));
    }

    @Test
    public void testGetEAIDomainNotEmpty() {
        List<String> subDomains = Arrays.asList(new String[]{});
        List<String> response = logEventRepo.findDistinctEAI_Domains();
        Assert.assertFalse(subDomains.size() == response.size());
        Assert.assertFalse(subDomains.containsAll(response));
        Assert.assertFalse(response.isEmpty());
    }
}