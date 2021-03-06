package com.loyalove.water.dao.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.query.auth.UserQuery;
import com.loyalove.water.vo.auth.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Title: UserDAO.java
 * Description: UserDAO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 13:03
 */
@Mapper
@Repository
public interface UserDAO {

    /**
     * 根据用户ID查询对应角色
     *
     * @param userId
     * @return
     */
    Set<String> queryRoleByUserId(Integer userId);

    /**
     * 根据用户ID查询对应权限
     *
     * @param userId
     * @return
     */
    Set<String> queryPermissionsByUserId(Integer userId);

    /**
     * 查询用户列表
     *
     * @param query,pager
     * @return
     */
    List<UserVO> queryUsers(@Param("query") UserQuery query, @Param("pager") Pager pager);

    /**
     * 查询用户数量
     *
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") UserQuery query);
}
