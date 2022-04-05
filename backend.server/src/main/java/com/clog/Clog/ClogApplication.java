package com.clog.Clog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ClogApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClogApplication.class, args);
	}

}
