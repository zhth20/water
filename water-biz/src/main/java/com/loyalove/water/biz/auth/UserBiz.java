package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.query.auth.UserQuery;
import com.loyalove.water.vo.auth.UserVO;

import java.util.List;

/**
 * Title: UserBiz.java
 * Description: UserBiz
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-06 10:52
 */
public interface UserBiz {
    /**
     * 根据用户名查询用户
     * @param username
     * @return
     */
    UserPO queryUserByName(String username);

    /**
     * 根据用户查询角色和权限
     * @param userPO
     * @return
     */
    UserVO queryUserRolePermission(UserPO userPO);

    /**
     * 查询用户列表
     * @return
     */
    List<UserPO> queryUsers(UserQuery query, Pager pager);


    /**
     * 查询用户数量
     *
     * @return
     */
    Integer queryCount(UserQuery query);

    /**
     * 查询用户数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增用户
     * @param userPO
     */
    void addUser(UserPO userPO);

    /**
     * 修改用户
     * @param userPO
     */
    void update(UserPO userPO);

    /**
     * 删除用户
     * @param userPO
     */
    void deleteUser(UserPO userPO);

    /**
     * 查询用户
     * @param userPO
     */
    UserPO queryUser(UserPO userPO);

}
