/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 13:58 创建
 *
 */
package com.loyalove.water.web.controller.firm;

import com.loyalove.water.biz.firm.MeterBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.firm.MeterQuery;
import com.loyalove.water.web.controller.BaseController;
import com.loyalove.water.web.util.ExcelExportUtil;
import com.loyalove.water.web.util.ExcelParsing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@RestController
@RequestMapping("/meter")
public class MeterController extends BaseController {
	@Autowired
	private MeterBiz meterBiz;
	
	@RequestMapping("")
	public Result queryRoles(MeterQuery query, Pager pager) {
		List<MeterPO> result = meterBiz.queryMeters(query, pager);
		pager.setRecordTotal(meterBiz.queryCount(query));
		return Result.getResultSuccess("查询成功", result, pager);
	}
	
	@RequestMapping("/add")
	public Result addRole(MeterPO meterPO) {
		meterPO.setCreateUser(currUser().getUserId());
		meterBiz.addMeter(meterPO);
		return Result.getResultSuccess("新增表具成功");
	}
	
	@RequestMapping("/update")
	public Result updateRole(MeterPO meterPO) {
		meterBiz.updateMeter(meterPO);
		return Result.getResultSuccess("修改表具信息成功");
	}
	
	@RequestMapping("/deleteBy")
	public Result deleteRole(Integer[] ids) {
		MeterPO meterPO = new MeterPO();
		for (Integer id : ids) {
			meterPO.setMeterId(id);
			meterBiz.deleteMeter(meterPO);
		}
		return Result.getResultSuccess("删除表具成功");
	}
	
	@RequestMapping("/queryAll")
	public Result queryAllMenus(MeterPO meterPO) {
		List<MeterPO> result = meterBiz.queryAllMeters();
		return Result.getResultSuccess("查询成功", result);
	}
	
	@RequestMapping("/queryBy")
	public Result queryBy(MeterPO meterPO) {
		meterPO = meterBiz.queryMeter(meterPO);
		return Result.getResultSuccess("查询表具成功", meterPO);
	}
	
	@RequestMapping("/upload.json")
	public Result upload(@RequestParam(value = "file", required = false) MultipartFile file,
							HttpServletRequest request, HttpServletResponse response) throws IOException {
		String path = request.getSession().getServletContext().getRealPath("");
		String fileName = file.getOriginalFilename();
		String pathName = path + fileName.trim();
		try {
			File targetFile = new File(pathName);
			boolean flag;
			if (targetFile.exists()) {
				flag = targetFile.delete();
			}
			flag = targetFile.createNewFile();
			if (flag) {
				file.transferTo(targetFile);
			}
			List<String[]> list = ExcelParsing.getXlsList(pathName);
			List<MeterPO> meterPOs = generateDetailOrder(list);
			if (!meterPOs.isEmpty()) {
				for (MeterPO meterPO : meterPOs) {
					meterBiz.addMeter(meterPO);
				}
			}
		} catch (Exception e) {
			return Result.getResultFail("上传失败");
		}
		return Result.getResultSuccess("上传成功");
	}
	
	@RequestMapping(value = "export.json")
	public Result export(HttpServletRequest request,HttpServletResponse response, MeterPO meterPO) {
		try {
			List<MeterPO> meterPOs = meterBiz.queryMetersByConditions(meterPO);
            LinkedHashMap<String, Object> header =  header();
            List<LinkedHashMap<String, Object>> dataList = new ArrayList<>();
            for(int i=0;i<meterPOs.size();i++){
                LinkedHashMap<String, Object> data = new LinkedHashMap<String, Object>();
                data.put(String.valueOf(i),meterPOs.get(i));
                dataList.add(data);
            }
            ExcelExportUtil.exportsExcel(request,response,dataList,header,"表具导出数据");
		} catch (Exception e) {
			return Result.getResultFail("导出失败");
		}
		return Result.getResultSuccess("导出成功");
	}

    private LinkedHashMap<String, Object> header() {
        LinkedHashMap<String, Object> linkedHashMap= new LinkedHashMap<String, Object>();
        linkedHashMap.put("1","厂商");
        linkedHashMap.put("2","表号");
        linkedHashMap.put("3","口径");
        linkedHashMap.put("4","型号");
        linkedHashMap.put("5","类别");
        linkedHashMap.put("6","通讯模块");
        linkedHashMap.put("7","软件版本");
        linkedHashMap.put("8","频率");
        linkedHashMap.put("9","备注");
        linkedHashMap.put("10","出厂时间");
        linkedHashMap.put("11","安装时间");
        linkedHashMap.put("12","安装地址");
        linkedHashMap.put("13","隶属客户");
        return  linkedHashMap;
    }

	
	private List<MeterPO> generateDetailOrder(List<String[]> list) throws ParseException {
		List<MeterPO> meterPOs = new ArrayList<>();
		for (int i = 1; i < list.size(); i++) {
			String[] e = list.get(i);
			int userId = currUser().getUserId();
			MeterPO meterPO = new MeterPO();
			meterPO.setFirmName(e[0]);
			meterPO.setMeterNo(e[1]);
			meterPO.setCaliber(e[2]);
			meterPO.setTypeCode(e[3]);
			meterPO.setPurpose(e[4]);
			meterPO.setModuleNo(e[5]);
			meterPO.setVersion(e[6]);
			meterPO.setRate(e[7]);
			meterPO.setMemo(e[8]);
//			meterPO.setReleaseDate(e[9]);
//			meterPO.setCreateTime(e[10]);
			meterPO.setAddress(e[11]);
			meterPO.setCustomer(e[12]);
			meterPO.setCreateUser(userId);
			meterPO.setFirmId(userId);
			meterPOs.add(meterPO);
		}
		return meterPOs;
	}

}
