package com.loyalove.water.web.controller;

import com.loyalove.water.biz.auth.UserBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.UserPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

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
    public String home(Model model) {
        List<UserPO> userPOs = userBiz.queryUsers(new Pager());
        model.addAttribute("users",userPOs);
        return "home";
    }

}
