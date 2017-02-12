package com.loyalove.water.web.config.mvc;

import com.loyalove.water.web.config.converter.StringToDateConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.web.bind.support.ConfigurableWebBindingInitializer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.MultipartConfigElement;

/**
 * Title: MvcConfig.java
 * Description: MvcConfig
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-15 9:26
 */
@SpringBootConfiguration
@ComponentScan({"com.loyalove.water.dao",
        "com.loyalove.water.common",
        "com.loyalove.water.pojo",
        "com.loyalove.water.biz",
        "com.loyalove.water.web"})
public class MvcConfig extends WebMvcConfigurerAdapter {

    private static final String PAGES_URL = "/pages/**";
    private static final String PAGES_LOCATIONS = "classpath:/pages/";

    @Autowired
    private RequestMappingHandlerAdapter handlerAdapter;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PAGES_URL)
                .addResourceLocations(PAGES_LOCATIONS);
    }

    /**
     * 增加字符串转日期的功能
     */
    @PostConstruct
    public void initEditableValidation() {
        ConfigurableWebBindingInitializer initializer = (ConfigurableWebBindingInitializer) handlerAdapter
                .getWebBindingInitializer();
        if (initializer.getConversionService() != null) {
            GenericConversionService genericConversionService = (GenericConversionService) initializer
                    .getConversionService();
            genericConversionService.addConverter(new StringToDateConverter());
        }

    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {

        MultipartConfigFactory factory = new MultipartConfigFactory();

        //// 设置文件大小限制 ,超了，页面会抛出异常信息，这时候就需要进行异常信息的处理了;
        factory.setMaxFileSize("50MB"); //KB,MB

        /// 设置总上传数据总大小
        factory.setMaxRequestSize("60MB");

        //Sets the directory location wherefiles will be stored.
        //factory.setLocation("路径地址");

        return factory.createMultipartConfig();

    }
}
