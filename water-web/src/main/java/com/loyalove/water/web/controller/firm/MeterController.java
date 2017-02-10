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
import com.loyalove.water.web.util.ExcelParsing;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
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
		String fileName;
		try {
			List<MeterPO> meterPOs = meterBiz.queryMetersByConditions(meterPO);
			String path = request.getSession().getServletContext().getRealPath("");
			fileName = "表具导出数据.xlsx";
			String filePath = path + fileName.trim();
			//导出数据到excel
			exportToExcel(meterPOs, filePath);
		} catch (Exception e) {
			return Result.getResultFail("导出失败");
		}
		return Result.getResultSuccess("导出成功", "/" + fileName);
	}
	
	private void exportToExcel(List<MeterPO> infos, String file) throws IOException {
		final String[] tableHeader = { "厂商", "表号", "口径", "型号", "类别", "通讯模块", "软件版本", "频率", "备注", "出厂时间", "安装时间",
										"安装地址", "隶属客户" };
		// 1、创建一个webbook，对应一个Excel文件
		XSSFWorkbook wb = new XSSFWorkbook();
		// 2、在webbook中添加一个sheet,对应Excel文件中的sheet
		XSSFSheet sheet = wb.createSheet("失败数据一");
		//  3、在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
		XSSFRow row = sheet.createRow(0);
		// 4、创建单元格，并设置值表头 设置表头居中
		XSSFCellStyle headStyle = wb.createCellStyle();
		headStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		Font headFont = wb.createFont();
		headFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		headStyle.setFont(headFont);
		for (int i = 0; i < tableHeader.length; i++) {
			XSSFCell cell = row.createCell((short) i, 1);
			cell.setCellValue(tableHeader[i]);
			cell.setCellStyle(headStyle);
		}
		//设置单元格字体样式
		Font ztFont = wb.createFont();
		ztFont.setColor(Font.COLOR_RED);
		//创建单元格样式
		XSSFCellStyle ztStyle = wb.createCellStyle();
		ztStyle.setFont(ztFont);
		// 5、写入实体数据 实际应用中这些数据从数据库得到
		for (int i = 0; i < infos.size(); i++) {
			row = sheet.createRow(i + 1);
			MeterPO info = infos.get(i);
			//创建单元格，并设置值
			row.createCell((short) 0, 1).setCellValue(info.getFirmName());
			row.createCell((short) 1, 1).setCellValue(info.getMeterNo());
			row.createCell((short) 2, 1).setCellValue(info.getCaliber());
			row.createCell((short) 3, 1).setCellValue(info.getTypeCode());
			row.createCell((short) 4, 1).setCellValue(info.getPurpose());
			row.createCell((short) 5, 1).setCellValue(info.getModuleNo());
			row.createCell((short) 6, 1).setCellValue(info.getVersion());
			row.createCell((short) 7, 1).setCellValue(info.getRate());
			row.createCell((short) 8, 1).setCellValue(info.getMemo());
			row.createCell((short) 9, 1).setCellValue(info.getReleaseDate());
			row.createCell((short) 10, 1).setCellValue(info.getCreateTime());
			row.createCell((short) 11, 1).setCellValue(info.getAddress());
			row.createCell((short) 12, 1).setCellValue(info.getCustomer());
		}
		
		// 6、将文件存到指定位置
		FileOutputStream fout = null;
		try {
			fout = new FileOutputStream(file);
			wb.write(fout);
		} catch (Exception e) {
			logger.error("上传文件出现异常，异常信息是：{}", e);
		} finally {
			if (fout != null) {
				fout.close();
			}
		}
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
