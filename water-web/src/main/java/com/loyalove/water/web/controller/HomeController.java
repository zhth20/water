package com.loyalove.water.web.controller;

import com.loyalove.water.biz.auth.UserBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Title: HomeController.java
 * Description: HomeController
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 16:03
 */
@Controller
public class HomeController extends BaseController {

    @Autowired
    UserBiz userBiz;

    @RequestMapping(value = {"", "/"})
    public String home() {
        return "forward:/pages/home.html";
    }

}
