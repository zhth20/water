package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.UserRoleExample;
import com.loyalove.water.pojo.UserRolePO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2017/01/07
 */
@Mapper
@Repository
public interface UserRoleMapper {
    long countByExample(UserRoleExample example);

    int deleteByExample(UserRoleExample example);

    int deleteByPrimaryKey(Integer userRoleId);

    int insert(UserRolePO record);

    int insertSelective(UserRolePO record);

    List<UserRolePO> selectByExampleWithRowbounds(UserRoleExample example, RowBounds rowBounds);

    List<UserRolePO> selectByExample(UserRoleExample example);

    UserRolePO selectByPrimaryKey(Integer userRoleId);

    int updateByExampleSelective(@Param("record") UserRolePO record, @Param("example") UserRoleExample example);

    int updateByExample(@Param("record") UserRolePO record, @Param("example") UserRoleExample example);

    int updateByPrimaryKeySelective(UserRolePO record);

    int updateByPrimaryKey(UserRolePO record);
}