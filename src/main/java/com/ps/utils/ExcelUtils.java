package com.ps.utils;

/**
 * 
 */

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;

/**
 * @author suman.t
 */
public class ExcelUtils
{
    @SuppressWarnings("unused")
    private static final Log LOG = LogFactory.getLog(ExcelUtils.class);

    /**
     * @param sheetName
     * @return
     */
    public static void createRows(Workbook workbook,Sheet sheet,int rowNo,List<Object> rowValue,CellStyle headerCellStyle)
    {
    	 Row rowHeader = sheet.createRow(rowNo);
         for (int i = 0; i < rowValue.size(); i++)
         {
             Cell cell = rowHeader.createCell(i);
             cell.setCellStyle(headerCellStyle);
             if(rowValue.get(i) instanceof Double)
             {
            	 cell.setCellValue((Double) rowValue.get(i));
             }
             else if(rowValue.get(i) instanceof String)
             {
               cell.setCellValue(String.valueOf(rowValue.get(i)));
             }
             else 
             {
            	 cell.setCellValue(String.valueOf(rowValue.get(i)));
             }
         }
    }
    public static void createRows(Workbook workbook, Sheet sheet, int rowNo, List<Object> rowValue, boolean bold, String... extraParmas)
    {
        Row rowHeader = sheet.createRow(rowNo);
        CellStyle headerCellStyle = getCellStyle(workbook, bold, 10);

        for (int i = 0; i < rowValue.size(); i++)
        {
            Cell cell = rowHeader.createCell(i);
            cell.setCellStyle(headerCellStyle);
            if (extraParmas.length > 0)
            {
                if (i == Integer.parseInt(extraParmas[0]))
                {
                    CellStyle cellStyle = workbook.createCellStyle();
                    cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
                    cellStyle.setBorderTop(CellStyle.BORDER_THIN);
                    cellStyle.setBorderRight(CellStyle.BORDER_THIN);
                    cellStyle.setBorderLeft(CellStyle.BORDER_THIN);
                    Font font = workbook.createFont();
                    font.setFontName("Calibri");
                    font.setFontHeightInPoints((short) 10);
                    if (rowValue.get(i) instanceof Double)
                    {
                        double val = (Double) rowValue.get(i);
                        if (val > 0)
                        {
                            font.setColor(IndexedColors.GREEN.getIndex());
                        }
                        else if (val < 0)
                        {
                            font.setColor(IndexedColors.RED.getIndex());
                        }
                        cellStyle.setFont(font);
                        cell.setCellStyle(cellStyle);
                    }
                }
            }

            if (rowValue.get(i) instanceof Double)
            {
                cell.setCellValue((Double) rowValue.get(i));
            }
            else if (rowValue.get(i) instanceof String)
            {
                cell.setCellValue(String.valueOf(rowValue.get(i)));
            }
            else
            {
                cell.setCellValue(String.valueOf(rowValue.get(i)));
            }
        }
    }

    public static CellStyle getCellStyle(Workbook workbook, boolean bold, int fontWeight)
    {
        Font headerFont = workbook.createFont();
        headerFont.setFontName("Calibri");
        headerFont.setFontHeightInPoints((short) fontWeight);

        if (bold) headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(headerFont);
        cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
        cellStyle.setBorderTop(CellStyle.BORDER_THIN);
        cellStyle.setBorderRight(CellStyle.BORDER_THIN);
        cellStyle.setBorderLeft(CellStyle.BORDER_THIN);

        if (bold)
        {
            cellStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        }

        return cellStyle;
    }

    public static CellStyle getCellEmptyStyle(Workbook workbook, boolean bold, int fontWeight)
    {
        Font headerFont = workbook.createFont();
        headerFont.setFontName("Calibri");
        headerFont.setFontHeightInPoints((short) fontWeight);

        if (bold) headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(headerFont);
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        return cellStyle;
    }

    public static CellStyle getOptionalCellStyle(Workbook workbook)
    {
        Font headerFont = workbook.createFont();
        headerFont.setFontName("Calibri");
        headerFont.setFontHeightInPoints((short) 10);

        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(headerFont);
        cellStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        return cellStyle;
    }

    public static void mergeCells(Workbook workbook, Sheet sheet, Row row, int cellNo, String mergeRange, String cellValue, boolean border)
    {
        Cell cell = row.createCell(cellNo);
        CellStyle cellStyle = getOptionalCellStyle(workbook);
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cell.setCellStyle(cellStyle);
        cell.setCellValue(cellValue);

        sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

        if (border)
        {
            RegionUtil.setBorderTop(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
        }
    }

    public static void mergeDoubleCells(Workbook workbook, Sheet sheet, Row row, int cellNo, String mergeRange, String cellValue, boolean border)
    {
        Cell cell = row.createCell(cellNo);
        CellStyle cellStyle = getOptionalCellStyle(workbook);
        cellStyle.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cell.setCellStyle(cellStyle);
        cell.setCellValue(cellValue);

        sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

        if (border)
        {
            // RegionUtil.setBorderTop(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
            // RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet, workbook);
        }
    }

    public static CellStyle createFormulaStyle(Workbook workbook, boolean bold)
    {
        CellStyle cellStyle = getCellStyle(workbook, bold, 10);

        cellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        return cellStyle;
    }

    public static void createOptionalCells(Workbook workbook, Sheet sheet, int rowNo, String[] cellValue)
    {
        Row row = sheet.createRow((short) rowNo);
        CellStyle cellStyle = getCellEmptyStyle(workbook, true, 10);

        for (int i = 0; i < cellValue.length; i++)
        {
            Cell cell = row.createCell(i);
            cell.setCellStyle(cellStyle);
            cell.setCellValue(cellValue[i]);
        }
    }
}
