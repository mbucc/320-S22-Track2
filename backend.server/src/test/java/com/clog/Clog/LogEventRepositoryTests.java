package com.clog.Clog;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Before;
import org.json.JSONObject;
import org.json.JSONArray;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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
import com.jayway.jsonpath.JsonPath;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
// @ContextConfiguration
// @TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
// DbUnitTestExecutionListener.class })
@AutoConfigureMockMvc
public class LogEventRepositoryTests {
        @Autowired
        private MockMvc mockMvc;

        JSONObject data1;
        JSONArray array1;

        @Before
        public void expectedJsonObjects() throws Exception {
                data1 = new JSONObject();
                array1 = new JSONArray();
                data1.put("global_instance_id", "crm_server_000001");
                data1.put("businessDomain", "CRM");
                data1.put("businessSubDomain", "Customer");
                data1.put("eai_transaction_id", "eai_crm_server_111111");
                data1.put("eai_domain", "EAI_DOMAIN_1");
                data1.put("hostname", "crm_server");
                data1.put("application", "CRM_adapter");
                data1.put("event_context", "Publish_Customer_Update");
                data1.put("component", "Publish_Customer_Update");
                data1.put("severities", "10");
                data1.put("priority", "10");
                data1.put("creation_time", "2020-12-12 01:24:23");
                data1.put("category_name", "ReportSituation");
                data1.put("activity", "Customer Update Started");
                array1.put(data1);
        }

        // Severity and Priorities are not drop-downs. Start and end-time, returns
        // Nothing.
        @Test
        public void testSearchByBusinessDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("businessDomain", "CRM")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        @Test
        public void testSearchByEaiDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("eaiDomain", "EAI_DOMAIN_1")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        @Test
        public void testSearchByBusinessSubDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("businessSubDomain", "EAI_DOMAIN_1")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        @Test
        public void testSearchByPriorityHigh() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("priorities", "high")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        @Test
        public void testSearchBySeveritiesInfo() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("severities", "info")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        public void testSearchByProcessId() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("process", "1212")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                System.out.println(jsonResponse);
                Assert.assertEquals(array1.equals(responseJsonObj), true);
        }

        @Test
        public void testSampleQuerysuccess() throws Exception {
                this.mockMvc.perform(
                                get("/clog/logEvents")
                                                .param("businessDomain", "CRM")
                                                .param("eaiDomain", "EAI_DOMAIN_1")
                                                .param("startTime", "2020-12-12 01:24:23")
                                                .param("endTime", "2020-12-12 01:25:00")
                                                .param("businessSubDomain", "Customer")
                                                .param("process", "1212")
                                                .param("priority", "high")
                                                .param("categories", "ReportSituation")
                                                .param("severities", "info")
                                                .param("application", "CRM_adapter"))
                                .andDo(print())
                                .andExpect(status().isOk());
        }

        @Test
        public void testGetById() throws Exception {
                this.mockMvc.perform(
                                get("/clog/logDetail")
                                                .param("id", "crm_server_000001"))
                                .andDo(print())
                                .andExpect(status().isOk());
        }
}
