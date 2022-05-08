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

import net.minidev.json.parser.JSONParser;

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
import com.mysql.cj.xdevapi.JsonArray;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
@AutoConfigureMockMvc
public class BusinessProcessTreeTests {
    @Autowired
    private MockMvc mockMvc;

    private JSONObject subData1;
    private JSONArray innerArr;
    private JSONObject subData2;
    private JSONObject outerData1;
    private JSONObject outerData2;
    private JSONArray lastObj;

    @Before
    public void expectedJsonObjects() throws Exception {
        subData1 = new JSONObject();
        subData2 = new JSONObject();
        outerData1 = new JSONObject();
        outerData2 = new JSONObject();
        innerArr = new JSONArray();
        lastObj = new JSONArray();

        subData1.put("name", "CRM_PROCESS");
        subData1.put("key1_app_context_name", "CRM_CONTEXT");
        subData1.put("key1_app_context_value", "CRM_VALUE");
        subData1.put("key2_app_context_name", "EFFECTIVE_DATE");
        subData1.put("key2_app_context_value", "03/01/2022 05:00:00");
        subData1.put("eai_transaction_id", "eai_crm_server_111111");
        subData1.put("severity", 10);
        innerArr.put(subData1);
        subData2.put("CRM_PROCESS", innerArr);
        outerData1.put("CRM_SERVER", subData2);
        outerData2.put("EAI_DOMAIN_1", outerData1);
        lastObj.put(outerData2);
    }

    public boolean compareObjectsControl(JSONArray a, JSONArray b) throws Exception {
        boolean flag = true;

        for (int i = 0; i < a.length(); i++) {

            boolean arr_vals[] = new boolean[b.length()];
            for (int j = 0; j < b.length(); j++) {
                arr_vals[j] = compareObjects(a.getJSONObject(i), b.getJSONObject(j));
            }
            int counter = 0;
            for (boolean val : arr_vals) {
                if (val) {
                    counter++;
                }
            }
            if (counter != 1) {
                flag = false;
                break;
            }

        }

        return flag;
    }

    public boolean compareObjects(JSONObject a1, JSONObject b1) throws Exception {
        JSONArray keys = b1.names();

        boolean flag = true;

        for (int i = 0; i < keys.length(); i++) {

            Object attr = keys.get(i);
            String attr1 = attr.toString();
            Object a_val = a1.get(attr1);
            Object b_val = b1.get(attr1);

            if (attr1.equals("priority")) { // Numeric values
                String a_val1 = a_val.toString();
                String b_val1 = b_val.toString();
                int a_val11 = Integer.parseInt(a_val1);
                int b_val11 = Integer.parseInt(b_val1);

                if (a_val11 == b_val11) {
                    continue;
                } else {
                    flag = false;
                    break;
                }
            } else if (attr1.equals("severity")) {
                String a_val1 = a_val.toString();
                String b_val1 = b_val.toString();
                int a_val11 = Integer.parseInt(a_val1);
                int b_val11 = Integer.parseInt(b_val1);
                if (a_val11 == b_val11) {
                    continue;
                } else {
                    flag = false;
                    break;
                }

            } else if (attr1.equals("creation_time")) {
                continue; // Ignored for now
            } else {
                String a_val1 = a_val.toString();
                String b_val1 = b_val.toString();
                if (a_val1.equals(b_val1)) {
                    continue;
                } else {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }

    @Test
    public void testSearchByTime() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:20")
                .param("endTime", "2020-12-12 01:24:25"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        JSONObject json = new JSONObject(jsonResponse);
        boolean flag = compareObjects(json, outerData2);
        Assert.assertTrue(flag);
    }

    @Test
    public void testSearchByTimeNotExist() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:30:30")
                .param("endTime", "2020-12-12 01:30:35"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        Assert.assertEquals(jsonResponse, "{}");
    }

    @Test
    public void testSearchByEndTimeEarlierStartTime() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:30:30")
                .param("endTime", "2020-12-11 01:30:35"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        Assert.assertEquals(jsonResponse, "{}");
    }

    @Test
    public void testSearchByEndTimeEqualsStartTime() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        JSONObject json = new JSONObject(jsonResponse);
        boolean flag = compareObjects(json, outerData2);
        Assert.assertTrue(flag);
    }

    @Test
    public void testSearchByEAIDomain() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23")
                .param("eaiDomain", "EAI_DOMAIN_1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        JSONObject json = new JSONObject(jsonResponse);
        boolean flag = compareObjects(json, outerData2);
        Assert.assertTrue(flag);
    }

    @Test
    public void testSearchByPublishingBusinessDomain() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23")
                .param("publishingBusinessDomain", "CRM_SERVER"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        JSONObject json = new JSONObject(jsonResponse);
        boolean flag = compareObjects(json, outerData2);
        Assert.assertTrue(flag);
    }

    @Test
    public void testSearchByAllFieldParams() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23")
                .param("publishingBusinessDomain", "CRM_SERVER")
                .param("eaiDomain", "EAI_DOMAIN_1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        JSONObject json = new JSONObject(jsonResponse);
        boolean flag = compareObjects(json, outerData2);
        Assert.assertTrue(flag);
    }

    @Test
    public void testSearchByOneFieldNotExist() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23")
                .param("publishingBusinessDomain", "CRM_SERVER")
                .param("eaiDomain", "EAI_DOMAIN_5"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        Assert.assertEquals(jsonResponse, "{}");
    }

    @Test
    public void testSearchByOneFieldNotExist2() throws Exception {
        MvcResult response = this.mockMvc.perform(get("/clog/businessProcessTree")
                .param("startTime", "2020-12-12 01:24:23")
                .param("endTime", "2020-12-12 01:24:23")
                .param("publishingBusinessDomain", "CRM_BACKEND")
                .param("eaiDomain", "EAI_DOMAIN_1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andReturn();
        String jsonResponse = response.getResponse().getContentAsString();
        Assert.assertEquals(jsonResponse, "{}");
    }

}
