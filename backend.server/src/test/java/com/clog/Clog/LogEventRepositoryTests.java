package com.clog.Clog;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Before;
import org.json.JSONObject;
import org.json.JSONArray;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
@AutoConfigureMockMvc
public class LogEventRepositoryTests {

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
                                // String abc = "";
                                String time_2 = b_val.toString();
                                String time_1 = "";
                                String time = a_val.toString();


                                SimpleDateFormat dateParser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                                try {
                                        Date date = dateParser.parse(time);
                                        // System.out.println(date);

                                        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                        // System.out.print("After conversion: ");
                                        time_1 = dateFormatter.format(date).toString();

                        
                                } catch (ParseException e) {
                                        e.printStackTrace();
                                }
                                
                                if (time_1.compareTo(time_2) != 0){
                                        flag = false;
                                        break;
                                }
                                // continue; // Ignored for now
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

        @Autowired
        private MockMvc mockMvc;

        JSONObject data1;
        JSONObject data2;
        JSONArray array1;
        JSONArray array2;

        @Before
        public void expectedJsonObjects() throws Exception {
                data1 = new JSONObject();
                data2 = new JSONObject();
                array1 = new JSONArray();
                array2 = new JSONArray();
                data1.put("global_instance_id", "crm_server_000001");
                data1.put("business_domain", "CRM");
                data1.put("business_subdomain", "Customer");
                data1.put("eai_transaction_id", "eai_crm_server_111111");
                data1.put("eai_domain", "EAI_DOMAIN_1");
                data1.put("hostname", "crm_server");
                data1.put("application", "CRM_Adapter");
                data1.put("event_context", "Publish_Customer_Update");
                data1.put("component", "Publish_Customer_Update");
                data1.put("severity", "10");
                data1.put("priority", "71");
                data1.put("creation_time", "2020-12-12 06:24:23");
                data1.put("category_name", "ReportSituation");
                data1.put("activity", "Customer Update Started");
                array1.put(data1);

                data2.put("global_instance_id", "crm_server_000002");
                data2.put("business_domain", "BS");
                data2.put("business_subdomain", "BUSINESS");
                data2.put("eai_transaction_id", "eai_crm_server_111111");
                data2.put("eai_domain", "EAI_DOMAIN_2");
                data2.put("hostname", "crm_server");
                data2.put("application", "CRM_Adapter");
                data2.put("event_context", "Business_Update");
                data2.put("component", "Business_Update");
                data2.put("severity", "8");
                data2.put("priority", "25");
                data2.put("creation_time", "2020-12-12 06:24:23");
                data2.put("category_name", "ReportSituation");
                data2.put("activity", "Business Update Started");
                array1.put(data2);

                array2.put(data2);
        }

        @Test
        public void testSearchByTime() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(2)))
                                .andReturn();
                
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                
                boolean flag = compareObjectsControl(responseJsonObj , array1);

                Assert.assertTrue(flag);

        }

        @Test
        public void testSearchByBusinessDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(2)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();

                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                boolean flag = compareObjectsControl(responseJsonObj, array1);

                Assert.assertTrue(flag);
        }

        @Test
        public void testSearchByEaiDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("eaiDomain", "EAI_DOMAIN_2")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                boolean flag = compareObjectsControl(responseJsonObj, array2);

                Assert.assertTrue(flag);
        }

        @Test
        public void testSearchByBusinessSubDomain() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("businessSubDomain", "BUSINESS")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(1)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                boolean flag = compareObjectsControl(responseJsonObj, array2);

                Assert.assertTrue(flag);
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
                boolean flag = compareObjectsControl(responseJsonObj, array1);
                Assert.assertTrue(flag);
        }

        @Test
        public void testSearchByProcessId() throws Exception {
                MvcResult response = this.mockMvc.perform(get("/clog/logEvents")
                                .param("process", "1212")
                                .param("startTime", "2020-12-12 01:24:20")
                                .param("endTime", "2020-12-12 01:24:25"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$", hasSize(2)))
                                .andExpect(content().contentType("application/json"))
                                .andReturn();
                String jsonResponse = response.getResponse().getContentAsString();
                JSONArray responseJsonObj = new JSONArray(jsonResponse);
                boolean flag = compareObjectsControl(responseJsonObj, array1);

                Assert.assertTrue(flag);
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
