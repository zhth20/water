package com.loyalove.water.dao.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.query.auth.RoleQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Title: RoleDAO.java
 * Description: RoleDAO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 13:03
 */
@Mapper
@Repository
public interface RoleDAO {

    /**
     * 查询角色列表
     *
     * @param query,pager
     * @return
     */
    List<RolePO> queryRoles(@Param("query") RoleQuery query, @Param("pager") Pager pager);

    /**
     * 查询角色数量
     *
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") RoleQuery query);
}
