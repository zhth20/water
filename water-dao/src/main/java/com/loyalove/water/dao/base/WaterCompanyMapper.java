package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.WaterCompanyExample;
import com.loyalove.water.pojo.WaterCompanyPO;
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
public interface WaterCompanyMapper {
    long countByExample(WaterCompanyExample example);

    int deleteByExample(WaterCompanyExample example);

    int deleteByPrimaryKey(Integer waterCompanyId);

    int insert(WaterCompanyPO record);

    int insertSelective(WaterCompanyPO record);

    List<WaterCompanyPO> selectByExampleWithRowbounds(WaterCompanyExample example, RowBounds rowBounds);

    List<WaterCompanyPO> selectByExample(WaterCompanyExample example);

    WaterCompanyPO selectByPrimaryKey(Integer waterCompanyId);

    int updateByExampleSelective(@Param("record") WaterCompanyPO record, @Param("example") WaterCompanyExample example);

    int updateByExample(@Param("record") WaterCompanyPO record, @Param("example") WaterCompanyExample example);

    int updateByPrimaryKeySelective(WaterCompanyPO record);

    int updateByPrimaryKey(WaterCompanyPO record);
}