package com.clog.Clog;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.clog.Clog.LogDetailFiles.LogDetail;
import com.clog.Clog.LogDetailFiles.LogDetailRepository;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
public class LogDetailsRepositoryTests {
    @Autowired
    private LogDetailRepository logRepo;

    @Test
    public void testFindId() {
        String id = "crm_server_000001";
        Optional<LogDetail> response = logRepo.findById(id);
        Assert.assertEquals(response.isPresent(), true);
        Assert.assertEquals(response.get().getGlobal_instance_id(), id);
    }

    @Test
    public void testFindIdNotFound() {
        String id = "crm_server_111111";
        Optional<LogDetail> response = logRepo.findById(id);
        Assert.assertEquals(response.isPresent(), false);
    }

    @Test
    public void testFindIdEmptyString() {
        String id = "";
        Optional<LogDetail> response = logRepo.findById(id);
        Assert.assertEquals(response.isPresent(), false);
    }
}
