package com.loyalove.water.web.config.mvc;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Title: MvcConfig.java
 * Description: MvcConfig
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-15 9:26
 */
@SpringBootConfiguration
public class MvcConfig extends WebMvcConfigurerAdapter {

    private static final String PAGES_URL = "/";
    private static final String PAGES_LOCATIONS = "classpath:/pages/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PAGES_URL)
                .addResourceLocations(PAGES_LOCATIONS);
    }
}
