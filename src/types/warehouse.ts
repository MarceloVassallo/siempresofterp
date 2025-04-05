
export interface Warehouse {
  code: string;
  establishmentCode: string;
  name: string;
  companyId: string;
  address: string;
  otherAddress: string;
  branchId: string;
  locationId: string;
  warehouseType: string;
  costCenterId: string;
  observations: string;
  inactive: boolean;
}

export const defaultWarehouse: Warehouse = {
  code: "",
  establishmentCode: "",
  name: "",
  companyId: "",
  address: "",
  otherAddress: "",
  branchId: "",
  locationId: "",
  warehouseType: "",
  costCenterId: "",
  observations: "",
  inactive: false
};
