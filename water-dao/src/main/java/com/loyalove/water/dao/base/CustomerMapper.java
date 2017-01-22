package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.CustomerExample;
import com.loyalove.water.pojo.CustomerPO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2017/01/22
 */
@Mapper
@Repository
public interface CustomerMapper {
    long countByExample(CustomerExample example);

    int deleteByExample(CustomerExample example);

    int deleteByPrimaryKey(Integer customerId);

    int insert(CustomerPO record);

    int insertSelective(CustomerPO record);

    List<CustomerPO> selectByExampleWithBLOBsWithRowbounds(CustomerExample example, RowBounds rowBounds);

    List<CustomerPO> selectByExampleWithBLOBs(CustomerExample example);

    List<CustomerPO> selectByExampleWithRowbounds(CustomerExample example, RowBounds rowBounds);

    List<CustomerPO> selectByExample(CustomerExample example);

    CustomerPO selectByPrimaryKey(Integer customerId);

    int updateByExampleSelective(@Param("record") CustomerPO record, @Param("example") CustomerExample example);

    int updateByExampleWithBLOBs(@Param("record") CustomerPO record, @Param("example") CustomerExample example);

    int updateByExample(@Param("record") CustomerPO record, @Param("example") CustomerExample example);

    int updateByPrimaryKeySelective(CustomerPO record);

    int updateByPrimaryKeyWithBLOBs(CustomerPO record);

    int updateByPrimaryKey(CustomerPO record);
}