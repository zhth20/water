package com.loyalove.water;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.EmbeddedWebApplicationContext;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Title: WebApiStart.java
 * Description: WebApiStart
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-28 17:21
 */
@SpringBootApplication
public class WebDevStart extends SpringBootServletInitializer {

    private static final Logger logger = LoggerFactory.getLogger(WebDevStart.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebDevStart.class);
    }

    public static void main(String[] args) {
        EmbeddedWebApplicationContext context = (EmbeddedWebApplicationContext) SpringApplication.run(WebDevStart.class, args);
        logger.info("Web开发服务启动成功：http://localhost:{}",context.getEmbeddedServletContainer().getPort());
    }
}
