import {ColDef, GridOptions} from "ag-grid-community"

export interface IRaGridProperties {
  firstDataRendered?: (event) => void;
  gridReady: (event, service) => void;
  paginationChanged?: (pageName, event) => void;
  rowDoubleClicked?: (event) => void;
  rowSelected?: (event) => void
  serviceCallBack?: () => void;

  service?: any;
  componentParent?: any,
  columnDefs?: Partial<ColDef[]> | any;
  components?: any;
  defaultColDef?: Partial<ColDef>;
  frameworkComponents?: any;
  gridOptions?: GridOptions;
  rowData?: any[];
  tooltipShowDelay?: number;
  class?: string;
  style?: { [klass: string]: any } | null;

  pageName?: string;

  // Specific to MultiSelect Grid
  rowSelection?: 'multiple' | 'single'
  overlayLoadingTemplate?: string
  rowMultiSelectWithClick?: boolean

  // Specific to Group Grid
  autoGroupColumnDef?: {
    headerName?: string,
    minWidth?: number,
    filter?: boolean,
    menuTabs?: ['filterMenuTab'],
    cellRendererParams?: {
      suppressCount?: boolean,
      checkbox?: boolean,
    },
    filterValueGetter?: (params) => void
  },
  suppressAggFuncInHeader?: boolean
}
