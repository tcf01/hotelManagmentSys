package com.hotelmanagementsys.hotelmang;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Configuration
@MapperScan(basePackages = {"com.hotelmanagementsys.hotelmang.dao"})
public class HotelmangApplication {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			//重写父类提供的跨域请求处理的接口
			public void addCorsMappings(CorsRegistry registry) {
				//添加映射路径
				registry
						.addMapping("/**")
						//放行哪些原始域
						.allowedOrigins("*")
						//是否发送Cookie信息
						.allowCredentials(true)
						//放行哪些原始域(请求方式)
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						//放行哪些原始域(头部信息)
						.allowedHeaders("*")
						//暴露哪些头部信息（因为跨域访问默认不能获取全部头部信息）
						.exposedHeaders("Header1", "Header2");
			}

		};
	}

	public static void main(String[] args) {
		SpringApplication.run(HotelmangApplication.class, args);
	}

	//增加BCryptPasswordEncoder實例的定義
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
