import { ColDef } from "ag-grid-community"

/*
  !Important Note
  All the Function Using
  ! transformDate
  ! valueFormatter
  ! valueFormatterAmount
  ! should be invoked using functionaName.call(this, {parameters})

*/
export function colIndex(data: Partial<ColDef> = null): ColDef {
  return {
    headerName: 'S No',
    valueGetter: 'node.rowIndex + 1',
    tooltipField: 'name',
    ...data
  }
}
export function colAction(data: Partial<ColDef> = null): ColDef {
  return {
    headerName: 'Action',
    cellRenderer: 'gridAction',
    suppressMenu: true,
    sortable: false,
    ...data,
    cellRendererParams: {
      // onClick: this.onAction.bind(this),
      label: 'Action',
      ...data.cellRendererParams
    }
  }
}
export function colSimple(data: Partial<ColDef> = null): ColDef {
  return {
    sortable: true,
    filter: true,
    cellStyle: { 'font-size': '12px' },
    // cellRenderer: (params) =>(params.value || "N/A"),
    valueFormatter: (params) => (params.value || 'N/A'),
    ...data
  }
}
export function colSimpleDate(data: Partial<ColDef> = null): ColDef {
  return {
    ...colSimple(data),
    valueFormatter: (params) => (params.value && this.transformDate(params.value))
  }
}
export function colSimpleNumber(data: Partial<ColDef> = null): ColDef {
  return {
    ...colSimple(data),
    valueFormatter: (params) => (params?.value && this.valueFormatter(params.value)),
    ...data
  }
}
export function colSimpleAmount(data: Partial<ColDef> = null): ColDef {
  return {
    ...colSimple(data),
    // Needs Changes for Currency Simbol
    valueFormatter: (params) => (params?.value && this.valueFormatterAmount(params?.value)),
    ...data
  }
}
export function colSimpleAmountPercentage(data: Partial<ColDef> = null): ColDef {
  return {
    ...colSimple(data),
    // Needs Changes for Currency Symbol + Percentage
    valueFormatter: (params) => (params?.value && this.valueFormatterAmount(params.value) + '%')
  }
}
export function colSimpleLeft(data: Partial<ColDef> = null): ColDef {
  return {
    cellStyle: { textAlign: 'left' },
    ...colSimple(data),
    valueFormatter: (params) => (params.value || null),
  }
}
export function colGroup(data: Partial<ColDef> = null): ColDef {
  return {
    rowGroup: true,
    hide: true,
    ...colSimple(data)
  }
}
export function colText(data: Partial<ColDef> = null): ColDef {
  return {
    sortable: true,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
    filterParams: {
      filterOptions: ['contains'],
      suppressAndOrCondition: true,
    },
    valueFormatter: (params) => params.value || 'N/A',
    ...data
  }
}
export function colTextAmount(data: Partial<ColDef>): ColDef {
  return {
    ...colText(data),
    valueFormatter: (params) => this.valueFormatterAmount(params.value),
    ...data
  }
}
export function colDateSimple(data: Partial<ColDef> = null): ColDef {
  return {
    valueFormatter: (params) => this.transformDate(params.value),
    ...data
  }
}
export function colDate(data: Partial<ColDef>): ColDef {
  return {
    ...colText(),
    filter: 'agDateColumnFilter',
    filterParams: {
      filterOptions: ['equals'],
      suppressAndOrCondition: true,
    },
    valueFormatter: (params) => (this.transformDate(params.value) ?? 'N/A'),
    ...data
  }
}
export function colDropDown(data: Partial<ColDef>): ColDef {
  return {
    filter: 'agSetColumnFilter',
    menuTabs: ['filterMenuTab'],
    ...data,
    filterParams: {
      defaultToNothingSelected: true,
      suppressSorting: true,
      suppressSelectAll: true,
      suppressAndOrCondition: true,
      ...data?.filterParams
    },
  }
}
export function colDropDownStatus(data?: Partial<ColDef>): ColDef {
  return {
    ...colDropDown(data),
    headerName: 'Status',
    field: 'status',
    filterParams: {
      values: [
        'Draft',
        'Rejected',
        'Unpaid',
        'Partial',
        'Paid',
        'Submitted',
        'Reviewed',
      ],
      ...colDropDown(data)?.filterParams,
    }
  }
}
