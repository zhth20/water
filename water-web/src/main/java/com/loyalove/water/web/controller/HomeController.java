package com.loyalove.water.web.controller;

import com.loyalove.water.biz.auth.UserBiz;
import com.loyalove.water.common.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping("/userInfo")
    @ResponseBody
    public Result userInfo() {
        return Result.getResultSuccess("查询登录用户信息成功", currUser());
    }

}
