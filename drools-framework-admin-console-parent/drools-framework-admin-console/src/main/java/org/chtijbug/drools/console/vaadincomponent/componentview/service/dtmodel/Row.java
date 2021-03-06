/*
 * Copyright 2014 Pymma Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.chtijbug.drools.console.vaadincomponent.componentview.service.dtmodel;

import org.drools.workbench.models.guided.dtable.shared.model.DTCellValue52;

import java.util.ArrayList;
import java.util.List;

public class Row {
    private DecisionTable decisionTable;
    private List<RowElement> rowElements = new ArrayList<>();
    private List<DTCellValue52> cellValue52List;


    protected Row(DecisionTable decisionTable, int rowNumber) throws GuidedException {
        this.decisionTable = decisionTable;
        this.cellValue52List = new ArrayList<>();
        for (ColumnDefinition col : this.decisionTable.getColumnDefinitionList()) {
            RowElement newRowElement = new RowElement(col);
            this.cellValue52List.add(newRowElement.getDtCellValue52());
            if (col.getColumnNumber() == 0) {
                try {
                    String newString = String.valueOf(rowNumber);
                    newRowElement.setValue(newString);
                } catch (Exception e) {
                    GuidedException chtijbugDroolsRestException = new GuidedException(e);
                    chtijbugDroolsRestException.setClassName("Row");
                    chtijbugDroolsRestException.setValue(decisionTable.toString());
                    chtijbugDroolsRestException.setAttribute("protected Row(DecisionTable decisionTable,int rowNumber) throws ChtijbugDroolsRestException");
                    throw chtijbugDroolsRestException;
                }
            }
            this.addRowElement(newRowElement);
        }


    }

    protected Row(List<DTCellValue52> cellValue52List, DecisionTable decisionTable) throws GuidedException {
        this.decisionTable = decisionTable;
        this.cellValue52List = cellValue52List;
        for (ColumnDefinition col : this.decisionTable.getColumnDefinitionList()) {
            RowElement newRowElement = new RowElement(col, cellValue52List.get(col.getColumnNumber()));
            this.addRowElement(newRowElement);
        }
    }

    protected void updateRowNumber(int newRowNumber) throws GuidedException {
        RowElement rowNumberElement = rowElements.get(0);
        try {
            rowNumberElement.setValue(String.valueOf(newRowNumber));
        } catch (Exception e) {
            GuidedException chtijbugDroolsRestException = new GuidedException(e);
            chtijbugDroolsRestException.setAttribute("protected void updateRowNumber(int newRowNumber) throws ChtijbugDroolsRestExceptio");
            chtijbugDroolsRestException.setClassName("Row");
            throw chtijbugDroolsRestException;
        }
    }

    public List<RowElement> getRowElements() {
        return rowElements;
    }

    public void addRowElement(RowElement newRowElement) {
        this.rowElements.add(newRowElement);
    }

    public List<DTCellValue52> getCellValue52List() {
        return cellValue52List;
    }
}
